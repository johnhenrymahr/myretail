import reducers from './reducers'
describe('reducer collector spec ', () => {
  it('returns a object', () => {
    expect(typeof reducers()).toEqual('object')
  })
})
