import { SET_HELP } from "./helpReducerTypes"
import { REMOVE_ITEM } from "../lists/listsReducerTypes"

export type HelpItemType = {
  _id?: string
  title: string
  content: string
}

export type HelpStateType = {
  items: Array<HelpItemType>
}

const helpState:HelpStateType = {
  items: [
    {
      _id: '1',
      title: 'title',
      content: 'content'
    },
    {
      _id: '2',
      title: 'title2',
      content: 'content2'
    },
  ]
}

const helpReducer = (state = helpState, action: any) => {
  switch (action.type) {
    case SET_HELP: {
      return {...state, item: action.helpItems}
    }
    case REMOVE_ITEM: {
      let newState = {...state}
      newState.items = state.items.filter(item => item._id !== action.itemId)
      return newState
    }
    default: return state
  }
}

export const removeHelpItem = (itemId: string) => ({type: REMOVE_ITEM, itemId})

export default helpReducer