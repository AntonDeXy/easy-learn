import { userAPI, listsAPI } from '../../../API/Api'
import { ADD_LIST_TO_PROFILE, CLEAR_ERROR, SET_ERROR, REMOVE_ADDED_LIST, SET_USER } from './usersReducerTypes'
import { ListType } from '../main/mainReducer'

export type UserStateType = {
  _id: string
  userId: string
  addedLists: Array<ListType>
}

const userState:UserStateType = {
  _id: '',
  userId: '',
  addedLists: []
}

const userReducer = (state = userState, action:any) => {
  switch (action.type) {
    case SET_USER: {
      return ({...state, ...action.user})
    }
    case REMOVE_ADDED_LIST : {
      let addedLists = state.addedLists.filter(list => list._id !== action.listId)
      return {...state, addedLists}
    }
    case SET_ERROR: {
      return ({...state, errorMessage: action.errorMessage})
    }
    case CLEAR_ERROR: {
      return ({...state, errorMessage: ''})
    }
    case ADD_LIST_TO_PROFILE: {
      let newState = {...state}
      newState.addedLists.push(action.list)

      return newState
    }
    default: return state
  }
}

type SetUserActionType = {
  type: typeof SET_USER
  user: UserStateType
}
const setUser = (user:UserStateType):SetUserActionType => ({type: SET_USER, user})

type ClearErorrActionType = {
  type: typeof CLEAR_ERROR
}
const clearErorr = ():ClearErorrActionType => ({type: CLEAR_ERROR})

type SetErrorActionType = {
  type: typeof SET_ERROR
  errorMessage: string
}
const setError = (errorMessage:string):SetErrorActionType => ({type: SET_ERROR, errorMessage})

type RemoveAddedListActionType = {
  type: typeof REMOVE_ADDED_LIST
  listId: string
}
const removeAddedList = (listId:string):RemoveAddedListActionType => ({type: REMOVE_ADDED_LIST, listId}) 

type AddListToProfileActionType = {
  type: typeof ADD_LIST_TO_PROFILE
  list: ListType
}
const addListToProfile = (list:ListType):AddListToProfileActionType => ({type: ADD_LIST_TO_PROFILE, list}) 

export const setUserThunk = (userId:string) => async (dispatch:any) => {
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

export const listCheckerThunk = (listId:string, userId:string, success:any) => async () => {
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

export const addListWithoutCheckThunk = (list:ListType, userId:string, success:any) => async (dispatch:any) => {
  if (!list._id) {
    return success({error: 'Something went wrong! Try again!'})
  }
  let data = await userAPI.addListToProfile({userId, listId: list._id})

  if (data.data.success) {
    dispatch(addListToProfile(list))
    success({})
  } else {
    success({error: 'Something went wrong! Try again!'})
  }
}

export const addListToProfileThunk = (listId:string, userId:string, success:any) => async (dispatch:any) => {
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

export const removeAddedListThunk = (userId:string, listId:string) => async (dispatch:any) => {
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