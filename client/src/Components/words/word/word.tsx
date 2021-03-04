import React, { useState } from 'react'
import AutosizeInput from 'react-input-autosize'
import { ItemType } from '../../../redux/reducers/main/mainReducer'
import Spiner from '../../Spiner'
import { RemoveItemButton, TurnOffEditModeButton, TurnOnEditModeButton } from '../buttons/buttons'
import { WordItemSt } from '../styles/styled-words'

type WordType = {
  isTestStarted: boolean
  item: ItemType
  isOwner: boolean
  currentListId: string
  updateItemThunk: (listId: string, itemId: string, newItem: ItemType, success: any) => any
  removeItemThunk: (listId: string, itemId: string, success: any) => any
}

const Word: React.FC<WordType> = ({ currentListId, isTestStarted, item, updateItemThunk, isOwner, removeItemThunk }) => {
  const [editMode, setEditMode] = useState(false)
  const [newWord, setNewWord] = useState(item.word)
  const [newTranslate, setNewTranslate] = useState(item.translate)
  const [isLoading, setIsLoading] = useState(false)

  const toggleEditMode = async () => {
    const isDataEqualWithOld = newWord === item.word && newTranslate === item.translate
    
    if (editMode && currentListId && item?._id && !isDataEqualWithOld) {
      setIsLoading(true)
      
      const newData = { ...item, word: newWord, translate: newTranslate }

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

  const onCancelEdit = () => {
    setEditMode(false)
    setNewTranslate(item.translate)
    setNewWord(item.word)
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
                      {/* There was transcription, but lingualeo api works bad :( ) */}
                      {/* {
                        item.transcription && <span style={isTestStarted ? { opacity: '0' } : {}} className='transcription'>[{item.transcription}]</span>
                      } */}
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
            <TurnOffEditModeButton
              onCancel={onCancelEdit}
              onConfirm={toggleEditMode}
              isLoading={isLoading}
            />
          ) : (
            <TurnOnEditModeButton
              isLoading={isLoading}  
              onClick={() => !isLoading && toggleEditMode()}
            />
            )}
          {/* There was button to listen phrase, but lingualeo api works bad :( ) */}
          {/* {
            (audio.src && item.audioUrl) && (
              <ListenPhraseButton 
                isLoading={isLoading}  
                onClick={() => !isLoading && audio.play()} />
            )
          } */}
         <RemoveItemButton 
          isLoading={isLoading}
          onClick={() => (!isLoading && item._id) && removeItemThunk(
            currentListId, item._id, () => setIsLoading(false)
          )}
         />
        </div>
      )}
    </WordItemSt>
  )
}

export default Word