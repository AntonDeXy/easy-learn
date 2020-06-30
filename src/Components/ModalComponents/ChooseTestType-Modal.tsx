import React, { useState } from 'react'
import { InputNumber } from 'antd'
import { useTranslation } from 'react-i18next';

type ChooseTestTypeModalType = {
  itemsCount: number
  setTestType: (type: string, questionsCount:number) => void
}

const ChooseTestTypeModal:React.FC<ChooseTestTypeModalType> = ({setTestType, itemsCount}) => {
  const [questionsCount, setQuestionsCount] = useState(itemsCount)
  const minQuestionCount = 5

  const { t } = useTranslation() 

  return (
    <div className="choose-test-type">
      <button onClick={() => setTestType('wordTranslates', +questionsCount)} >
        <span>{t('modal.testTypes.wordTranslates')}</span>
      </button>
      <button onClick={() => setTestType('translateWords', +questionsCount)} >
        <span>{t('modal.testTypes.translateWords')}</span>
      </button>
      <div className="questionsCount">
        <span>
          {t('modal.testTypes.questionsCount')}:
        </span>
        <InputNumber
         min={minQuestionCount} 
         max={itemsCount} 
         defaultValue={itemsCount} 
         onChange={value => setQuestionsCount(value ? value : 5)} />
      </div>
    </div>
  )
}

export default ChooseTestTypeModal