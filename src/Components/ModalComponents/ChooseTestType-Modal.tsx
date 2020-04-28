import React from 'react'

type ChooseTestTypeModalType = {
  setTestType: (type: string) => void
}

const ChooseTestTypeModal:React.FC<ChooseTestTypeModalType> = ({setTestType}) => {
  return (
    <div className="choose-test-type">
      <div className='title' ><span>Choose test type</span></div>
      <button onClick={() => setTestType('wordTranslates')} >
        <span>Word → tranlates</span>
      </button>
      <button onClick={() => setTestType('translateWords')} >
        <span>Translate → words</span>
      </button>
    </div>
  )
}

export default ChooseTestTypeModal