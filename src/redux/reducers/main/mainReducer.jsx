import { SET_CURRENT_LIST } from "../lists/listsReducerTypes"

const mainState = {
  currentPage: 'lists',
  currentList: {}
}

export const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_PAGE': {
      return {...state, currentPage: action.pageType}
    }
    case SET_CURRENT_LIST: {
      return {...state, currentList: action.currentList}
    }
    default: return state
  }
}

export const setCurrentList = (currentList) => ({type: SET_CURRENT_LIST, currentList})
export const changeCurrentPageType = (pageType) => ({type: 'CHANGE_CURRENT_PAGE', pageType})

export default mainReducer