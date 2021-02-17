import React, { useEffect } from "react"
import { ProfileSt } from "./Styled/Styled"
import { connect } from 'react-redux'
import { changeCurrentPageType } from "../redux/reducers/main/mainReducer"
import { UserStateType, UserQuestionType } from "../redux/reducers/users/usersReducer"
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import DefaultTranslatesLanguageSwitcher from './default-translates-language-switcher';

type ProfileType = {
  user: UserStateType
  setCurrentPageToProfile: () => void
}

const Profile: React.FC<ProfileType> = ({ setCurrentPageToProfile, user }) => {

  useEffect(() => {
    setCurrentPageToProfile()
  }, [setCurrentPageToProfile])


  useEffect(() => {
    document.title='Profile'
  }, [])

  const completedTests = [...user.tests]
  completedTests.reverse()
  return (
    <>
      <ProfileSt>
        <div className="wrapper">
            {/* <img src={user.pictureUrl} alt="User" /> */}
            <div className="userImg"><span>{'<photo />'}</span></div>
          <div className="info">
            {
              user.role === 'admin' && <Link to='/admin-panel' >Admin Panel</Link>
            }
            {user.email && (
              <div>
                <span className='label'>email:</span>
                <span>{user.email}</span>
              </div>
            )}
            {user.username && (
              <div>
                <span className='label' >username:</span>
                <span>{user.username}</span>
              </div>
            )}
            {user.registerDate && (
              <div>
                <span className='label'>Registration date:</span>
                <Moment format={'DD.MM.YYYY'} >{user.registerDate}</Moment>
              </div>
            )}
            <div>
              <span className='label'>Default translates language:</span>
              <DefaultTranslatesLanguageSwitcher />
            </div>
            <div>
              <span className='label'>Completed tests count:</span>
              <span>{user.tests.length}</span>
            </div>
            {completedTests.length > 0 && (
              <div className='tests-wrapper'>
                <span className='label'>Completed tests:</span>
                <div className="tests">
                  {completedTests.map(test => <TestItem key={test._id} test={test} />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </ProfileSt>
    </>
  )
}

type TestItemType = {
  test: UserQuestionType
}

const TestItem: React.FC<TestItemType> = ({ test }) => {
  return (
    <div className="test-item">
      <div className="list-name">{test.listName}</div>
      <div className="answers">
        <span>{test.rightAnswersCount}/{test.questionsCount}</span>
      </div>
      <div className='date'>
        {
          test?.date && (
            <TimeAgo date={test.date} />
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.userReducer,
})

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentPageToProfile: () => dispatch(changeCurrentPageType('profile'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)