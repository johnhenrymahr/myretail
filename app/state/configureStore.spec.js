import configureStore from './configureStore'

describe('configure store spec', () => {
  it('returns a store object', () => {
    const store = configureStore({})
    expect(typeof store).toEqual('object')
    expect(typeof store.dispatch).toEqual('function')
    expect(typeof store.subscribe).toEqual('function')
    expect(typeof store.getState).toEqual('function')
  })
})
