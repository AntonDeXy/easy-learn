import React from 'react'
import TimeAgo from 'react-timeago'
import { UserQuestionType } from '../../../redux/reducers/users/usersReducer'

type CompletedTestItemPropsType = {
  test: UserQuestionType
}
const CompletedTestItem: React.FC<CompletedTestItemPropsType> = ({
  test
}) => {
  return (
    <div className="test-item">
      <div className="list-name">
        <h2>{test.listName}</h2>
      </div>
      <div className="answers">
      </div>
        <span>{test.rightAnswersCount}/{test.questionsCount}</span>
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

export default CompletedTestItem