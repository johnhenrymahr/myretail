import dataMapper from '../dataMapper'

export const types = {
  SET: 'data/set',
  INC: 'data/increment',
  DEC: 'data/decrement'
}

export default function (state = {}, action = {}) {
  switch (action.type) {
    case types.SET:
      return action.payload
    case types.INC:
      return {
        ...state,
        skuDetails: {
          ...state.skuDetails,
          quantity: state.skuDetails.quantity + 1
        }
      }
    case types.DEC:
      return {
        ...state,
        skuDetails: {
          ...state.skuDetails,
          quantity: (state.skuDetails.quantity) ? state.skuDetails.quantity - 1 : state.skuDetails.quantity
        }
      }
    default:
      return state
  }
}

export const actions = {
  setData: function (data) {
    return {
      type: types.SET,
      payload: dataMapper(data)
    }
  },
  incQuantity: function () {
    return {
      type: types.INC
    }
  },
  decQuantity: function () {
    return {
      type: types.DEC
    }
  }
}

export function mapToProps (state) {
  return state.data
}
