import React, { useState } from 'react'
import Spiner from '../Spiner'
import { useTranslation } from 'react-i18next';

type AddWordType = {
  disabledButtonStyle: any
  autoTranslates: Array<{value: string}>
  currentListId: string
  closeModal: () => void
  getAutoTranslatesThunk: (phrase: string, success: any) => void
  createItemThunk: (item: {word: string, translate: string, audioUrl: string}, currentListId:string, success:any) => void
}

const AddWord:React.FC<AddWordType> = ({autoTranslates, closeModal, currentListId, getAutoTranslatesThunk, createItemThunk, disabledButtonStyle}) => {
  const [isTranslatesLoading, setTranslatesLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [wordInputValue, setWordInputValue] = useState('')
  const [translateInputValue, setTranslateInputValue] = useState('')
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined)

  const { t } = useTranslation() 

  const getAutoTranslates = (phrase:any) => {
    if (phrase.length > 0) {
      setAudio(undefined)
      setTranslatesLoading(true)
      getAutoTranslatesThunk(
        phrase,
        (audioUrl:string) => {
          setAudio(new Audio(audioUrl))
          setTranslatesLoading(false)
        }
      )
    }
  }

  const playAudio = () => {
    audio?.play()
  }

  const chooseTranslate = (value: string) => {
    setTranslateInputValue(value)
  }

  const addWord = () => {
    setIsLoading(true)
    createItemThunk(
      {
        word: wordInputValue,
        translate: translateInputValue,
        audioUrl: audio?.src ? audio.src : ''
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
        <span>{t('modal.word')}</span>
        <input 
          onBlur={(e) => getAutoTranslates(e.target.value)} 
          autoFocus 
          value={wordInputValue} 
          onChange={e => setWordInputValue(e.currentTarget.value)} 
          type="text" />
      </div>
      <div className="item">
        <span>{t('modal.translate')}</span>
        <input 
          value={translateInputValue} 
          onChange={e => setTranslateInputValue(e.currentTarget.value)} 
          type="text" />
      </div>
      {
        audio && (
          <div onClick={() => playAudio()} className='playAudio' >
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-up" className="svg-inline--fa fa-volume-up fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>
          </div>
        )
      }
      {
        isTranslatesLoading
        ? <Spiner />
        : (
          <div className='translates'>
            {
              autoTranslates?.length > 0 && <h2>{t('modal.youCanChooseOneOfThisTranslates')}</h2>
            }
            <ul>
              {
                autoTranslates?.length > 0 && autoTranslates.map(item => (
                  <li onClick={() => chooseTranslate(item.value)} >{item.value}</li>
                ))
              }
            </ul>
          </div>
        )
      }
      <button
        disabled={isLoading}
        style={isLoading ? disabledButtonStyle : {} } 
        onClick={() => addWord()}>
        {t('modal.create')}
      </button>
    </div>
  )
}

export default AddWord