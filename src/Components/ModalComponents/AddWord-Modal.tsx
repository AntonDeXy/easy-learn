import React, { useState } from 'react'
import Spiner from '../Spiner'

type AddWordType = {
  autoTranslates: Array<{value: string}>
  closeModal: () => void
  currentListId: string
  getAutoTranslatesThunk: (phrase: string, success: any) => void
  createItemThunk: (item: {word: string, translate: string}, currentListId:string, success:any) => void
  disabledButtonStyle: any
}

const AddWord:React.FC<AddWordType> = ({autoTranslates, closeModal, currentListId, getAutoTranslatesThunk, createItemThunk, disabledButtonStyle}) => {
  const [isTranslatesLoading, setTranslatesLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [wordInputValue, setWordInputValue] = useState('')
  const [translateInputValue, setTranslateInputValue] = useState('')

  const getAutoTranslates = (phrase:any) => {
    setTranslatesLoading(true)
    getAutoTranslatesThunk(
      phrase,
      () => {
        setTranslatesLoading(false)
      }
    )
  }

  const chooseTranslate = (value: string) => {
    setTranslateInputValue(value)
  }

  const addWord = () => {
    setIsLoading(true)
    createItemThunk(
      {
        word: wordInputValue,
        translate: translateInputValue
      },
      currentListId,
      () => {
        setIsLoading(false)
        closeModal()
      }
    )
  }

  return (
    <div className="main">
      <div className="item">
        <span>Word</span>
        <input onBlur={(e) => getAutoTranslates(e.target.value)} autoFocus value={wordInputValue} onChange={e => setWordInputValue(e.currentTarget.value)} type="text" />
      </div>
      <div className="item">
        <span>Translate</span>
        <input value={translateInputValue} onChange={e => setTranslateInputValue(e.currentTarget.value)} type="text" />
      </div>
      {
        isTranslatesLoading
        ? <Spiner />
        : (
          <div className='translates'>
            {
              autoTranslates.length > 0 && <h2>You can choose one of this translates</h2>
            }
            <ul>
              {
                autoTranslates.map(item => (
                  <li onClick={() => chooseTranslate(item.value)} >{item.value}</li>
                ))
              }
            </ul>
          </div>
        )
      }
      <button disabled={isLoading} style={isLoading ? disabledButtonStyle : {} } onClick={() => addWord()}>Create</button>
    </div>
  )
}

export default AddWord