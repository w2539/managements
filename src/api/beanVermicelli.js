import request from '../utils/request'

/**
 * 获得用户粉丝列表
 */
export const getUserBeanVermicelliList = (data) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    data
  })
}
