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
    it('creates a incQuantity action ', () => {
      expect(actions.incQuantity())
        .toEqual({
          type: types.INC
        })
    })
    it('creates a decQuantity action ', () => {
      expect(actions.decQuantity())
        .toEqual({
          type: types.DEC
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
    it('increments quantity', () => {
      expect(reducer({
        foo: 'bar',
        foobar: {
          for: 'bar'
        },
        skuDetails: {
          foo: 'bar',
          quantity: 5
        }
      }, {type: types.INC}))
        .toEqual({
          foo: 'bar',
          foobar: {
            for: 'bar'
          },
          skuDetails: {
            foo: 'bar',
            quantity: 6
          }
        })
    })
    it('decrements quantity', () => {
      expect(reducer({
        foo: 'bar',
        foobar: {
          for: 'bar'
        },
        skuDetails: {
          foo: 'bar',
          quantity: 5
        }
      }, {type: types.DEC}))
        .toEqual({
          foo: 'bar',
          foobar: {
            for: 'bar'
          },
          skuDetails: {
            foo: 'bar',
            quantity: 4
          }
        })
    })
    it('does not decrements quantity below 0', () => {
      expect(reducer({
        foo: 'bar',
        foobar: {
          for: 'bar'
        },
        skuDetails: {
          foo: 'bar',
          quantity: 0
        }
      }, {type: types.DEC}))
        .toEqual({
          foo: 'bar',
          foobar: {
            for: 'bar'
          },
          skuDetails: {
            foo: 'bar',
            quantity: 0
          }
        })
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
