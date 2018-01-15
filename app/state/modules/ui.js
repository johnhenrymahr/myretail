import axios from 'axios'

import { actions as dataActions } from './data'

export const types = {
  LOADING: 'ui/loading',
  ERROR: 'ui/error',
  HYDRATED: 'ui/hydrated'
}

export default function (state = {}, action = {}) {
  switch(action.type) {
    case types.LOADING: 
      return {
        ...state,
        loading: action.payload
      }
    case types.HYDRATED:
      return {
        ...state,
        hydrated: true
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
  hydrated: function () {
    return {
      type: types.HYDRATED
    }
  },
  loadData: function () {
    return function (dispatch, getState) {
      const state = getState()
      dispatch(actions.loading(true))
      return axios.get(state.ui.apiUrl)
      .then(function (response) {
        dispatch(actions.loading(false))        
        dispatch(dataActions.setData(response.data || {}))
        dispatch(actions.hydrated())
      })
      .catch(function (error) {

      })
    }
  }
}
export function mapToProps (state) {
  return state.ui
}