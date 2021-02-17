import { notesAPI } from "../../../API/Api"
import { setError } from "../lists/listsReducer"
import { CREATE_NOTE, SET_NOTES, UPDATE_NOTE, REMOVE_NOTE } from "./notesReducerTypes"

export type NoteType = {
  _id?: string
  authorId: string,
  content: string
}

type NotesStateType = {
  notes: Array<NoteType>
  error?: string
}

const notesState:NotesStateType = {
  notes: []
}

export const notesReducer = (state = notesState, action:any) => {
  switch (action.type) {
    case CREATE_NOTE: {
      let newState = {...state}
      newState.notes.push(action.newNote)
      return {...newState}
    }
    case SET_NOTES: {
      return {...state, notes: action.notes}
    }
    case UPDATE_NOTE: {
      let newState = {...state}
      
      for(let i = 0; i < newState.notes.length; i++) {
        if (newState.notes[i]._id === action.noteId) {
          newState.notes[i].content = action.newContent
          break
        }
      }
      
      return {...newState}
    }
    case REMOVE_NOTE: {
      let notes = state.notes.filter(note => note._id !== action.noteId)
      return {...state, notes}
    }
    default: return state
  }
}

type CreateNoteActionType = {
  type: typeof CREATE_NOTE
  newNote: NoteType
}
const createNote = (newNote:NoteType):CreateNoteActionType => ({type: CREATE_NOTE, newNote})

type SetNotesActionType = {
  type: typeof SET_NOTES
  notes: Array<NoteType>
}
const setNotes = (notes:Array<NoteType>):SetNotesActionType => ({type: SET_NOTES, notes})

type UpdateNoteActionType = {
  type: typeof UPDATE_NOTE
  noteId: string
  newContent: string
}
const updateNote = (noteId:string, newContent:string) => ({type: UPDATE_NOTE, noteId, newContent})

type RemoveNoteActionType = {
  type: typeof REMOVE_NOTE
  noteId: string
}
const removeNote = (noteId:string):RemoveNoteActionType => ({type: REMOVE_NOTE, noteId})

export const createNoteThunk = (newNote:NoteType, success:any) => async (dispatch:any) => {
  let data = await notesAPI.createNote(newNote.authorId, newNote)

  if (data.success) {
    dispatch(createNote(data.note))
    success()
  } else {
    success({error: data.errorMessage})
  }
}

export const getNotesThunk = (userId:string) => async (dispatch:any) => {
  let data = await notesAPI.getNotes(userId)

  if (data.success) {
    dispatch(setNotes(data.data))
  } else {
    setError("Something went wrong! Try again")
  }
}

export const updateNoteThunk = (noteId:string, newContent:string, success:any) => async (dispatch:any) => {
  let data = await notesAPI.updateNote(noteId, newContent)
  
  if (data.success) {
    dispatch(updateNote(noteId, newContent))
    success()
  } else {
    success({error: data.errorMessage})
  }
}

export const removeNoteThunk = (noteId:string) => async (dispatch:any) => {
  let data = await notesAPI.removeNote(noteId)

  if (data.success) {
    dispatch(removeNote(noteId))
  } else {
    setError(data.errorMessage)
  }
}

