import { userAPI, listsAPI } from '../../../API/Api'
import { ADD_LIST_TO_PROFILE, CLEAR_ERROR, SET_ERROR, REMOVE_ADDED_LIST, SET_USER, ADD_COMPLETED_TEST_TO_PROFILE } from './usersReducerTypes'
import { ListType } from '../main/mainReducer'

export type UserQuestionType = {
  _id?: string
  userId?: string
  type: string
  questionsCount: number
  listName: string
  rightAnswersCount: Number
  date?: string
  items: Array<{
    _id?: string
    value1: string
    rightAnswer: string
    usersAnswer: string
    variants: Array<{
      _id?: string
      value: string
      key: number
    }>
  }>
}

export type TestType = {
  _id: string
  userId: string
  questions: Array<UserQuestionType>
}

export type UserStateType = {
  _id: string
  userId: string
  addedLists: Array<ListType>
  tests: Array<UserQuestionType>
  email: string
  pictureUrl: string
}

const userState:UserStateType = {
  _id: '',
  userId: '',
  addedLists: [],
  tests: [],
  email: '',
  pictureUrl: '',
}

const userReducer = (state = userState, action:any) => {
  switch (action.type) {
    case SET_USER: {
      return ({...state, ...action.user, pictureUrl :action.userImg})
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
    case ADD_COMPLETED_TEST_TO_PROFILE: {
      let newState = {...state}
      newState.tests.push(action.test)
      return newState
    }
    default: return state
  }
}

type AddCompletedTestType = {
  type: typeof ADD_COMPLETED_TEST_TO_PROFILE
  test: UserQuestionType
}

export const addCompletedTest = (test:UserQuestionType):AddCompletedTestType => ({type: ADD_COMPLETED_TEST_TO_PROFILE, test})

type SetUserActionType = {
  type: typeof SET_USER
  user: UserStateType
  userImg: string
}
const setUser = (user:UserStateType, userImg:string):SetUserActionType => ({type: SET_USER, user, userImg})

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

export const setUserThunk = (userId:string, email:string, userImg:string) => async (dispatch:any) => {
  let data:any = await userAPI.getUser(userId)
  if (data.success) {
    if (data.user) {
      dispatch(setUser(data.user, userImg))
    } else {
      let data = await userAPI.createNewUser(userId, email)
      if (data.success) dispatch(setUser(data.user, userImg))
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
  }
}

export default userReducer