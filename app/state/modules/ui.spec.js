import reducer, { actions, types } from './ui'

describe('UI state module spec', () => {
  context('reducers', () => {
    it('sets the loading prop', () => {
      expect(reducer({foo: 'bar', loading: false}, { type: types.LOADING, payload: true }))
      .toEqual({foo: 'bar', loading: true})
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
  })
})