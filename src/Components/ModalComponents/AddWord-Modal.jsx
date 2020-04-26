import React, { useRef, useState } from 'react'
import Spiner from '../Spiner'

const AddWord = ({createNew, autoTranslates, closeModal, currentListId, getAutoTranslatesThunk, createItemThunk, disabledButtonStyle}) => {
  const [isTranslatesLoading, setTranslatesLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const wordRef = useRef()
  const translateRef = useRef()

  const getAutoTranslates = (phrase) => {
    setTranslatesLoading(true)
    getAutoTranslatesThunk(
      phrase,
      (res) => {
        setTranslatesLoading(false)
      }
    )
  }

  const chooseTranslate = (value) => {
    translateRef.current.value = value
  }

  const addWord = () => {
    createItemThunk(
      {
        word: wordRef.current.value,
        translate: translateRef.current.value
      },
      currentListId,
      () => {
        closeModal()
      }
    )
  }

  return (
    <div className="main">
      <div className="item">
        <span>Word</span>
        <input onBlur={(e) => getAutoTranslates(e.target.value)} autoFocus ref={wordRef} type="text" />
      </div>
      <div className="item">
        <span>Translate</span>
        <input ref={translateRef} type="text" />
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