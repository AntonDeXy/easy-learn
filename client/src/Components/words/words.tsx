import React, { useState, useEffect } from 'react'
import Plus from '../Plus'
import { changeCurrentPageType, ItemType, ListType } from '../../redux/reducers/main/mainReducer'
import { connect } from 'react-redux'
import { updateItemThunk, removeItemThunk, getAudioAndTranscription, getList } from '../../redux/reducers/lists/listsReducer'
import { UserStateType } from '../../redux/reducers/users/usersReducer'
import { SetModalType } from '../../redux/reducers/modal/modalReducer'
import { useParams } from 'react-router-dom';
import Word from './word/word'
import { WordsWrapper } from './styles/styled-words'
import Spiner from '../Spiner';

type WordsType = {
  user: UserStateType
  modalType: string
  currentList: ListType
  getList: (listId: string) => void
  setModal: (data: SetModalType) => void
  updateItemThunk: (listId: string, itemId: string, newItem: ItemType, success: any) => any
  removeItemThunk: (listId: string, itemId: string, success: any) => any
  changeCurrentPageToLists: () => void
  changeCurrentPageToWords: () => void
  getAudioAndTranscription: (phrase: string, translatesLanguage: string) => {audio: string, transcription: string}
}

const Words: React.FC<WordsType> = ({ user, getAudioAndTranscription, currentList, getList, changeCurrentPageToWords, modalType, updateItemThunk, removeItemThunk, changeCurrentPageToLists, setModal }) => {
  const [list, setList] = useState<ListType | null>(null)
  const {listId} = useParams<{listId: string}>()
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    if (listId) {
      getList(listId)
    }
  }, [getList, listId])

  useEffect(() => {
    if(currentList) {
      setList(currentList)
    }
  }, [currentList])

  useEffect(() => {
    if (list) {
      setIsOwner(user._id === list.authorId ? true : false)
    }
    if (listId === list?._id) {
      setLoading(false)
    }
  }, [list, user._id, listId])

  return (
    <>
      <WordsWrapper>
        <Plus toGeneralPage={() => changeCurrentPageToLists()} openModal={() => setModal({ isActive: true, type: 'words' })} isOwner={isOwner} type="words" />
        <div className="lists">
          {
            isLoading ? (
              <Spiner />
            ) : (
              list?.items.map(word => {
                return <Word
                  getAudioAndTranscription={(phrase: string) => getAudioAndTranscription(phrase, user.defaultTranslatesLanguage)}
                  isTestStarted={modalType === 'test' ? true : false}
                  removeItemThunk={removeItemThunk}
                  currentListId={list._id ? list._id : ''}
                  updateItemThunk={updateItemThunk}
                  isOwner={isOwner}
                  key={word._id} item={word} />
              })
            )
          }
        </div>
      </WordsWrapper>
    </>
  )
}

const mapStateToProps = (state: any, ownProps: any) => ({
  lists: state.listsReducer.lists,
  errorMessage: state.listsReducer.errorMessage,
  modalType: state.modalReducer.type,
  currentList: state.listsReducer.currentList,
  ...ownProps
})

const mapDispatchToProps = (dispatch: any) => ({
  getAudioAndTranscription: (phrase: string, translatesLanguage: string) => dispatch(getAudioAndTranscription(phrase, translatesLanguage)),
  changeCurrentPageToLists: () => dispatch(changeCurrentPageType('lists')),
  changeCurrentPageToWords: () => dispatch(changeCurrentPageType('words')),
  updateItemThunk: (listId: string, itemId: string, newItem: ItemType, success: any) => dispatch(updateItemThunk(listId, itemId, newItem, success)),
  removeItemThunk: (listId: string, itemId: string, success: any) => dispatch(removeItemThunk(listId, itemId, success)),
  getList: (listId: string) => dispatch(getList(listId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Words)
