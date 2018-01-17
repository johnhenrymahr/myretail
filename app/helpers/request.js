import axios from 'axios'
export default function request (url = '', method = 'get', data = {}, params = {}) {
  method = method.toLowerCase()
  return axios({
    method,
    url,
    data,
    params
  })
}
