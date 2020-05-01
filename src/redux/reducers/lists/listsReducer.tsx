import { SET_LIST_ITEMS, SET_NEW_LIST_NAME, REMOVE_LIST, CREATE_LIST, ADD_NEW_ITEM, CHANGE_ITEM_DATA, REMOVE_ITEM, SET_ERROR, CLEAR_ERROR, SET_LOADING, SET_TRANSLATES, CLEAR_TRANSLATES, ADD_USERS_LISTS } from './listsReducerTypes'
import { listsAPI, itemsAPI } from '../../../API/Api'
import { ListType, ItemType } from '../main/mainReducer'

export type TranslateType = {
  id: number
  is_user?: null
  pic_url: string
  translate_value: string
  ut?: null
  value: string
  votes: number
  vt: number
}

type ListsStateType = {
  lists: Array<ListType>
  isLoading: boolean
  errorMessage: string
  autoTranslates: Array<TranslateType>
}

const listsState:ListsStateType = {
  lists: [
    // temp data for offline dev
    // {
    //   _id: '1',
    //   name: "test",
    //   authorId: '1',
    //   items: [
    //     {
    //       _id: '1',
    //       word: 'word1',
    //       translate: "translate1"
    //     },
    //     {
    //       _id: '2',
    //       word: 'word2',
    //       translate: "translate2"
    //     },
    //     {
    //       _id: '3',
    //       word: 'word3',
    //       translate: "translate3"
    //     },
    //   ]
    // },
    // {
    //   _id: '2',
    //   name: "test2",
    //   authorId: '1',
    //   items: [
    //     {
    //       _id: '1',
    //       word: '12',
    //       translate: "212"
    //     },
    //     {
    //       _id: '2',
    //       word: '31',
    //       translate: "213"
    //     }
    //   ]
    // }
  ],
  isLoading: false,
  errorMessage: '',
  autoTranslates: []
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
      let newState = {...state}
      for(let i = 0; i < newState.lists.length; i++) {
        if (newState.lists[i]._id === action.listId) {
          newState.lists[i].items.push(action.newItem)
        }
      }
      return {...newState}
    }
    case CHANGE_ITEM_DATA: {
      let newState = {...state}
      for(let i = 0; i < newState.lists.length; i++) {
        if (newState.lists[i]._id === action.listId) {
          for(let w = 0; w < newState.lists[i].items.length; w++) {
            if (newState.lists[i].items[w]._id === action.itemId) {
              newState.lists[i].items[w] = action.newItem
              break
            }
          }
          break
        }
      }
      return {...newState}
    }
    case REMOVE_ITEM: {
      let newState = {...state}
      for(let i = 0; i < newState.lists.length; i++) {
        if (newState.lists[i]._id === action.listId) {
          const newItems = newState.lists[i].items.filter(item => item._id !== action.itemId)
          newState.lists[i].items = newItems
        }
      }
      return {...newState}
    }
    case SET_ERROR: {
      return ({...state, errorMessage: action.errorMessage})
    }
    case CLEAR_ERROR: {
      return ({...state, errorMessage: ''})
    }
    
    case SET_LOADING: {
      return {...state, loading: action.isLoading}
    }
    case SET_TRANSLATES: {
      return {...state, autoTranslates: action.translates}
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
const clearAutoTranslates = ():clearAutoTranslatesActionType => ({type: CLEAR_TRANSLATES})

type removeItemActionType = {
  type: typeof REMOVE_ITEM
  listId: string
  itemId: string
}
const removeItem = (listId:string, itemId:string):removeItemActionType => ({type: REMOVE_ITEM, listId, itemId})

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
  let res = await listsAPI.updateList(listId, newData)
  if (res.success) {
    success()
    dispatch(setNewListName(listId, newData.name))
  } else {
    success()
    dispatch(setError(res.errorMessage))
  }
}

export const removeListThunk = (listId:string) => async (dispatch:any) => {
  let res = await listsAPI.removeList(listId)

  if (res.success) {
    dispatch(removeList(listId))
  } else {
    dispatch(setError(res.errorMessage))
  }
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
  let res = await itemsAPI.updateItem({itemId, newItem})

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

export const getAutoTranslatesThunk = (phrase:string, success:any) => async (dispatch:any) => {
  let data = await itemsAPI.getAutoTranslate(phrase)
  dispatch(setAutoTranslates(data.translate))
  success(data.sound_url)
}

export const getAudioUrl = (phrase:string) => async () => {
  let data = await itemsAPI.getAutoTranslate(phrase)
  return data.sound_url
}

export default listsReducer