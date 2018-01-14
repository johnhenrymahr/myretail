import axios from 'axios'

import { actions as dataActions } from './data'

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
      .then(function (response) {
        console.log('action', dataActions.setData(response.data || {}))
        dispatch(actions.loading(false))
        dispatch(dataActions.setData(response.data || {}))
      })
      .catch(function (error) {

      })
    }
  }
}
export function mapToProps (state) {
  return state.ui
}