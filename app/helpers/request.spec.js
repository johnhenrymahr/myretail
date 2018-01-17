import request from './request'
import axios from 'axios'

jest.mock('axios', () => {
  return jest.fn()
})
beforeEach(() => {
  axios.mockClear()
})
describe('request helper test', () => {
  it('passes values through to axios function', () => {
    request('/path/to/stuff', 'post', {foo: 'bar'}, {var1: 'var2'})
    expect(axios.mock.calls[0][0].url).toEqual('/path/to/stuff')
    expect(axios.mock.calls[0][0].method).toEqual('post')
    expect(axios.mock.calls[0][0].data).toEqual({foo: 'bar'})
    expect(axios.mock.calls[0][0].params).toEqual({var1: 'var2'})
  })
  it('handles null values', () => {
    request()
    expect(axios.mock.calls[0][0].url).toEqual('')
    expect(axios.mock.calls[0][0].method).toEqual('get')
    expect(axios.mock.calls[0][0].data).toEqual({})
    expect(axios.mock.calls[0][0].params).toEqual({})
  })
})
