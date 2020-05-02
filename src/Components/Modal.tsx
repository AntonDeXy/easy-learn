import React, { useEffect } from 'react'
import { ModalSt } from './Styled'
import { connect } from 'react-redux'
import { setModal, setTestModal, getNextQuestion, ModalStateType, SetModalType, TestType, createNewTestThunk } from '../redux/reducers/modal/modalReducer'
import { createListThunk, createItemThunk, getAutoTranslatesThunk, TranslateType } from '../redux/reducers/lists/listsReducer'
import { addListToProfileThunk, UserStateType, UserQuestionType } from '../redux/reducers/users/usersReducer'
import { createNoteThunk, NoteType } from '../redux/reducers/notes/notesReducer'
import AddList from './ModalComponents/AddList-Modal'
import AddNote from './ModalComponents/AddNote-Modal'
import ChooseTestTypeModal from './ModalComponents/ChooseTestType-Modal'
import ShareModal from './ModalComponents/Share-Modal'
import AddWord from './ModalComponents/AddWord-Modal'
import TestModal from './ModalComponents/Test-Modal'
import { ItemType, ListType } from '../redux/reducers/main/mainReducer'

type ModalType = {
  test: TestType
  currentList: ListType
  autoTranslates: Array<TranslateType>
  modal: ModalStateType
  user: UserStateType
  setTestModal: (data:{isActive: boolean, test: {type: string, initialItems: Array<ItemType>}, type: string}, variantsCount:number) => void
  createItemThunk: (item:ItemType, listId:string, success:any) => void
  createNote: (data:NoteType, success:any) => void
  setModal: (data:SetModalType) => void
  getAutoTranslatesThunk: (phrase:string, success:any) => void
  addListToProfileThunk: (listId:string, userId:string, success:any) => void
  createNewList: (data:ListType, success:any) => void
  getNextQuestion: (answer:string) => void
  createNewTestItem: (test:UserQuestionType, userId:string) => void
}

const Modal:React.FC<ModalType> = (
  {
    test, setTestModal, createItemThunk,
    createNote, setModal, currentList,
    autoTranslates, getAutoTranslatesThunk,
    modal, user, addListToProfileThunk,
    createNewList, getNextQuestion, createNewTestItem
  }) => {

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
          closeModal={() => setModal({isActive: false, type: ''})} 
          currentListId={currentList._id ? currentList._id : ''} 
          getAutoTranslatesThunk={getAutoTranslatesThunk} 
          disabledButtonStyle={disabledButtonStyle} 
          />
        }

        {modal.type === 'lists' && <AddList
          closeModal={() => setModal({isActive: false, type: ''})} 
          disabledButtonStyle={disabledButtonStyle} 
          userId={user.userId} 
          addListToProfileThunk={addListToProfileThunk}
          createNewList={createNewList} />
        }

        {modal.type === 'notes' && <AddNote 
          userId={user.userId} 
          createNote={createNote}
          disabledButtonStyle={disabledButtonStyle} 
          closeModal={() => setModal({isActive: false, type: ''})} />
        }

        {modal.type === 'error' && <Error modal={modal} /> }

        {modal.type === 'test' && <TestModal
          getNextQuestion={getNextQuestion}
          currentQuestion={test.currentQuestion}
          />
        }

        {modal.type === 'chooseTestType' &&<ChooseTestTypeModal
          setTestType={
            (testType:string) => {
              setTestModal(
                {
                  isActive: true, type: 'test',
                  test: {type: testType, initialItems: currentList.items}
                },
                3
              )
            }
            }/>
        }
        {modal.type === 'result' && <ResultModal userId={user.userId} createNewTestItem={createNewTestItem} test={test} /> }
        {modal.type === 'share' && <ShareModal categoryId={modal.listId} /> }
      </div>
    </ModalSt>
  )
}

type ResultModalType = {
  test: TestType
  userId: string
  createNewTestItem: (test:UserQuestionType, userId:string) => void
}

const ResultModal:React.FC<ResultModalType> = ({test, userId, createNewTestItem}) => {
  useEffect(() => {
    createNewTestItem(
      {
        type: test.type,
        questionsCount: test.questionsCount,
        rightAnswersCount: test.rightAnswersCount,
        items: test.itemsForTest
      },
      userId
    )
  }, [createNewTestItem, test.itemsForTest, test.questionsCount, test.rightAnswersCount, test.type, userId])

  return (
    <div className="main">
      <span className='resultText'>Your result {test.rightAnswersCount}/{test.questionsCount}</span>
    </div>
  )
}

type ErrorType = {
  modal: ModalStateType
}

const Error:React.FC<ErrorType> = ({modal}) => {
  return (
    <div className="main">
      <span className='error'>
        {modal.errorMessage}
      </span>
    </div>
  )
}

const mapStateToProps = (state:any, ownProps:any) => ({
  modal: state.modalReducer,
  user: state.userReducer,
  autoTranslates: state.listsReducer.autoTranslates,
  currentList: state.mainReducer.currentList,
  test: state.modalReducer.test,
  ...ownProps
})

const mapDispatchToProps = (dispatch:any) => ({
  addListToProfileThunk: (listId:string, userId:string, success:any) => dispatch(addListToProfileThunk(listId, userId, success)),
  setModal: (data:SetModalType) => dispatch(setModal(data)),
  createNewList: (data:ListType, success:any) => dispatch(createListThunk(data, success)),
  getAutoTranslatesThunk: (phrase:string, success:any) => dispatch(getAutoTranslatesThunk(phrase, success)),
  createItemThunk: (item:ItemType, listId:string, success:any) => dispatch(createItemThunk(item, listId, success)),
  createNote: (data:NoteType, success:any) => dispatch(createNoteThunk(data, success)),
  setTestModal: (data:ModalStateType, variantsCount:number) => dispatch(setTestModal(data, variantsCount)),
  getNextQuestion: (answer:string) => dispatch(getNextQuestion(answer)),
  createNewTestItem: (test:UserQuestionType, userId:string) => dispatch(createNewTestThunk(test, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)