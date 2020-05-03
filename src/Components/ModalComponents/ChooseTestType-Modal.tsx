import React, { useState } from 'react'
import { InputNumber } from 'antd'

type ChooseTestTypeModalType = {
  itemsCount: number
  setTestType: (type: string, questionsCount:number) => void
}

const ChooseTestTypeModal:React.FC<ChooseTestTypeModalType> = ({setTestType, itemsCount}) => {
  const [questionsCount, setQuestionsCount] = useState(itemsCount)
  const minQuestionCount = 5

  return (
    <div className="choose-test-type">
      <div className='title' ><span>Choose test type</span></div>
      <button onClick={() => setTestType('wordTranslates', +questionsCount)} >
        <span>Word → tranlates</span>
      </button>
      <button onClick={() => setTestType('translateWords', +questionsCount)} >
        <span>Translate → words</span>
      </button>
      <div className="questionsCount">
        <span>
          Questions count:
        </span>
        <InputNumber min={minQuestionCount} max={itemsCount} defaultValue={itemsCount} onChange={value => setQuestionsCount(value ? value : 5)} />
      </div>
    </div>
  )
}

export default ChooseTestTypeModal