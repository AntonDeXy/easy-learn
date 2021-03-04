import React, { useEffect } from 'react'
import {  NotesWrapper } from './styles/styled-notes'
import Plus from '../Plus'
import { NoteType, removeNoteThunk, updateNoteThunk } from '../../redux/reducers/notes/notesReducer'
import { setModal, SetModalType } from '../../redux/reducers/modal/modalReducer'
import { changeCurrentPageType } from '../../redux/reducers/main/mainReducer'
import { connect } from 'react-redux'
import Note from './note/note'

type NotesType = {
  setModal: (data: SetModalType) => void
  updateNoteThunk: (noteId: string, newContent: string, success: any) => void
  removeNoteThunk: (noteId: string) => void
  changeCurrentPageToNotes: () => void
  notesReducer: { notes: Array<NoteType> }
}

const Notes: React.FC<NotesType> = ({ setModal, updateNoteThunk, changeCurrentPageToNotes, removeNoteThunk, notesReducer }) => {

  useEffect(() => {
    changeCurrentPageToNotes()
  }, [changeCurrentPageToNotes])

  return (
    <NotesWrapper>
      <Plus openModal={() => setModal({ isActive: true, type: 'notes' })} type="notes" />
      <div className="lists">
        {
          notesReducer.notes.map(note => (
            <Note
              note={note} 
              updateNote={updateNoteThunk} 
              removeNote={() => note._id && removeNoteThunk(note._id)}
            />)
          )
        }
      </div>
    </NotesWrapper>
  )
}

const mapStateToProps = (state: any) => ({
  notesReducer: state.notesReducer,
})

const mapDispatchToProps = (dispatch: any) => ({
  changeCurrentPageToNotes: () => dispatch(changeCurrentPageType('notes')),
  setModal: (data: SetModalType) => dispatch(setModal(data)),
  updateNoteThunk: (noteId: string, newContent: string, success: any) => dispatch(updateNoteThunk(noteId, newContent, success)),
  removeNoteThunk: (noteId: string) => dispatch(removeNoteThunk(noteId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes)