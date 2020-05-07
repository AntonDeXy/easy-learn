import { SET_HELP, REMOVE_ITEM, ADD_ITEM } from "./helpReducerTypes"

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
    case ADD_ITEM : {
      let newState = {...state}
      newState.items.push(action.newItem)
      return newState
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
export const addNewItem = (newItem:HelpItemType) => ({type: ADD_ITEM, newItem})

export default helpReducer