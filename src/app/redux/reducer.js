import { combineReducers } from 'redux'
import postReducer from 'app/redux/modules/post/postReducer'

export default combineReducers({
  post: postReducer
})
