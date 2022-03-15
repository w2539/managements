/**
 * 本地存储封装
 */

// 获取本地储存的信息
export const getItem = (name) => {
  // 获取到未经任何处理的本地存储数据
  const data = window.localStorage.getItem(name)
  // data可能不是JSON 字符串
  try {
    // 尝试把data 转为 javaScript 对象
    return JSON.parse(data)
  } catch (err) {
    // data 不是JSON 字符串 直接原样返回
    return data
  }
}

// 添加本地存储
export const setItem = (name, value) => {
  // 本地存储无法直接存储对象
  if (typeof value === 'object') {
    // 如果是对象 转换为JSON
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

// 传入名称删除本地存储
export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
