import request from '../until/request'

export const getuserinfo=()=>request.get('/getuserinfo',{
    headers:{
        token:window.localStorage.getItem('token')
    }
})

export const submitexam=(data)=>request.post('/submitexam',data,{
    headers:{
        token:window.localStorage.getItem('token')
    }
})