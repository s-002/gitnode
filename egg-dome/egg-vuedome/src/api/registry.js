import request from '../until/request'
export const getIdentity=()=>request.get('/identity')//身份列表
export const sendUserinfo=(data)=>request.post('/registry',data)//登录请求注册信息参数
