import { CHANGE_CURRENT_PAGE, SET_CURRENT_LIST } from "./mainReducerTypes"

export type ItemType = {
  _id?: string
  word: string
  translate: string
  transcription?: string
  audioUrl?: string
}

export type pageType = 'words' | 'lists' | 'notes' | 'help' | 'profile' | 'unregistred' | 'auth'

export type ListType = {
  _id?: string
  name: string
  authorId: string
  items: Array<ItemType>
}

type MainStateType = {
  currentPage: pageType,
  currentList?: ListType
}

const mainState: MainStateType = {
  currentPage: 'unregistred'
}

export const mainReducer = (state = mainState, action: any):MainStateType => {
  switch (action.type) {
    case CHANGE_CURRENT_PAGE: {
      return {...state, currentPage: action.pageType}
    }
    case SET_CURRENT_LIST: {
      return {...state, currentList: action.currentList}
    }
    default: return state
  }
}


type SetCurrentListActionType = {
  type: typeof SET_CURRENT_LIST
  currentList: ListType
}

export const setCurrentList = (currentList:ListType):SetCurrentListActionType => ({type: SET_CURRENT_LIST, currentList})

type ChangeCurrentPageTypeActionType = {
  type: typeof CHANGE_CURRENT_PAGE,
  pageType: pageType
}

export const changeCurrentPageType = (pageType:pageType):ChangeCurrentPageTypeActionType => ({type: CHANGE_CURRENT_PAGE, pageType})

export default mainReducer