import { SET_LIST_ITEMS, SET_NEW_LIST_NAME, REMOVE_LIST, CREATE_LIST, ADD_NEW_ITEM, CHANGE_ITEM_DATA, REMOVE_ITEM, SET_ERROR, CLEAR_ERROR, SET_CURRENT_LIST, SET_LOADING } from './listsReducerTypes';
import { listsAPI, itemsAPI } from '../../../API/Api';

const listsState = {
  lists: [
    {
      _id: 1,
      name: 'title',
      items: [
        {
          _id: 1,
          word: 'word',
          translate: 'translate'
        },
        {
          _id: 2,
          word: 'word2',
          translate: 'translate2'
        }
      ]
    }
  ],
  isLoading: false,
  // currentList: {},
  errorMessage: '',
  autoTranslates: []
}

const listsReducer = (state = listsState, action) => {
  switch (action.type) {
    case SET_LIST_ITEMS: {
      return {...state, lists: action.lists}
    }
    case SET_NEW_LIST_NAME: {
      let newState = {...state}
      newState.lists.forEach(list => {
        if (list._id === action.data.listId) {
          list.name = action.data.newName
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
          for(let w = 0; w < newState.lists[w].items.length; w++) {
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
          newState.lists[i].items.filter(item => item._id !== action.itemId)
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
    case 'SET_TRANSLATES': {
      return {...state, autoTranslates: action.translates}
    }
    case 'CLEAR_TRANSLATES': {
      return {...state, autoTranslates: []}
    }
    // case 'ADD_USERS_LISTS': {
    //   return {...state, lists: [...state.lists, ...action.userLists]}
    // }
    default: return state
  }
}

// actions
export const setLists = (lists) => ({type: SET_LIST_ITEMS, lists})
export const setNewListName = (listId, newName) => ({type: SET_NEW_LIST_NAME, data: {listId, newName}})
export const setError = (errorMessage) => ({type: SET_ERROR, errorMessage})
export const clearErorr = () => ({type: CLEAR_ERROR})
export const removeList = (listId) => ({type: REMOVE_LIST, listId})
export const createList = (newList) => ({type: CREATE_LIST, newList})
export const toggleLoading = (isLoading) => ({type: SET_LOADING, isLoading})
export const changeItemData = (listId, itemId, newItem) => ({type: CHANGE_ITEM_DATA, listId, itemId, newItem})
export const addUsersLists = (userLists) => ({type: 'ADD_USERS_LISTS', userLists})
export const createItem = (newItem, listId) => ({type: ADD_NEW_ITEM, newItem, listId})
const setAutoTranslates = (translates) => ({type: 'SET_TRANSLATES', translates})
const clearAutoTranslates = () => ({type: 'CLEAR_TRANSLATES'})
// thunks
export const getListsThunk = (userId) => async (dispatch) => {
  dispatch(toggleLoading(true))
  let data = await listsAPI.getLists(userId)
  dispatch(setLists(data.data))
  dispatch(toggleLoading(false))
}

export const createListThunk = (listData, success) => async (dispatch) => {
  let res = await listsAPI.createList(listData)
  if (res.success) {
    dispatch(createList(res.doc))
    success()
  } else {
    dispatch(setError(res.errorMessage))
  }
}

export const updateListThunk = (listId, newData, success) => async (dispatch) => {
  // success()
  //   dispatch(setNewListName(listId, newData.name))
  let res = await listsAPI.updateList(listId, newData)
  if (res.success) {
    success()
    dispatch(setNewListName(listId, newData.name))
  } else {
    success()
    dispatch(setError(res.errorMessage))
  }
}

export const removeListThunk = (listId) => async (dispatch) => {
  let res = await listsAPI.removeList(listId)
  if (res.success) {
    dispatch(removeList(listId))
  } else {
    dispatch(setError(res.errorMessage))
  }
}

export const updateItemThunk = (listId, itemId, newItem, success) => async (dispatch) => {
  let res = await itemsAPI.updateItem({listId, itemId, newItem})
  // success()
  // dispatch(changeItemData(listId, itemId, newItem))

  if (res.success) {
    success()
    dispatch(changeItemData(listId, itemId, newItem))
  } else {
    success()
    dispatch(setError(res.errorMessage))
  }
}

export const createItemThunk = (item, listId, success) => async (dispatch) => {
  let res = await itemsAPI.createItem(listId, item.translate, item.word)
  if (res.data.success) {
    dispatch(createItem(res.data.doc, listId))
    dispatch(clearAutoTranslates())
    success()
  } else {
    dispatch(setError(res.errorMessage))
  }
}

export const getAutoTranslatesThunk = (phrase, success) => async (dispatch) => {
  let data = await itemsAPI.getAutoTranslate(phrase)
  dispatch(setAutoTranslates(data))
  success()
}

export default listsReducer