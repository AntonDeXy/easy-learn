import React from 'react'
import { QuestionType } from '../../redux/reducers/modal/modalReducer'

type TestModalType = {
  currentQuestion: QuestionType
  getNextQuestion: (answer:string) => void
}

const TestModal:React.FC<TestModalType> = ({currentQuestion, getNextQuestion}) => {
  return (
    <div className="test">
      <div><span>Choose right meaning for <b>{currentQuestion && currentQuestion.value1}</b></span></div>
      <div className="answers">
        {
          currentQuestion && currentQuestion.variants.map((variant) => {
            let isClicked = false
            return (
              <button
                onClick={(e) => {
                  if (!isClicked) {
                    isClicked = true
                    if (variant.value === currentQuestion.rightAnswer) {
                      e.currentTarget.classList.add('rightAnswer')
                    } else {
                      e.currentTarget.classList.add('wrongAnswer')
                    }
                    setTimeout(
                      () => {
                        getNextQuestion(variant.value)
                      },
                      500
                    )
                  }
                }}
                key={variant.key}
              >{variant.value}</button>
            )
          })
        }
      </div>
    </div>
  )
}

export default TestModal