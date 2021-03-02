import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { UserQuestionType, UserStateType } from '../../../redux/reducers/users/usersReducer'
import DefaultTranslatesLanguageSwitcher from '../../default-translates-language-switcher'
import CompletedTestsWrapper from '../compeleted-tests/completed-tests'
import ProfileInfoItem from './profile-info-item'

type ProfileInfoPropsType = {
  completedTests: Array<UserQuestionType>
  user: UserStateType
}

const ProfileInfo:React.FC<ProfileInfoPropsType> = ({
  user, completedTests
}) => {
  return (
    <div className="info">
      {
        user.role === 'admin' && <Link to='/admin-panel'>Admin Panel</Link>
      }
      
      <div>
        <span className='label'>Default translates language:</span>
        <DefaultTranslatesLanguageSwitcher />
      </div>

      {user.email && (
       <ProfileInfoItem label={'Email'} value={user.email} />
      )}

      {user.username && (
       <ProfileInfoItem label={'Username'} value={user.username} />
      )}

      {user.registerDate && (
        <div>
          <span className='label'>Registration date:</span>
          <Moment format={'DD.MM.YYYY'} >{user.registerDate}</Moment>
        </div>
      )}
      
      <div>
       <ProfileInfoItem label={'Completed tests count'} value={user.tests.length} />
      </div>

      {completedTests.length > 0 && (
        <CompletedTestsWrapper completedTests={completedTests} />
      )}
    </div>
  )
}

export default ProfileInfo