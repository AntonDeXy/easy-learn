import { createStore, applyMiddleware, combineReducers } from "redux"
import thunkMiddleware from 'redux-thunk'
import listsReducer from "./reducers/lists/listsReducer"
import userReducer from './reducers/users/usersReducer'
import mainReducer from './reducers/main/mainReducer'
import modalReducer from './reducers/modal/modalReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({listsReducer, mainReducer, userReducer, modalReducer})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducer, middleware) 

export default store