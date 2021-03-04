import { SET_LIST_ITEMS, SET_NEW_LIST_NAME, REMOVE_LIST, CREATE_LIST, ADD_NEW_ITEM, CHANGE_ITEM_DATA, REMOVE_ITEM, SET_ERROR, CLEAR_ERROR, SET_LOADING, SET_TRANSLATES, CLEAR_TRANSLATES, ADD_USERS_LISTS, SET_CURRENT_LIST, REMOVE_CURRENT_LIST } from './listsReducerTypes'
import { listsAPI, itemsAPI } from '../../../API/Api'
import { ListType, ItemType } from '../main/mainReducer'

type ListsStateType = {
  lists: Array<ListType>
  isLoading: boolean
  errorMessage: string
  autoTranslates: Array<string>
  currentList: ListType | null
}

const listsState:ListsStateType = {
  lists: [],
  isLoading: false,
  errorMessage: '',
  autoTranslates: [],
  currentList: null
}

const listsReducer = (state = listsState, action: any) => {
  switch (action.type) {
    case SET_LIST_ITEMS: {
      return {...state, lists: action.lists}
    }
    case SET_NEW_LIST_NAME: {
      let newState = {...state}
      newState.lists.forEach(list => {
        if (list._id === action.listId) {
          list.name = action.newName
        }
      })
      return {...newState}
    }
    case REMOVE_LIST: {
      let lists = state.lists.filter(list => list._id !== action.listId)
      return {...state, lists}
    }
    case CREATE_LIST: {
      let newState = {...state}
      newState.lists.push(action.newList)
      return {...newState}
    }
    // items
    case ADD_NEW_ITEM: {
      const newCurrentListItems = [...state?.currentList?.items || [], action.newItem] 

      return {...state, currentList: {...state.currentList, items: newCurrentListItems}}
    }
    case CHANGE_ITEM_DATA: {
      const newState = {...state}
      const newItemsArr = newState.currentList?.items.map(item => {
        if (item._id === action.itemId) {
          return action.newItem
        }
        return item
      })

      return {...newState, currentList: {...newState.currentList, items: newItemsArr}}
    }
    case REMOVE_ITEM: {
      if (state.currentList && state.currentList.items.length > 0) {
        const newCurrentListItems = state.currentList.items.filter(item => item._id !== action.itemId)
        return {...state, currentList: {...state.currentList, items: newCurrentListItems}}
      }

      return state
    }
    case SET_CURRENT_LIST: {
      return {...state, currentList: action.list}
    }
    case SET_ERROR: {
      return ({...state, errorMessage: action.errorMessage})
    }
    case CLEAR_ERROR: {
      return ({...state, errorMessage: ''})
    }
    case REMOVE_CURRENT_LIST: {
      return ({...state, currentList: null})
    }
    case SET_LOADING: {
      return {...state, loading: action.isLoading}
    }
    case SET_TRANSLATES: {
      return {...state, autoTranslates: [...action.translates]}
    }
    case CLEAR_TRANSLATES: {
      return {...state, autoTranslates: []}
    }
    default: return state
  }
}

// actions
type setListsActionType = {
  type: typeof SET_LIST_ITEMS
  lists: Array<ListType>
}
export const setLists = (lists:Array<ListType>):setListsActionType => ({type: SET_LIST_ITEMS, lists})

type setNewListNameActionType = {
  type: typeof SET_NEW_LIST_NAME
  listId: string
  newName: string
}
export const setNewListName = (listId:string, newName:string):setNewListNameActionType => ({type: SET_NEW_LIST_NAME, listId, newName})

type setErrorActionType = {
  type: typeof SET_ERROR
  errorMessage: string
}
export const setError = (errorMessage:string):setErrorActionType => ({type: SET_ERROR, errorMessage})

type clearErorrActionType = {
  type: typeof CLEAR_ERROR
}
export const clearErorr = ():clearErorrActionType => ({type: CLEAR_ERROR})

type removeListActionType = {
  type: typeof REMOVE_LIST
  listId: string
}
export const removeList = (listId:string):removeListActionType => ({type: REMOVE_LIST, listId})

type createListActionType = {
  type: typeof CREATE_LIST
  newList: ListType
}
export const createList = (newList:ListType):createListActionType => ({type: CREATE_LIST, newList})

type toggleLoadingActionType = {
  type: typeof SET_LOADING
  isLoading: boolean
}
export const toggleLoading = (isLoading:boolean):toggleLoadingActionType => ({type: SET_LOADING, isLoading})

type changeItemDataActionType = {
  type: typeof CHANGE_ITEM_DATA
  listId: string
  itemId: string
  newItem: ItemType
}
export const changeItemData = (listId:string, itemId:string, newItem:ItemType):changeItemDataActionType => ({type: CHANGE_ITEM_DATA, listId, itemId, newItem})

type addUsersListsActionType = {
  type: typeof ADD_USERS_LISTS
  userLists: Array<ListType>
}
export const addUsersLists = (userLists:Array<ListType>):addUsersListsActionType => ({type: ADD_USERS_LISTS, userLists})

type createItemActionType = {
  type: typeof ADD_NEW_ITEM
  newItem: ItemType
  listId: string
}
export const createItem = (newItem:ItemType, listId:string):createItemActionType => ({type: ADD_NEW_ITEM, newItem, listId})

type setAutoTranslatesActionType = {
  type: typeof SET_TRANSLATES
  translates: Array<string>
}
const setAutoTranslates = (translates:Array<string>):setAutoTranslatesActionType => ({type: SET_TRANSLATES, translates})

type clearAutoTranslatesActionType = {
  type: typeof CLEAR_TRANSLATES
}

export const clearAutoTranslates = ():clearAutoTranslatesActionType => ({type: CLEAR_TRANSLATES})

type removeItemActionType = {
  type: typeof REMOVE_ITEM
  listId: string
  itemId: string
}
const removeItem = (listId:string, itemId:string):removeItemActionType => ({type: REMOVE_ITEM, listId, itemId})

const setCurrentList = (list: ListType) => ({type: SET_CURRENT_LIST, list})

const removeCurrentList = () => ({type: REMOVE_CURRENT_LIST})

// thunks
export const getListsThunk = (userId:string) => async (dispatch:any) => {
  dispatch(toggleLoading(true))
  let data = await listsAPI.getLists(userId)
  dispatch(setLists(data.data))
  dispatch(toggleLoading(false))
}

export const createListThunk = (listData:ListType, success:any) => async (dispatch:any) => {
  let res = await listsAPI.createList(listData)
  if (res.success) {
    dispatch(createList(res.doc))
    success()
  } else {
    dispatch(setError(res.errorMessage))
  }
}

export const updateListThunk = (listId:string, newData:ListType, success:any) => async (dispatch:any) => {
  const res = await listsAPI.updateList(listId, newData)
  
  if (res.success) {
    success()
    dispatch(setNewListName(listId, newData.name))
  } else {
    success()
    dispatch(setError(res.errorMessage))
  }
}

export const removeListThunk = (listId:string, success: any) => async (dispatch:any) => {
  let res = await listsAPI.removeList(listId)

  if (res.success) {
    dispatch(removeList(listId))
  } else {
    dispatch(setError(res.errorMessage))
  }
  success()
}

export const removeItemThunk = (listId:string, itemId:string, success:any) => async (dispatch:any) => {
  let res = await itemsAPI.removeItem(itemId)

  if (res.success) {
    success()
    dispatch(removeItem(listId, itemId))
  } else {
    success()
    dispatch(setError(res.errorMessage))
  }

}

export const updateItemThunk = (listId:string, itemId:string, newItem:ItemType, success:any) => async (dispatch:any) => {
  const res = await itemsAPI.updateItem({itemId, newItem})

  if (res.success) {
    success()
    dispatch(changeItemData(listId, itemId, newItem))
  } else {
    success()
    dispatch(setError(res.errorMessage))
  }
}

export const createItemThunk = (item:ItemType, listId:string, success:any) => async (dispatch:any) => {
  let res = await itemsAPI.createItem({listId, item})
  if (res.success) {
    dispatch(createItem(res.doc, listId))
    dispatch(clearAutoTranslates())
    success()
  } else {
    dispatch(setError(res.errorMessage))
  }
}

export const getAutoTranslatesThunk = (phrase:string, translatesLanguage:string, success?:any) => async (dispatch:any) => {
  const data = await itemsAPI.getAutoTranslate(phrase, translatesLanguage)
  if (data.success) {
    dispatch(setAutoTranslates([data.translate]))    
  }
}

export const duplicateList = (data:{userId: string, listForDuplicate: string}, success: any) => async (dispatch: any) => {
  let res = await listsAPI.duplicateListToOwns(data)
  if (res.success) {
    dispatch(createList(res.doc))
  }
  success()
}

export const getList = (listId: string) => async (dispatch: any) => {
  dispatch(removeCurrentList())
  const res = await listsAPI.getList(listId)
  if (!res.isExist) {
    dispatch(setError('list doesn`t exist or you don`t have permissions to view it'))
  }
  dispatch(setCurrentList(res.list))
}

export default listsReducer