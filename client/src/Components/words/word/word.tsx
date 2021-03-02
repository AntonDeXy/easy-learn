import { Popconfirm } from 'antd'
import React, { useState } from 'react'
import AutosizeInput from 'react-input-autosize'
import { ItemType } from '../../../redux/reducers/main/mainReducer'
import Spiner from '../../Spiner'
import { WordItemSt } from '../styles/styled-words'

type WordType = {
  isTestStarted: boolean
  item: ItemType
  isOwner: boolean
  currentListId: string
  updateItemThunk: (listId: string, itemId: string, newItem: ItemType, success: any) => any
  removeItemThunk: (listId: string, itemId: string, success: any) => any
  getAudioAndTranscription: (phrase: string) => {audio: string, transcription: string}
}

const Word: React.FC<WordType> = ({ getAudioAndTranscription, currentListId, isTestStarted, item, updateItemThunk, isOwner, removeItemThunk }) => {
  const [editMode, setEditMode] = useState(false)
  const [newWord, setNewWord] = useState(item.word)
  const [newTranslate, setNewTranslate] = useState(item.translate)
  const [isLoading, setIsLoading] = useState(false)
  const [audio, setAudio] = useState(new Audio(item.audioUrl))

  const toggleEditMode = async () => {
    const isDataEqualWithOld = newWord === item.word && newTranslate === item.translate
    if (editMode && currentListId && item?._id && !isDataEqualWithOld) {
      setIsLoading(true)
      const {audio, transcription} = await getAudioAndTranscription(newWord)
      setAudio(new Audio(audio))

      let newData = { ...item }
      newData.word = newWord
      newData.translate = newTranslate
      newData.audioUrl = audio
      newData.transcription = transcription

      updateItemThunk(
        currentListId,
        item._id,
        newData,
        () => {
          setIsLoading(false)
          setEditMode(!editMode)
        }
      )
    } else if (editMode && currentListId && item?._id && (!item.transcription || !item.audioUrl)) {
      setIsLoading(true)
      const {audio, transcription} = await getAudioAndTranscription(newWord)
      setAudio(new Audio(audio))

      let newData = { ...item }
      newData.audioUrl = audio
      newData.transcription = transcription

      updateItemThunk(
        currentListId,
        item._id,
        newData,
        () => {
          setIsLoading(false)
          setEditMode(!editMode)
        }
      )
    } else {
      setEditMode(!editMode)
    }
  }


  return (
    <WordItemSt>
      {
        isLoading
          ? <Spiner />
          : (
            <>
              <div className="word">
                {editMode ? (
                  <AutosizeInput
                    value={newWord}
                    type="text"
                    onChange={(e) => {
                      setNewWord(e.target.value)
                    }}
                  />
                ) : (
                    <>
                      <span style={isTestStarted ? { opacity: '0' } : {}} >{item.word}</span>
                      {
                        item.transcription && <span style={isTestStarted ? { opacity: '0' } : {}} className='transcription'>[{item.transcription}]</span>
                      }
                    </>
                  )}
              </div>
              <div className="translate">
                {editMode ? (
                  <AutosizeInput
                    value={newTranslate}
                    type="text"
                    onChange={(e) => {
                      setNewTranslate(e.target.value)
                    }}
                  />
                ) : (
                    <span style={isTestStarted ? { opacity: '0' } : {}} >{item.translate}</span>
                  )}
              </div>
            </>
          )}
      {isOwner && (
        <div className="functions">
          {editMode ? (
            <Popconfirm
              onCancel={() => {
                setEditMode(false)
                setNewTranslate(item.translate)
                setNewWord(item.word)
              }}
              onConfirm={() => toggleEditMode()}
              title="Do you want to save changes"
              okText="Yes"
              cancelText="No"
            >
              <svg
                width="23"
                height="20"
                viewBox="0 0 23 20"
                fill={isLoading ? 'grey' : '#5B659A'}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2266 3.25079L19.75 6.77423C19.8984 6.92267 19.8984 7.16486 19.75 7.31329L11.2188 15.8445L7.59375 16.2469C7.10938 16.3016 6.69922 15.8914 6.75391 15.407L7.15625 11.782L15.6875 3.25079C15.8359 3.10236 16.0781 3.10236 16.2266 3.25079ZM22.5547 2.35626L20.6484 0.450012C20.0547 -0.143738 19.0898 -0.143738 18.4922 0.450012L17.1094 1.83282C16.9609 1.98126 16.9609 2.22345 17.1094 2.37189L20.6328 5.89532C20.7812 6.04376 21.0234 6.04376 21.1719 5.89532L22.5547 4.51251C23.1484 3.91486 23.1484 2.95001 22.5547 2.35626ZM15.5 13.5242V17.5008H3V5.00079H11.9766C12.1016 5.00079 12.2188 4.95001 12.3086 4.86407L13.8711 3.30157C14.168 3.0047 13.957 2.50079 13.5391 2.50079H2.375C1.33984 2.50079 0.5 3.34064 0.5 4.37579V18.1258C0.5 19.1609 1.33984 20.0008 2.375 20.0008H16.125C17.1602 20.0008 18 19.1609 18 18.1258V11.9617C18 11.5438 17.4961 11.3367 17.1992 11.6297L15.6367 13.1922C15.5508 13.282 15.5 13.3992 15.5 13.5242Z"
                  fill="#5B659A"
                />
              </svg>
            </Popconfirm>
          ) : (
              <svg
                onClick={() => !isLoading && toggleEditMode()}
                width="23"
                height="20"
                viewBox="0 0 23 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2266 3.25079L19.75 6.77423C19.8984 6.92267 19.8984 7.16486 19.75 7.31329L11.2188 15.8445L7.59375 16.2469C7.10938 16.3016 6.69922 15.8914 6.75391 15.407L7.15625 11.782L15.6875 3.25079C15.8359 3.10236 16.0781 3.10236 16.2266 3.25079ZM22.5547 2.35626L20.6484 0.450012C20.0547 -0.143738 19.0898 -0.143738 18.4922 0.450012L17.1094 1.83282C16.9609 1.98126 16.9609 2.22345 17.1094 2.37189L20.6328 5.89532C20.7812 6.04376 21.0234 6.04376 21.1719 5.89532L22.5547 4.51251C23.1484 3.91486 23.1484 2.95001 22.5547 2.35626ZM15.5 13.5242V17.5008H3V5.00079H11.9766C12.1016 5.00079 12.2188 4.95001 12.3086 4.86407L13.8711 3.30157C14.168 3.0047 13.957 2.50079 13.5391 2.50079H2.375C1.33984 2.50079 0.5 3.34064 0.5 4.37579V18.1258C0.5 19.1609 1.33984 20.0008 2.375 20.0008H16.125C17.1602 20.0008 18 19.1609 18 18.1258V11.9617C18 11.5438 17.4961 11.3367 17.1992 11.6297L15.6367 13.1922C15.5508 13.282 15.5 13.3992 15.5 13.5242Z"
                  fill={isLoading ? 'grey' : '#5B659A'}
                />
              </svg>
            )}
          {
            (audio.src && item.audioUrl) && (
              <svg
                onClick={() => !isLoading && audio.play()}
                width="17"
                height="20"
                viewBox="0 0 576 512">
                <path fill={isLoading ? 'grey' : '#5B659A'} d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path>
              </svg>
            )
          }
          <svg
            onClick={() => (!isLoading && currentListId && item?._id) && removeItemThunk(currentListId, item._id, () => setIsLoading(false))}
            width="17"
            height="20"
            viewBox="0 0 17 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill={isLoading ? 'grey' : '#5B659A'}
              d="M1.2 17.6C1.2 18.0774 1.38964 18.5352 1.72721 18.8728C2.06477 19.2104 2.52261 19.4 3 19.4H13.8C14.2774 19.4 14.7352 19.2104 15.0728 18.8728C15.4104 18.5352 15.6 18.0774 15.6 17.6V5.00002H1.2V17.6ZM11.4 8.00001C11.4 7.84089 11.4632 7.68827 11.5757 7.57575C11.6883 7.46323 11.8409 7.40002 12 7.40002C12.1591 7.40002 12.3117 7.46323 12.4243 7.57575C12.5368 7.68827 12.6 7.84089 12.6 8.00001V16.4C12.6 16.5591 12.5368 16.7118 12.4243 16.8243C12.3117 16.9368 12.1591 17 12 17C11.8409 17 11.6883 16.9368 11.5757 16.8243C11.4632 16.7118 11.4 16.5591 11.4 16.4V8.00001ZM7.8 8.00001C7.8 7.84089 7.86321 7.68827 7.97573 7.57575C8.08825 7.46323 8.24087 7.40002 8.4 7.40002C8.55913 7.40002 8.71174 7.46323 8.82426 7.57575C8.93678 7.68827 9 7.84089 9 8.00001V16.4C9 16.5591 8.93678 16.7118 8.82426 16.8243C8.71174 16.9368 8.55913 17 8.4 17C8.24087 17 8.08825 16.9368 7.97573 16.8243C7.86321 16.7118 7.8 16.5591 7.8 16.4V8.00001ZM4.2 8.00001C4.2 7.84089 4.26321 7.68827 4.37573 7.57575C4.48826 7.46323 4.64087 7.40002 4.8 7.40002C4.95913 7.40002 5.11174 7.46323 5.22426 7.57575C5.33678 7.68827 5.4 7.84089 5.4 8.00001V16.4C5.4 16.5591 5.33678 16.7118 5.22426 16.8243C5.11174 16.9368 4.95913 17 4.8 17C4.64087 17 4.48826 16.9368 4.37573 16.8243C4.26321 16.7118 4.2 16.5591 4.2 16.4V8.00001ZM16.2 1.40002H11.7L11.3475 0.698769C11.2728 0.548849 11.1578 0.42274 11.0154 0.334628C10.8729 0.246517 10.7087 0.199899 10.5412 0.200019H6.255C6.08789 0.199376 5.92398 0.245821 5.78205 0.33403C5.64012 0.42224 5.52591 0.548647 5.4525 0.698769L5.1 1.40002H0.6C0.44087 1.40002 0.288258 1.46323 0.175736 1.57575C0.0632141 1.68828 0 1.84089 0 2.00002L0 3.20002C0 3.35915 0.0632141 3.51176 0.175736 3.62428C0.288258 3.7368 0.44087 3.80002 0.6 3.80002H16.2C16.3591 3.80002 16.5117 3.7368 16.6243 3.62428C16.7368 3.51176 16.8 3.35915 16.8 3.20002V2.00002C16.8 1.84089 16.7368 1.68828 16.6243 1.57575C16.5117 1.46323 16.3591 1.40002 16.2 1.40002Z"
            />
          </svg>
        </div>
      )}
    </WordItemSt>
  )
}

export default Word