import request from '../utils/request.js'

export const loginAccount = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

/**
 * 修改用户资料
 */
export const changeUserInfo = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
