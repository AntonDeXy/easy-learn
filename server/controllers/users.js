const userSchema = require('../models/UserObj')
const refreshTokenSchema = require('../models/refreshTokenSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// auth
exports.register = async (req, res) => {
	const username = req.body.username.toLowerCase()

	try {

    const isNameTaken = await userSchema
      .findOne({username: username})
      .exec()

    if (isNameTaken) {
      return res.json({
        success: false,
        msg: 'Username is taken, choose other',
      }) 
    }

    if (username.length === 0) {
      return res.json({
        success: false,
        msg: 'Username field is require',
      })
    }

    if (req.body.password.length === 0) {
      return res.json({
        success: false,
        msg: 'Password field is require',
      })
    }

    if (username.length < 3) {
      return res.json({
        success: false,
        msg: 'Username length must be at least 4 characters',
      })
    }
    
    if (req.body.password.length < 8) {
      return res.json({
        success: false,
        msg: 'Password length must be at least 8 characters',
      })
    }

		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const user = new userSchema({
			_id: new mongoose.Types.ObjectId(),
			username: username,
			password: hashedPassword,
		})
		user
			.save()
			.then((doc) => {
				res.json({ success: true, msg: 'Register success' })
			})
			.catch((err) => {
        console.log(err)
				if (err.code === 11000)
					res.json({
						success: false,
						msg: 'User with this username is already exist',
					})
				else if (err) res.json({ success: false, msg: 'Something went wrong' })
			})
	} catch (err) {
		console.log(err)
		res.json({ success: false, msg: 'Something went wrong' })
	}
}

exports.login = async (req, res) => {
	const username = req.body.username.toLowerCase()

	userSchema
		.findOne({ username: username })
		.populate([
			{
				path: 'tests',
				// populate: {
				// 	path: 'items'
				// }
			},
			{
				path: 'addedLists',
				populate: {
					path: 'items'
				}
			}
		])
		.then(async (user) => {
			if (user == null) {
				return res.json({ success: false, msg: 'Cannot find user' })
			}
			try {
				let compare = await bcrypt.compare(req.body.password, user.password)
				if (compare) {
					const accessToken = generateAccessToken(user.toJSON())
					const refreshToken = jwt.sign(
						user.toJSON(),
						process.env.REFRESH_TOKEN_SECRET
					)

					const newRefreshToken = new refreshTokenSchema({
						_id: new mongoose.Types.ObjectId(),
						refreshToken,
					})

					newRefreshToken.save()

					res.json({ success: true, accessToken, refreshToken, user })
				} else {
					res.json({ success: false, msg: 'Password is incorect' })
				}
			} catch (err) {
				console.log(err)
				res.json({ succes: false, msg: 'Something went wrong' })
			}
		})
}

exports.logout = async (req, res) => {
	refreshTokenSchema
		.findOneAndDelete({ refreshToken: req.body.refreshToken })
		.then(() => res.json({ success: true }))
		.catch((err) => {
			console.log(err)
			res.json({ success: false, msg: 'Something went wrong' })
		})
}

exports.getNewToken = async (req, res) => {
	const refreshToken = req.body.refreshToken
	if (refreshToken == null)
		return res.json({ success: false, msg: 'Refresh token not found' })

	refreshTokenSchema.findOne({ refreshToken }).then((data) => {
		if (!data)
			return res.json({ success: false, msg: 'Refresh token not found' })
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
			if (err)
				return res.json({ success: false, msg: 'Refresh token not found' })
			const newUserData = await 
				userSchema
				.findOne({_id: user._id})
				.populate([
					{
						path: 'tests'
					},
					{
						path: 'addedLists',
						populate: {
							path: 'items'
						}
					}
				])
				.exec()
			const accessToken = generateAccessToken(newUserData.toJSON())
			res.json({ success: true, accessToken, user: newUserData })
		})
	})
}

exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) return res.json({ success: false, msg: 'Please relogin' })

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		console.log(err)
		if (err) return res.json({ success: false, msg: 'Please relogin' })
		req.user = user
		next()
	})
}

exports.requestEmailConf = (req, res) => {
	const user = { userId: req.body.userId }
	userSchema
		.findOne({ _id: user.userId })
		.then((doc) => {
			if (doc.isEmailConfirmed)
				return res.json({ success: false, msg: 'Email already confirmed' })
			const emailConfirmToken = generateEmailConfirmToken(user)

			res.json({
				success: true,
				link: `http://localhost:5000/users/confirm-email/${emailConfirmToken}`,
			})
		})
		.catch((err) => console.log(err))
}

exports.confirmEmail = (req, res) => {
	const token = req.params.token
	let userId

	try {
		const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET)
		userId = decoded.userId
	} catch (err) {
		return res.json({
			succes: false,
			msg: 'Something went wrong, try request new link for email confirm',
		})
	}

	userSchema.findOne({ _id: userId }).then((user) => {
		if (user.isEmailConfirmed)
			return res.json({ success: true, msg: 'Email already confirmed' })
		userSchema
			.findOneAndUpdate({ _id: userId }, { isEmailConfirmed: true })
			.then((data) => {
				if (!data) return res.json({ success: false, msg: 'User not found' })
				res.json({ success: true, msg: 'Email was successfully confirmed' })
			})
			.catch((err) => {
				res.json({ success: false, msg: 'Something went wrong' })
				console.log(err)
			})
	})
}

exports.requestResetPassword = (req, res) => {
	const user = { userId: req.body.userId }
	const resetPasswordToken = generateResetPasswordToken(user)

	const newResetPasswordToken = new resetPasswordTokenSchema({
		_id: new mongoose.Types.ObjectId(),
		resetPasswordToken,
	})

	newResetPasswordToken.save()

	res.json({
		success: true,
		link: `http://localhost:5000/users/reset-password/${resetPasswordToken}`,
	})
}

exports.resetPassword = async (req, res) => {
	const token = req.params.token
	let userId

	try {
		const decoded = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET)
		userId = decoded.userId
	} catch (err) {
		console.log(err)
		return res.json({
			succes: false,
			msg: 'Something went wrong, try request new link for email confirm',
		})
	}

	resetPasswordTokenSchema
		.findOne({ resetPasswordToken: token })
		.then(async (doc) => {
			if (!doc) {
				return res.json({
					success: false,
					msg: 'Link is not avaliable, request new link',
				})
			}

			const hashedNewPassword = await bcrypt.hash(req.body.newPass, 10)

			userSchema
				.findOneAndUpdate({ _id: userId }, { password: hashedNewPassword })
				.then((data) => {
					if (!data) return res.json({ success: false, msg: 'User not found' })
					res.json({ success: true, msg: 'Password was successfully changed' })
					resetPasswordTokenSchema
						.findOneAndDelete({ resetPasswordToken: token })
						.catch((err) => console.log(err))
				})
				.catch((err) => {
					console.log(err)
					res.json({ success: false, msg: 'Something went wrong' })
				})
		})
		.catch((err) => res.json({ success: false, msg: 'Something went wrong' }))
}

function generateEmailConfirmToken(user) {
	return jwt.sign(user, process.env.EMAIL_TOKEN_SECRET, { expiresIn: '1day' })
}

function generateResetPasswordToken(user) {
	return jwt.sign(user, process.env.RESET_PASSWORD_TOKEN_SECRET, {
		expiresIn: '1day',
	})
}

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

// other

exports.removeObjectFromProfile = (req, res) => {
	userSchema
		.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { addedLists: req.body.listId } }
		)
		.exec((err, doc) => {
			if (err) return res.json({ success: false })
			res.json({ success: true })
		})
}

exports.changeTheme = (req, res) => {
	userSchema
		.findOneAndUpdate({ _id: req.body.userId }, { theme: req.body.theme })
		.exec((error, doc) => {
			if (error) return res.json({ error, success: false })
			res.json({ success: true })
		})
}

exports.changeLanguage = (req, res) => {
	userSchema
		.findOneAndUpdate({ _id: req.body.userId }, { language: req.body.language })
		.exec((error, doc) => {
			if (error) return res.json({ error, success: false })
			res.json({ success: true })
		})
}

exports.changeDefaultTranslatesLanguage = (req, res) => {
	userSchema
		.findOneAndUpdate({ _id: req.body.userId }, { defaultTranslatesLanguage: req.body.defaultTranslatesLanguage })
		.exec((error, doc) => {
			if (error) return res.json({ error, success: false })
			res.json({ success: true })
		})
}

exports.addNewTestToProfile = (req, res) => {
	userSchema
		.findOneAndUpdate(
			{ _id: req.body.userId },
			{ $push: { tests: req.body.testId } }
		)
		.exec((error, doc) => {
			if (error) return res.json({ error, success: false })
			res.json({ success: true })
		})
}

exports.addNewListToProfile = (req, res) => {
	userSchema
		.findOneAndUpdate(
			{ _id: req.body.userId },
			{ $push: { addedLists: req.body.listId } }
		)
		.exec((error, doc) => {
			if (error) return res.json({ error, success: false })
			res.json({ success: true })
		})
}