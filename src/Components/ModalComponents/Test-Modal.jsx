import React from 'react'

const TestModal = ({currentQuestion, getNextQuestion, setModal}) => {
  return (
    <div className="test">
      <div><span>Choose right meaning for <b>{currentQuestion && currentQuestion.value1}</b></span></div>
      <div className="answers">
        {
          currentQuestion && currentQuestion.variants.map((variant, index) => {
            let isClicked = false
            return (
              <button
                onClick={(e) => {
                  if (variant.value === currentQuestion.rightAnswer) {
                    isClicked = true
                    if (isClicked) {
                      e.target.style.color = '#00b500'
                      e.target.style.borderColor = '#00b500'
                    }
                  } else {
                    isClicked = true
                    if (isClicked) {
                      e.target.style.color = '#ff3547'
                      e.target.style.borderColor = '#ff3547'
                    }
                  }
                  setTimeout(
                    () => {
                      getNextQuestion(variant.value)
                    },
                    500
                  )
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