import request from '../utils/request.js'

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}
