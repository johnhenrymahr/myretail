import reducer, { actions, types, mapToProps } from './ui'
import { types as dataTypes } from './data'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import dataMapper from '../dataMapper'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

jest.mock('../../helpers/request', () => {
  return jest.fn(function (url, method, data, params) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        switch (url) {
          case 'path/to/good':
            resolve({
              data: {
                foo: 'bar',
                thedata: 'thetime'
              }
            })
            break
          default:
            reject(new Error())
            break
        }
      })
    })
  })
})
describe('UI state module spec', () => {
  context('reducers', () => {
    it('returns empty on init', () => {
      expect(reducer()).toEqual({})
    })
    it('returns state if no action type provided', () => {
      expect(reducer({foo: 'bar'}, {})).toEqual({foo: 'bar'})
    })
    it('sets the loading prop', () => {
      expect(reducer({foo: 'bar', loading: false}, { type: types.LOADING, payload: true }))
        .toEqual({foo: 'bar', loading: true})
    })
    it('sets the hydrated prop', () => {
      expect(reducer({hydrated: false, foo: 'bar'}, { type: types.HYDRATED }))
        .toEqual({foo: 'bar', hydrated: true})
    })
  })
  context('action creators', () => {
    it('creats a loading action', () => {
      expect(actions.loading(true))
        .toEqual({
          type: types.LOADING,
          payload: true
        })
    })
    it('creates hydrated action', () => {
      expect(actions.hydrated())
        .toEqual({
          type: types.HYDRATED
        })
    })
  })
  context('thunk creators', () => {
    it('calls correct actions for successfull request', () => {
      const store = mockStore({
        ui: {
          apiUrl: 'path/to/good'
        }
      })
      return store.dispatch(actions.loadData())
        .then(function () {
          expect(store.getActions())
            .toEqual([
              {
                type: types.LOADING,
                payload: true
              },
              {
                type: types.LOADING,
                payload: false
              },
              {
                type: dataTypes.SET,
                payload: dataMapper({
                  foo: 'bar',
                  thedata: 'thetime'
                })
              },
              {
                type: types.HYDRATED
              }
            ])
        })
    })
  })
  context('mapToProps', () => {
    it('returns correct state slice', () => {
      expect(mapToProps({foo: {foo: 'bar'}, ui: {jim: 'jam'}}))
        .toEqual({jim: 'jam'})
    })
  })
})
