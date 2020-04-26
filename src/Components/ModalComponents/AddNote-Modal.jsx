import React, { useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const AddNote = ({createNote, userId, disabledButtonStyle, closeModal}) => {
  const [isLoading, setIsLoading] = useState(false)
  const contentRef = useRef(null)

  const createNewNote = () => {
    setIsLoading(true)
    createNote(
      {
        content: contentRef.current.value,
        authorId: userId
      },
      () => {
        setIsLoading(false)
        closeModal()
      }
    )
  }

  return (
    <div className="main">
      <div className="item">
        <span>Content</span>
        <TextareaAutosize autoFocus inputRef={contentRef} />
      </div>
      <button onClick={() => createNewNote()} >Add</button>
    </div>
  )
}

export default AddNote