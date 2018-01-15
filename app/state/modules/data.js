import dataMapper from '../dataMapper'

export const types = {
  SET: 'data/set'
}

export default function (state = {}, action = {}) {
  switch (action.type) {
    case types.SET:
      return action.payload
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
  }
}

export function mapToProps (state) {
  return state.data
}
