import { mapToProps as uiProps } from './modules/ui'
import { mapToProps as dataProps } from './modules/data'

export default function (state) {
  return {
    ui: uiProps(state),
    orders: dataProps(state)
  }
}
