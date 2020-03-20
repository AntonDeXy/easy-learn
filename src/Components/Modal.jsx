import React from 'react'
import { ModalSt } from './Styled'

const Modal = ({ setModal, modal, items }) => {
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
          </div>
          <div>
            {
              modal.type === 'test' && <span>10/12</span>
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
        {modal.type === 'words' && <AddWord /> }
        {modal.type === 'lists' && <AddList /> }
        {modal.type === 'notes' && <AddNote /> }
        {modal.type === 'error' && <Error modal={modal} /> }
        {modal.type === 'test' && <TestModal items={items} modal={modal} /> }
        {modal.type === 'result' && <ResultModal items={items} modal={modal} /> }
      </div>
    </ModalSt>
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

const AddWord = () => {
  return (
    <div className="main">
      <div className="item">
        <span>Word</span>
        <input type="text" />
      </div>
      <div className="item">
        <span>Translate</span>
        <input type="text" />
      </div>
      <button>Create</button>
    </div>
  )
}

const AddList = () => {
  return (
    <div className="main">
      <div className="item">
        <span>Name</span>
        <input type="text" />
      </div>
      <button>Create</button>
      <div className="item">
        <span>Enter list ID</span>
        <input type="text" />
      </div>
      <button>Add</button>
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