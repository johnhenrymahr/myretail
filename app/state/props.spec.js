import props from './props'
import getInitialState from './getInitialState'
describe('props collector spec ', () => {
  it('returns a object', () => {
    expect(typeof props(getInitialState({}))).toEqual('object')
  })
})
