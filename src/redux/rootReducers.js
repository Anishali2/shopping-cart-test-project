import { combineReducers } from 'redux'

import  userReducer from './reducers/userReducer'
import  appReducer from './reducers/appReducer'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  user: userReducer,
  app: appReducer
})

export default rootReducer
