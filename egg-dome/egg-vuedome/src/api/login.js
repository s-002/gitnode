import request from '../until/request'
export const senduser=(data)=>request.post('/login',data)//登录请求登录信息参数