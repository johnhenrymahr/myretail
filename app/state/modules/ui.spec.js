import reducer, { actions, types } from './ui'

describe('UI state module spec', () => {
  context('reducers', () => {
    it('sets the loading prop', () => {
      expect(reducer({foo: 'bar', loading: false}, { type: types.LOADING, payload: true }))
      .toEqual({foo: 'bar', loading: true})
    })
    it('sets the hydrated prop', () => {
      expect(reudcer({hydrated: false, foo: 'bar'}))
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
})