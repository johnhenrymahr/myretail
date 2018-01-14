import { bindActionCreators } from 'redux'
import { actions as uiActions } from './modules/ui'
import { actions as dataActions } from './modules/data'

export default function (dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActions, dispatch),
      data: bindActionCreators(dataActions, dispatch)
    }
  }
}
