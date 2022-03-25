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
