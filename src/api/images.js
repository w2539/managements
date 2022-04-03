import request from '../utils/request'

/**
 * 上传图片素材
 */

export const upLoadingImage = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

/**
 * 获取用户图片素材
 */

export const getUserLoadingImage = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

/**
 * 收藏图片
 */
export const addCollectImage = (imageId, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}

/**
 * 删除图片素材
 */
export const deleteImage = (imageId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}

/**
 * 修改用户头像
 */
export const changeUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

/**
 * 获取用户资料
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}
