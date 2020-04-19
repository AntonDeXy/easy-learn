import { userAPI, listsAPI } from '../../../API/Api'

const userState = {
  _id: null,
  addedLists: []
}

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return ({...state, ...action.user})
    }
    case 'REMOVE_ADDED_LIST' : {
      let addedLists = state.addedLists.filter(list => list._id !== action.listId)
      return {...state, addedLists}
    }
    case 'SET_ERROR': {
      return ({...state, errorMessage: action.errorMessage})
    }
    case 'CLEAR_ERROR': {
      return ({...state, errorMessage: ''})
    }
    case 'ADD_LIST_TO_PROFILE': {
      let newState = {...state}
      newState.addedLists.push(action.list)

      return newState
    }
    default: return state
  }
}

const setUser = (user) => ({type:'SET_USER', user})
const clearErorr = () => ({type: 'CLEAR_ERROR'})
const setError = (errorMessage) => ({type: 'SET_ERROR', errorMessage})
const removeAddedList = (listId) => ({type: 'REMOVE_ADDED_LIST', listId}) 
const addListToProfile = (list) => ({type: 'ADD_LIST_TO_PROFILE', list}) 

export const setUserThunk = (userId) => async (dispatch) => {
  let data = await userAPI.getUser(userId)
  if (data.success) {
    if (data.user) {
      dispatch(setUser(data.user))
    } else {
      let data = await userAPI.createNewUser(userId)
      if (data.success) dispatch(setUser(data.user))
    }
  }
} 

export const listCheckerThunk = (listId, userId, success) => async (dispatch) => {
  let listData = await listsAPI.isListExist(listId)

  if (listData.isExist) {
    let data = await listsAPI.isUserHaveList({userId, listId})

    if (!data.isUserHave) {

      let data = await listsAPI.isUserListOwner({userId, listId})
      if (!data.isUserOwner) {
        success({data: listData.list[0]})
      } else {
        success({error: 'You cant add your list'})
      }
    } else {
      success({error: 'You already have this list'})
    }
  } else {
    success({error: 'This list doesnt exist'})
  }
}

export const addListWithoutCheckThunk = (list, userId, success) => async (dispatch) => {
  let data = await userAPI.addListToProfile({userId, listId: list._id})

  if (data.data.success) {
    dispatch(addListToProfile(list))
    success({})
  } else {
    success({error: 'Something went wrong! Try again!'})
  }
}

export const addListToProfileThunk = (listId, userId, success) => async (dispatch) => {
  let listData = await listsAPI.isListExist(listId)

  if (listData.isExist) {
    let data = await listsAPI.isUserHaveList({userId, listId})

    if (!data.isUserHave) {

      let data = await listsAPI.isUserListOwner({userId, listId})
      if (!data.isUserOwner) {

        let data = await userAPI.addListToProfile({userId, listId})

        if (data.data.success) {
          dispatch(addListToProfile(listData.list[0]))
          success({})
        } else {
          success({error: 'Something went wrong! Try again!'})
        }
      } else {
        success({error: 'You cant add your list'})
      }
    } else {
      success({error: 'You already have this list'})
    }
  } else {
    success({error: 'This list doesnt exist'})
  }
}

export const removeAddedListThunk = (userId, listId) => async (dispatch) => {
  dispatch(clearErorr())
  let data = await userAPI.removeAddedList({userId, listId})
  if (data.data.success) {
    dispatch(removeAddedList(listId))
  } else {
    dispatch(setError('Something went wrong'))
    // dispatch(setError(data.errorMessage))
  }
}

export default userReducer