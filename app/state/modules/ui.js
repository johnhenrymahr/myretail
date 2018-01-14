import axios from 'axios'

export const types = {
  LOADING: 'ui/loading',
  ERROR: 'ui/error'
}

export default function (state = {}, action = {}) {
  switch(action.type) {
    case types.LOADING: 
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

export const actions = {
  loading: function (loading) {
    return {
      type: types.LOADING,
      payload: loading
    }
  },
  loadData: function () {
    return function (dispatch, getState) {
      const state = getState()
      dispatch(actions.loading(true))
      return axios.get(state.ui.apiUrl)
      .then(function (data) {
        dispatch(actions.loading(false))
        console.log('data', data)
      })
      .catch(function (error) {

      })
    }
  }
}
export function mapToProps (state) {
  return state.ui
}