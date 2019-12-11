
module.exports=app=>{
    let {router,controller}=app
    let {getuserinfo} =app.middleware 
    router.get('/',controller.index.init)
    router.post('/registry',controller.user.index)//注册（注册信息）
    router.get('/identity',controller.user.getIdentity)//身份列表
    router.post('/login',controller.user.senduser)//登录（登录信息）
    router.get('/getuserinfo',getuserinfo(),controller.user.getuserinfo)//获取用户信息
    router.post('/submitexam',getuserinfo(),controller.exam.submit)//提交成绩
    router.get('/showexam',getuserinfo(),controller.exam.showexam)
}