import reducer, { actions, types } from './data'

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
    it('SET reducer to transform correctly', () => {
      expect(reducer({}, { type: types.SET, payload: { foo: 'bar' } }))
      .toEqual({ foo: 'bar' })
    })
  })
})