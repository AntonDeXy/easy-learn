import React from 'react'
import { UserQuestionType } from '../../../redux/reducers/users/usersReducer'
import CompletedTestItem from './completed-test-item'

type CompletedTestsWrapperPropsType = {
  completedTests: Array<UserQuestionType>
}

const CompletedTestsWrapper: React.FC<CompletedTestsWrapperPropsType> = ({
  completedTests
}) => {
  return (
    <div className='tests-wrapper'>
      <span className='label'>Completed tests:</span>
      <div className="tests">
        {completedTests.map(test => <CompletedTestItem key={test._id} test={test} />)}
      </div>
    </div>
  )
}

export default CompletedTestsWrapper