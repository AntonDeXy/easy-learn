import React, { useEffect } from "react"
import { ProfileSt } from "./Styled"
import { connect } from 'react-redux';
import { changeCurrentPageType } from "../redux/reducers/main/mainReducer";
import { UserStateType } from "../redux/reducers/users/usersReducer";

type ProfileType = {
  user: UserStateType
  setCurrentPageToProfile: () => void
}

const Profile:React.FC<ProfileType> = ({setCurrentPageToProfile, user}) => {
  
  useEffect(() => {
    setCurrentPageToProfile()
  }, [setCurrentPageToProfile])

  return (
    <ProfileSt>
      <div className="wrapper">
        {
          user.pictureUrl
          ? <img src={user.pictureUrl} alt="User" />
          : <div className="userImg"><span>{'<photo />'}</span></div>
        }
        <div className="info">
          {user.email && (
            <div>
              <span>email:</span>
              <span>{user.email}</span>
            </div>
          )}
          <div>
            <span>Completed tests count:</span>
            <span>{user.testsCount}</span>
          </div>
          <div>
            <span>Completed tests:</span>
            {user.tests.map(test => <div>{test._id}</div>)}
          </div>
        </div>
      </div>
    </ProfileSt>
  )
}

const mapStateToProps = (state:any) => ({
  user: state.userReducer,
})

const mapDispatchToProps = (dispatch:any) => ({
  setCurrentPageToProfile: () => dispatch(changeCurrentPageType('profile'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)