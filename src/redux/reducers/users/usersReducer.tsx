import { userAPI, listsAPI } from '../../../API/Api'
import { ADD_LIST_TO_PROFILE, RESET_PASSWORD, CLEAR_ERROR, SET_ERROR, REMOVE_ADDED_LIST, SET_USER, ADD_COMPLETED_TEST_TO_PROFILE, CHANGE_THEME, ACCESS_TOKEN, REFRESH_TOKEN, LOGOUT, CHANGE_LANGUAGE, CHANGE_TRANSLATES_LANGUAGE } from './usersReducerTypes'
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
  username: string
  email: string
  isEmailConfirmed: boolean
  theme: string
  role: string
  registerDate: string
  addedLists: Array<ListType>
  tests: Array<UserQuestionType>
  language: string
  defaultTranslatesLanguage: string

  accessToken: string
  refreshToken: string
  
  // userId: string
  // pictureUrl: string
  // password?: string
}

const userState:UserStateType = {
  _id: '',
  username: '',
  addedLists: [],
  tests: [],
  email: '',
  role: 'user',
  theme: '',
  isEmailConfirmed: false,
  registerDate: '',
  language: '',
  defaultTranslatesLanguage: '',
  accessToken: '',
  refreshToken: ''
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
    case ADD_COMPLETED_TEST_TO_PROFILE: {
      let newState = {...state}
      newState.tests.push(action.test)
      return newState
    }
    case CHANGE_THEME: {
      return {...state, theme: action.theme}
    }
    case CHANGE_LANGUAGE: {
      return {...state, language: action.language}
    }
    case CHANGE_TRANSLATES_LANGUAGE: {
      return {...state, defaultTranslatesLanguage: action.language}
    }
    case RESET_PASSWORD: {
      return {...state, password: action.newPass}
    }
    case LOGOUT: {
      return {}
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

type ChangeThemeActionType = {
  type: typeof CHANGE_THEME
  theme: string
}

const changeTheme = (theme: string):ChangeThemeActionType => ({type: CHANGE_THEME, theme})

type changeLanguageActionType = {
  type: typeof CHANGE_LANGUAGE
  language: string
}

const changeLanguage = (language: string):changeLanguageActionType => ({type: CHANGE_LANGUAGE, language})

type changeDefaultTranslatesLanguageActionType = {
  type: typeof CHANGE_TRANSLATES_LANGUAGE
  language: string
}

const changeDefaultTranslatesLanguage = (language: string):changeDefaultTranslatesLanguageActionType => ({type: CHANGE_TRANSLATES_LANGUAGE, language})

type resetPassword = {
  type: typeof RESET_PASSWORD
  newPass: string
}

const resetPassword = (newPass: string):resetPassword => ({type: RESET_PASSWORD, newPass})

type setAccessToken = {
  type: typeof ACCESS_TOKEN
  accessToken: string
}

const setAccessToken = (accessToken: string):setAccessToken => ({type: ACCESS_TOKEN, accessToken})

type setRefreshToken = {
  type: typeof REFRESH_TOKEN
  refreshToken: string
}

const setRefreshToken = (refreshToken: string):setRefreshToken => ({type: REFRESH_TOKEN, refreshToken})

type Logout = {
  type: typeof LOGOUT
}

const logout = ():Logout => ({type: LOGOUT})

export const loginThunk = (username: string, password: string, success: any) => async (dispatch:any) => {
  let data: any = await userAPI.login(username, password)

  if(data.success) {
    dispatch(setAccessToken(data.accessToken))
    dispatch(setRefreshToken(data.refreshToken))
    localStorage.setItem('refresh-token', data.refreshToken)
    dispatch(setUser(data.user))
    success('')
  } else {
    success(data.msg)
  }
}

export const registerThunk = (username: string, password: string, success: any) => async (dispatch:any) => {
  let data: any = await userAPI.register(username, password)

  if(data.success) {
    dispatch(setUser(data.user))
    success('Registered success')
  } else {
    success(data.msg)
  }
}

export const getNewToken = (refreshToken: string, success: any) => async (dispatch: any) => {
  let data: any = await userAPI.getNewToken(refreshToken)
  
  if (data.success) {
    dispatch(setAccessToken(data.accessToken))
    dispatch(setUser(data.user))
  } else {
    localStorage.removeItem('refresh-token')
    dispatch(logout())
  }
  success()
}

export const logoutThunk = (refreshToken: string) => async (dispatch:any) => {
  console.log(refreshToken)
  let data: any = await userAPI.logout(refreshToken)

  if(data.success) {
    localStorage.removeItem('refresh-token')
    dispatch(logout())
  }

}

export const requestPasswordResetThunk = (email: string, success: any) => async (dispatch:any) => {
  let data: any = await userAPI.requestPasswordReset(email)

  if (data.success) {
    success({success: true, msg: 'Email was sent'})
  } else {
    success(data.msg)
  }

}

export const resetPasswordThunk = (email: string) => async (dispatch: any) => {
  let data: any = await userAPI.resetPassword(email)

  if(data.success) {
    dispatch(resetPassword(data.newPass))
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

  if (data.success) {
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

        if (data.success) {
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

export const removeAddedListThunk = (userId:string, listId:string, success: any) => async (dispatch: any) => {
  dispatch(clearErorr())
  let data = await userAPI.removeAddedList({userId, listId})
  if (data.success) {
    dispatch(removeAddedList(listId))
  } else {
    dispatch(setError('Something went wrong'))
  }
  success()
}

export const changeThemeThunk = (userId: string, theme: string) => async (dispatch: any) => {
  dispatch(clearErorr())

  let data = await userAPI.changeTheme(userId, theme)

  if (data.success) {
    dispatch(changeTheme(theme))
  } else {
    dispatch(setError('Something went wrong'))
  }
}

export const changeLanguageThunk = (userId: string, language: string, success: any) => async (dispatch: any) => {
  dispatch(clearErorr())

  let data = await userAPI.changeLanguage(userId, language)

  if (data.success) {
    dispatch(changeLanguage(language))
    success()
  } else {
    dispatch(setError('Something went wrong'))
  }
}

export const changeDefaultTranslatesLanguageThunk = (userId: string, language: string, success: any) => async (dispatch: any) => {
  dispatch(clearErorr())

  let data = await userAPI.changeDefaultTranslatesLanguage(userId, language)

  if (data.success) {
    dispatch(changeDefaultTranslatesLanguage(language))
    success()
  } else {
    dispatch(setError('Something went wrong'))
  }
}

export default userReducer