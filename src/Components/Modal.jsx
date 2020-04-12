import React, { useRef } from 'react'
import { ModalSt } from './Styled'
import { useState } from 'react'
import { create, addCategoryToProfile, checkIfCategoryIsExist, checkIfUserHaveCurrCategory, isUserListOwner, autoTranslate } from '../static/functions';
import Spiner from './Spiner';

const Modal = ({ currentListId, setModal, modal, items, user, getCategories, setGeneralLoadingTrue }) => {
  const [rightUnswersCount, setRightUnswersCount] = useState(0)
  const [error, setError] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const disabledButtonStyle = {
    backgroundColor: 'grey'
  }

  const createNew = (data) => {
    setIsLoading(true)
    setGeneralLoadingTrue()
    if (data.type === 'items') {
      create(data.type, {
        categoryId: currentListId,
        word: data.word,
        translate: data.translate
      }, () =>  {getCategories(); setIsLoading(false); setModal({isActive: false})} )
    } else {
      create(data.type, {
        title: data.name,
        authorId: user.sub
      }, () =>  {getCategories(); setIsLoading(false); setModal({isActive: false})} )
    }
  }

  const addListToProfile = (сategoryId) => {
    setIsLoading(true)
    setError(null)
    checkIfCategoryIsExist(
      {
        categoryId: сategoryId
      },
      (res) => {
        if(res.data.isExist) {
          checkIfUserHaveCurrCategory(
            {
              userId: user.sub,
              listId: сategoryId
            },
            (res) => {
              if (!res.isUserHave) {
                isUserListOwner(
                  {
                    userId: user.sub,
                    listId: сategoryId
                  },
                  (res) => {
                    if (!res.isUserOwner) {
                      addCategoryToProfile(
                        {
                          userId: user.sub,
                          categoryId: сategoryId
                        },
                        () => {
                          setIsLoading(false)
                          getCategories()
                          setModal({isActive: false})
                        }
                      )
                    } else {
                      setError('You cant add your list')
                    }
                  }
                )
                
              } else {
                setError('You already have this list')
              }
            }
          )
        } else {
          setError('This list doesn`t exist, check list id')
        }
      }
    )
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
              modal.type === 'test' && <span>{rightUnswersCount}/12</span>
            }
          </div>
          <svg
            onClick={() => setModal({ isActive: false })}
            width="17"
            height="18"
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8775 9L16.5683 4.30922C17.1439 3.73359 17.1439 2.80031 16.5683 2.22422L15.5258 1.18172C14.9502 0.606094 14.0169 0.606094 13.4408 1.18172L8.75 5.8725L4.05922 1.18172C3.48359 0.606094 2.55031 0.606094 1.97422 1.18172L0.931719 2.22422C0.356094 2.79984 0.356094 3.73312 0.931719 4.30922L5.6225 9L0.931719 13.6908C0.356094 14.2664 0.356094 15.1997 0.931719 15.7758L1.97422 16.8183C2.54984 17.3939 3.48359 17.3939 4.05922 16.8183L8.75 12.1275L13.4408 16.8183C14.0164 17.3939 14.9502 17.3939 15.5258 16.8183L16.5683 15.7758C17.1439 15.2002 17.1439 14.2669 16.5683 13.6908L11.8775 9Z"
              fill="#FF0000"
            />
          </svg>
        </div>
        {modal.type === 'words' && <AddWord disabledButtonStyle={disabledButtonStyle} isLoading={isLoading} createNew={data => createNew(data)} /> }
        {modal.type === 'lists' && <AddList disabledButtonStyle={disabledButtonStyle} isLoading={isLoading} error={error} addListToProfile={data => addListToProfile(data)} createNew={data => createNew(data)} /> }
        {modal.type === 'notes' && <AddNote /> }
        {modal.type === 'error' && <Error modal={modal} /> }
        {modal.type === 'test' && <TestModal items={items} modal={modal} /> }
        {modal.type === 'result' && <ResultModal items={items} modal={modal} /> }
        {modal.type === 'share' && <ShareModal categoryId={modal.categoryId} modal={modal} /> }
      </div>
    </ModalSt>
  )
}

const ShareModal = ({categoryId}) => {
  return(
    <div className="main">
      <div className="item">
        <span>Share this ID</span>
        <input type="text" contentEditable={false} value={categoryId} />
      </div>
      <span>or</span>
      <div className="item">
        <span>Share this url</span>
        <input type="text" contentEditable={false} value={`http://localhost:3000/lists/add/${categoryId}`} />
      </div>
    </div>
  )
}

const TestModal = ({items}) => {
  // button bg & color
  // rightanswer: #ff3547
  // wronganswer: green
  return (
    <div className="test">
      <div><span>Choose right meaning for 'word'</span></div>
      <div className="answers">
        <button>Answer</button>
        <button>Answer</button>
        <button>Answer</button>
      </div>
    </div>
  )
}

const ResultModal = () => {
  return (
    <div className="main">
      <span className='resultText'>Your result 12/12</span>
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

const AddWord = ({createNew, isLoading, disabledButtonStyle}) => {
  const [translates, setTranslates] = useState([])
  const [isTranslatesLoading, setTranslatesLoading] = useState(false)
  const wordRef = useRef()
  const translateRef = useRef()

  const getAutoTranslates = (phrase) => {
    setTranslatesLoading(true)
    autoTranslate(
      phrase,
      (res) => {
        setTranslatesLoading(false)
        setTranslates(res)
      }
    )
  }

  const chooseTranslate = (value) => {
    translateRef.current.value = value
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
              translates.length > 0 && <h2>You can choose one of this translates</h2>
            }
            <ul>
              {
                translates.map(item => (
                  <li onClick={() => chooseTranslate(item.value)} >{item.value}</li>
                ))
              }
            </ul>
          </div>
        )
      }
      <button disabled={isLoading} style={isLoading ? disabledButtonStyle : {} } onClick={() => createNew({type: 'items', word: wordRef.current.value, translate: translateRef.current.value})}>Create</button>
    </div>
  )
}

const AddList = ({createNew, addListToProfile, error, isLoading, disabledButtonStyle}) => {
  const categoryNameRef = useRef()
  const categoryIdRef = useRef(null)

  return (
    <div className="main">
      <div className="error">
        <span>{error}</span>
      </div>
      <div className="item">
        <span>Name</span>
        <input ref={categoryNameRef} type="text" />
      </div>
      <button disabled={isLoading} style={isLoading ? disabledButtonStyle : {} } onClick={ () => createNew({type: 'categories', name: categoryNameRef.current.value})} >Create</button>
      <div className="item">
        <span>Enter list ID</span>
        <input ref={categoryIdRef} type="text" />
      </div>
      <button disabled={isLoading} style={isLoading ? disabledButtonStyle : {} } onClick={ () => addListToProfile(categoryIdRef.current.value) } >Add</button>
    </div>
  )
}

const AddNote = () => {
  return (
    <div className="main">
      <div className="item">
        <span>Content</span>
        <input type="text" />
      </div>
      <button>Add</button>
    </div>
  )
}

export default Modal