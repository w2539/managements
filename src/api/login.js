import request from '../utils/request.js'

export const loginAccount = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}
