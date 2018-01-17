import request from '../../helpers/request'

import { actions as dataActions } from './data'

export const types = {
  PAGE_ERROR: 'ui/pageError',
  LOADING: 'ui/loading',
  ERROR: 'ui/error',
  HYDRATED: 'ui/hydrated'
}

export default function (state = {}, action = {}) {
  switch (action.type) {
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
    case types.PAGE_ERROR:
      return {
        ...state,
        pageError: true
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
  pageError: function () {
    return {
      type: types.PAGE_ERROR
    }
  },
  loadData: function () {
    return function (dispatch, getState) {
      const state = getState()
      dispatch(actions.loading(true))
      return request(state.ui.apiUrl, 'get')
        .then(function (response) {
          dispatch(actions.loading(false))
          dispatch(dataActions.setData(response.data || {}))
          dispatch(actions.hydrated())
        })
        .catch(function () {
          dispatch(actions.loading(false))
          dispatch(actions.pageError())
        })
    }
  }
}
export function mapToProps (state) {
  return state.ui
}
