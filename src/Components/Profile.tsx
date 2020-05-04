import React, { useEffect } from "react"
import { ProfileSt } from "./Styled"
import { connect } from 'react-redux';
import { changeCurrentPageType } from "../redux/reducers/main/mainReducer";
import { UserStateType, UserQuestionType } from "../redux/reducers/users/usersReducer";
import TimeAgo from 'react-timeago'
import Head from "./Head";

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
      <Head title={'Profile'} />
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
              <span>{user.tests.length}</span>
            </div>
            {completedTests.length > 0 && (
              <div className='tests-wrapper'>
                <span>Completed tests:</span>
                <div className="tests">
                  {completedTests.map(test => <TestItem test={test} />)}
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