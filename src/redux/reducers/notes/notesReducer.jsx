import { notesAPI } from "../../../API/Api"
import { setError } from "../lists/listsReducer"

const notesState = {
  notes: [
    {
      _id: 1,
      authorId: 2,
      content: 'lorem'
    }
  ],
  error: ''
}

export const notesReducer = (state = notesState, action) => {
  switch (action.type) {
    case 'CREATE_NOTE' : {
      let newState = {...state}
      newState.notes.push(action.newNote)
      return {...newState}
    }
    case 'SET_NOTES' : {
      return {...state, notes: action.notes}
    }
    case 'UPDATE_NOTE': {
      let newState = {...state}
      
      for(let i = 0; i < newState.notes.length; i++) {
        if (newState.notes[i]._id === action.noteId) {
          newState.notes[i].content = action.newContent
          break
        }
      }
      
      return {...newState}
    }
    case 'REMOVE_NOTE': {
      let notes = state.notes.filter(note => note._id !== action.noteId)
      return {...state, notes}
    }
    default: return state
  }
}

const createNote = (newNote) => ({type: 'CREATE_NOTE', newNote})
const setNotes = (notes) => ({type: 'SET_NOTES', notes})
const updateNote = (noteId, newContent) => ({type: 'UPDATE_NOTE', noteId, newContent})
const removeNote = (noteId) => ({type: 'REMOVE_NOTE', noteId})

export const createNoteThunk = (newNote, success) => async (dispatch) => {
  let data = await notesAPI.createNote(newNote.authorId, newNote)

  if (data.success) {
    dispatch(createNote(data.note))
    success()
  } else {
    success({error: data.errorMessage})
  }
}

export const getNotesThunk = (userId) => async (dispatch) => {
  let data = await notesAPI.getNotes(userId)

  if (data.success) {
    dispatch(setNotes(data.data))
  } else {
    setError("Something went wrong! Try again")
  }
}

export const updateNoteThunk = (noteId, newContent, success) => async (dispatch) => {
  let data = await notesAPI.updateNote(noteId, newContent)
  
  if (data.success) {
    dispatch(updateNote(noteId, newContent))
    success()
  } else {
    success({error: data.errorMessage})
  }
}

export const removeNoteThunk = (noteId) => async (dispatch) => {
  let data = await notesAPI.removeNote(noteId)

  if (data.success) {
    dispatch(removeNote(noteId))
  } else {
    setError(data.errorMessage)
  }
}

