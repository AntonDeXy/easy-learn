import axios from 'axios'

const baseUrl = 'http://localhost:5001/'
// const baseUrl = 'https://cors-anywhere.herokuapp.com/https://easylern-backend.herokuapp.com/'
// const baseUrl = 'http://64.227.4.228:5001/'
// const baseUrl = 'https://cors-anywhere.herokuapp.com/https://easylern-backend.herokuapp.com/'

export const get = (type, userId, success) => {
  const url = baseUrl + type + '/' + userId
  axios
    .get(url)
    .then(res => success(res.data))
    .catch(err => console.log(err))
}

export const update = (type, id, newData, success) => {
  const url = baseUrl + type + '/' + id
  
  axios
    .put(url, newData)
    .then(res => success(res.data))
    .catch(err => console.log(err))
}

export const create = (type, obj, success) => {
  const url = baseUrl + type
  
  axios
    .post(url, obj)
    .then(res => success(res))
    .catch(err => console.log(err))
}

export const remove = (type, elId, success) => {
  const url = baseUrl + type + '/' + elId
  axios
    .delete(url)
    .then(res => success(res))
    .catch(err => console.log(err))
}

export const addCategoryToProfile = (data, success) => {
  const url = baseUrl + 'addCategoryToProfile'

  axios
    .post(url, data)
    .then(res => success(res))
    .catch(err => console.log(err))
}

export const checkIfCategoryIsExist = (data, success) => {
  const url = baseUrl + 'categoriesById/' + data.categoryId

  axios
    .get(url)
    .then(res => {
      success(res)
    })
    .catch(err => console.log(err))
}

export const checkIfUserHaveCurrCategory = (data, success) => {
  const url = baseUrl + 'users/' + data.userId

  axios
    .get(url)
    .then(res => {
      let haveUserThisCategory = false
      res.data.addedCategories.forEach(category => {
        if (data.listId === category._id) haveUserThisCategory = true
      })
      if (haveUserThisCategory) {
        success({isUserHave: true})
      }
      success({isUserHave: false})
    })
    .catch(err => console.log(err))
}

export const isUserListOwner = (data, success) => {
  const url = baseUrl + 'categories/' + data.userId

  axios
    .get(url)
    .then(res => {
      for (let id = 0; id < res.data.length; id++) {
        if (res.data[id]._id === data.listId) {
          return success({isUserOwner: true})
        }
      }
      success({isUserOwner: false})
    })
    .catch(err => console.log(err))
}

export const removeObjectFromProfile = (data, success) => {
  const url = baseUrl + 'removeObjectFromProfile'
  
  axios
    .post(url, data)
    .then(res => success(res))
    .catch(err => console.log(err))
}

export const updateUserInfo = (token, success) => {
  const url = baseUrl + 'api/me'
  const headers = {
    Authorization: 'Bearer ' + token
  }

  axios
    .get(url, { headers })
    .then(res => success(res))
    .catch(err => console.log(err))
}


export const removeMany = (data, success) => {
  const url = baseUrl + 'itemsRemoveMany'

  axios
    .post(url, {ids: data})
    .then(res => success(res))
    .catch(err => console.log(err))
}

export const autoTranslate = (phrase, success) => {
  if (phrase.length > 0) {
    const url = `https://cors-anywhere.herokuapp.com/api.lingualeo.com/gettranslates?word=${phrase}`

    axios
      .get(url)
      .then(res => success(res.data.translate))
      .catch(err => console.log(err))
  } else {
    success([])
  }
}

export const updateCategoryTitle = (id ,newData, success) => {
  const url = baseUrl + 'categories/' + id

  axios
    .put(url, newData)
    .then(res => success(res.data))
    .catch(err => console.log(err))
}

export const checkIfUserCreated = (userId, success) => {
  const url = baseUrl + 'users/' + userId
  
  axios
    .get(url)
    .then(res => success(res.data))
    .catch(err => console.log(err))
}

export const createNewUser = (userId, success) => {
  const url = baseUrl + 'users/'

  axios
    .post(url, {userIdFromAuth0: userId})
    .then(res => success(res.data))
    .catch(err => console.log(err))
}