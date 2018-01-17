import actions from './actions'
describe('action collector spec ', () => {
  it('returns a object', () => {
    expect(typeof actions(jest.fn())).toEqual('object')
  })
})
