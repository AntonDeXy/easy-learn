import { itemsAPI } from "../../../API/Api"

const modalState = {
  isActive: false,
  type: '',
  listId: ''
}

const modalReducer = (state = modalState, action) => {
  switch (action.type) {
    case 'SET_MODAL': {
      return {...state, ...action.modalData}
    }
    default: return state
  }
}

export const setModal = (modalData) => ({type: 'SET_MODAL', modalData})


export default modalReducer