import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { changeCurrentPageType } from "../../redux/reducers/main/mainReducer"
import { UserStateType } from "../../redux/reducers/users/usersReducer"
import ProfileInfo from "./profile-info/profile-info"
import { ProfileSt } from '../profile/styles/styled-profile'

type ProfileType = {
  user: UserStateType
  setCurrentPageToProfile: () => void
}

const Profile: React.FC<ProfileType> = ({ setCurrentPageToProfile, user }) => {

  useEffect(() => {
    setCurrentPageToProfile()
  }, [setCurrentPageToProfile])

  const completedTests = [...user.tests]
  completedTests.reverse()

  return (
    <>
      <ProfileSt>
        <div className="wrapper">
            {/* <img src={user.pictureUrl} alt="User" /> */}
            <div className="userImg"><span>{'<photo />'}</span></div>
            <ProfileInfo user={user} completedTests={completedTests} />
        </div>
      </ProfileSt>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.userReducer,
})

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentPageToProfile: () => dispatch(changeCurrentPageType('profile'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)