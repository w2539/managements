import request from '../utils/request'

/**
 *  获取文章列表
 * @param {文章筛选选项} params
 * @returns
 */
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: params
  })
}

/**
 * 获取文章列表
 */
export const getArticlesChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

/**
 * 删除文章列表
 */

export const deleteArticles = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
