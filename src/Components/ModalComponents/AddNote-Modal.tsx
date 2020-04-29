import React, { useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

type AddNoteTypes = {
  createNote: (data: {content: string, authorId: string}, success:any) => void
  userId: string
  disabledButtonStyle: any
  closeModal: () => void
}

const AddNote:React.FC<AddNoteTypes> = ({createNote, userId, disabledButtonStyle, closeModal}) => {
  const [isLoading, setIsLoading] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const createNewNote = () => {
    setIsLoading(true)
    createNote(
      {
        content: contentRef?.current ? contentRef.current.value : '',
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
      <button disabled={isLoading} style={isLoading ? disabledButtonStyle : {} } onClick={() => createNewNote()} >Add</button>
    </div>
  )
}

export default AddNote