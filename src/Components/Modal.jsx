import React from 'react'
import { ModalSt } from './Styled'
import { useState } from 'react'
import { connect } from 'react-redux'
import { setModal, setTestModal, getNextQuestion } from '../redux/reducers/modal/modalReducer'
import { createListThunk, createItemThunk, getAutoTranslatesThunk } from '../redux/reducers/lists/listsReducer'
import { addListToProfileThunk } from '../redux/reducers/users/usersReducer'
import { createNoteThunk } from '../redux/reducers/notes/notesReducer'
import AddList from './ModalComponents/AddList-Modal'
import AddNote from './ModalComponents/AddNote-Modal'
import ChooseTestTypeModal from './ModalComponents/ChooseTestType-Modal'
import ShareModal from './ModalComponents/Share-Modal'
import AddWord from './ModalComponents/AddWord-Modal'
import TestModal from './ModalComponents/Test-Modal'

const Modal = (
  {
    test, setTestModal, createItemThunk,
    createNote, setModal, currentList,
    currentListId, autoTranslates, getAutoTranslatesThunk,
    modal, items, user, addListToProfileThunk,
    getCategories, setGeneralLoadingTrue, createNewList,
    getNextQuestion
  }) => {
  const [isLoading, setIsLoading] = useState(false)

  const disabledButtonStyle = {
    backgroundColor: 'grey'
  }

  return (
    <ModalSt>
      <div className="modal">
        <div className="header testHeader">
          <div>
            {modal.type === 'words' && <span>Create new word</span>}
            {modal.type === 'lists' && <span>Create new list</span>}
            {modal.type === 'notes' && <span>Create new note</span>}
            {modal.type === 'error' && <span>Error</span>}
            {modal.type === 'test' && <span>Test</span>}
            {modal.type === 'result' && <span>Result</span>}
            {modal.type === 'share' && <span>Share</span>}
          </div>
          <div>
            {
              modal.type === 'test' && <span>{test.questionId}/{test.questionsCount}</span>
            }
          </div>
          <svg
            onClick={() => setModal({ isActive: false, type: '' })}
            width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8775 9L16.5683 4.30922C17.1439 3.73359 17.1439 2.80031 16.5683 2.22422L15.5258 1.18172C14.9502 0.606094 14.0169 0.606094 13.4408 1.18172L8.75 5.8725L4.05922 1.18172C3.48359 0.606094 2.55031 0.606094 1.97422 1.18172L0.931719 2.22422C0.356094 2.79984 0.356094 3.73312 0.931719 4.30922L5.6225 9L0.931719 13.6908C0.356094 14.2664 0.356094 15.1997 0.931719 15.7758L1.97422 16.8183C2.54984 17.3939 3.48359 17.3939 4.05922 16.8183L8.75 12.1275L13.4408 16.8183C14.0164 17.3939 14.9502 17.3939 15.5258 16.8183L16.5683 15.7758C17.1439 15.2002 17.1439 14.2669 16.5683 13.6908L11.8775 9Z"
              fill="#FF0000"
            />
          </svg>
        </div>
        {modal.type === 'words' && <AddWord
          createItemThunk={createItemThunk} 
          autoTranslates={autoTranslates} 
          closeModal={() => setModal({isActive: false})} 
          currentListId={currentListId} 
          getAutoTranslatesThunk={getAutoTranslatesThunk} 
          disabledButtonStyle={disabledButtonStyle} 
          setIsLoading={setIsLoading}
          isLoading={isLoading} />
        }

        {modal.type === 'lists' && <AddList
          closeModal={() => setModal({isActive: false})} 
          disabledButtonStyle={disabledButtonStyle} 
          setIsLoading={setIsLoading}
          isLoading={isLoading} 
          userId={user.userId} 
          addListToProfileThunk={addListToProfileThunk}
          createNewList={createNewList} />
        }

        {modal.type === 'notes' && <AddNote 
          userId={user.userId} 
          createNote={createNote}
          setIsLoading={setIsLoading}
          disabledButtonStyle={disabledButtonStyle} 
          closeModal={() => setModal({isActive: false})} />
        }

        {modal.type === 'error' && <Error modal={modal} /> }

        {modal.type === 'test' && <TestModal
          getNextQuestion={getNextQuestion}
          currentQuestion={test.currentQuestion}
          setIsLoading={setIsLoading}
          setModal={setModal} />
        }

        {modal.type === 'chooseTestType' &&<ChooseTestTypeModal
          setTestType={
            (testType) => {
              setTestModal(
              {
                isActive: true, type: 'test',
                test: {type: testType, initialItems: currentList.items}
              })
            }
            }/>
        }
        {modal.type === 'result' && <ResultModal test={test} /> }
        {modal.type === 'share' && <ShareModal categoryId={modal.listId} modal={modal} /> }
      </div>
    </ModalSt>
  )
}

const ResultModal = ({test}) => {
  return (
    <div className="main">
      <span className='resultText'>Your result {test.rightAnswersCount}/{test.questionsCount}</span>
    </div>
  )
}

const Error = ({modal}) => {
  return (
    <div className="main">
      <span className='error'>
        {modal.errorMessage}
      </span>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  modal: state.modalReducer,
  user: state.userReducer,
  autoTranslates: state.listsReducer.autoTranslates,
  currentListId: state.mainReducer.currentList._id,
  currentList: state.mainReducer.currentList,
  test: state.modalReducer.test,
  ...ownProps
})

const mapDispatchToProps = (dispatch) => ({
  addListToProfileThunk: (listId, userId, success) => dispatch(addListToProfileThunk(listId, userId, success)),
  setModal: (data) => dispatch(setModal(data)),
  createNewList: (data, success) => dispatch(createListThunk(data, success)),
  getAutoTranslatesThunk: (phrase, success) => dispatch(getAutoTranslatesThunk(phrase, success)),
  createItemThunk: (item, listId, success) => dispatch(createItemThunk(item, listId, success)),
  createNote: (data, success) => dispatch(createNoteThunk(data, success)),
  setTestModal: (data) => dispatch(setTestModal(data)),
  getNextQuestion: (answer) => dispatch(getNextQuestion(answer))
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)