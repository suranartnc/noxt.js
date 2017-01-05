import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import customReducers from 'app/reducers'

export default combineReducers({
  routing: routerReducer,
  ...customReducers
})
