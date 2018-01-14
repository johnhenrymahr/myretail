import { combineReducers } from 'redux'
import { default as uiReducer } from './modules/ui'
import { default as dataReducer } from './modules/data'

export default combineReducers({
  ui: uiReducer,
  data: dataReducer
})
