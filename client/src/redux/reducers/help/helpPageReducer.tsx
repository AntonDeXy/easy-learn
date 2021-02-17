import { UPDATE_HELP_PAGE_ITEM, ADD_HELP_PAGE_ITEM, REMOVE_HELP_PAGE_ITEM, SET_HELP_PAGE_ITEMS, SET_LOADING_TRUE, SET_LOADING_FALSE } from "./helpPageReducerTypes"
import { helpPageApi } from "../../../API/Api"

export type HelpItemType = {
  _id?: string
  title: string
  content: string
  authorId: string
}

export type HelpStateType = {
  items: Array<HelpItemType>
  isLoading: boolean
}

const helpState:HelpStateType = {
  items: [],
  isLoading: false
}

const helpReducer = (state = helpState, action: any) => {
  switch (action.type) {
    case SET_HELP_PAGE_ITEMS: {
      return {...state, items: action.items}
    }
    case ADD_HELP_PAGE_ITEM : {
      let newState = {...state}
      newState.items.push(action.newItem)
      return newState
    }
    case REMOVE_HELP_PAGE_ITEM: {
      let newState = {...state}
      newState.items = state.items.filter(item => item._id !== action.itemId)
      return newState
    }
    case UPDATE_HELP_PAGE_ITEM: {
      let newState = {...state}
      const newItems = state.items.map(item => {
        if (item._id === action.itemId) {
          return action.newData
        }
        return item
      })
      return {...newState, items: newItems}
    }
    case SET_LOADING_TRUE: {
      return {...state, isLoading: true}
    }
    case SET_LOADING_FALSE: {
      return {...state, isLoading: false}
    }
    default: return state
  }
}
type RemoveHelpPageItemType = {
  type: typeof REMOVE_HELP_PAGE_ITEM
  itemId: string
}

type addNewHelpPageItemType = {
  type: typeof ADD_HELP_PAGE_ITEM
  newItem: HelpItemType
}

type setHelpPageItemsType = {
  type: typeof SET_HELP_PAGE_ITEMS
  items: Array<HelpItemType>
}

type updateHelpPageItemType = {
  type: typeof UPDATE_HELP_PAGE_ITEM
  itemId: string
  newData: HelpItemType
}

type setLoadingTrueType = {
  type: typeof SET_LOADING_TRUE
}

type setLoadingFalseType = {
  type: typeof SET_LOADING_FALSE
}

const setLoadingTrue = ():setLoadingTrueType => ({type: SET_LOADING_TRUE})
const setLoadingFalse = ():setLoadingFalseType => ({type: SET_LOADING_FALSE})
const removeHelpPageItem = (itemId: string):RemoveHelpPageItemType => ({type: REMOVE_HELP_PAGE_ITEM, itemId})
const addNewHelpPageItem = (newItem:HelpItemType):addNewHelpPageItemType => ({type: ADD_HELP_PAGE_ITEM, newItem})
const setHelpPageItems = (items: Array<HelpItemType>):setHelpPageItemsType => ({type: SET_HELP_PAGE_ITEMS, items})
const updateHelpPageItem = (itemId: string, newData:HelpItemType):updateHelpPageItemType => ({type: UPDATE_HELP_PAGE_ITEM, itemId, newData})

export const getHelpPageItemsThunk = () => async (dispatch: any) => {
  dispatch(setLoadingTrue())
  let data = await helpPageApi.getHelpPageItems()

  if (data.success) {
    dispatch(setHelpPageItems(data.data))
    dispatch(setLoadingFalse())
  }
}

export const removePageItemThunk = (itemId: string) => async (dispatch: any) => {
  let data = await helpPageApi.removeHelpPageItem(itemId)

  if (data.success) {
    dispatch(removeHelpPageItem(itemId))
  }
}

export const createNewHelpPageItemThunk = (newItem: HelpItemType, success: any) => async (dispatch:any) => {
  let data = await helpPageApi.createHelpPageItem(newItem)

  if (data.success) {
    dispatch(addNewHelpPageItem(data.doc))
  }
  success()
}

export const updateHelpPageItemThunk = (itemId: string, newItem: HelpItemType, success: any) =>async (dispatch:any) => {
  dispatch(setLoadingTrue())
  let data = await helpPageApi.editHelpPageItem(itemId, newItem)

  if (data.success) {
    dispatch(updateHelpPageItem(itemId, newItem))
    dispatch(setLoadingFalse())
  }
  success()
}

export default helpReducer