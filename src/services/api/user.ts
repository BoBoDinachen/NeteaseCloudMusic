import { request,get } from '../index'


/**
 * 用户手机登录
 * @param 
 * @returns 
 */
function cellphoneLogin(params: { phone: string, password: string }) {
  return request({ url: "/login/cellphone", method: 'get', params });
}

/**
 * 获取用户详情
 * @param {String} uid
 */
function getUserDetails(uid: string) {
  return request({ url: '/user/detail', method: 'get', params: { uid } })
}


/**
 * 导出所有api
 */
export {
  getUserDetails,
  cellphoneLogin
}