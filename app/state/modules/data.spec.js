import reducer, { actions, types, mapToProps } from './data'

jest.mock('../dataMapper', () => {
  return function (data) {
    return {
      ...data,
      fooman: 'chu'
    }
  }
})

describe('data state module spec', () => {
  context('action creators', () => {
    it('creates a setData action', () => {
      expect(actions.setData({foo: 'bar'}))
        .toEqual({
          type: types.SET,
          payload: { foo: 'bar', fooman: 'chu' }
        })
    })
  })
  context('reducers', () => {
    it('returns empty on init', () => {
      expect(reducer()).toEqual({})
    })
    it('returns state if no action type provided', () => {
      expect(reducer({foo: 'bar'}, {})).toEqual({foo: 'bar'})
    })
    it('SET reducer to transform correctly', () => {
      expect(reducer({}, { type: types.SET, payload: { foo: 'bar' } }))
        .toEqual({ foo: 'bar' })
    })
  })
  context('mapToProps', () => {
    it('returns correct state slice', () => {
      expect(mapToProps({foo: {foo: 'bar'}, data: {jim: 'jam'}}))
        .toEqual({jim: 'jam'})
    })
  })
})
