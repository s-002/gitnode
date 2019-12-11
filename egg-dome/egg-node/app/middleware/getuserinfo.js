const jwt=require('jsonwebtoken')
module.exports=(app)=>async function(ctx,next){
    let token=ctx.get('token')
        //    console.log(ctx)
       try{
        //    console.log(ctx.app.config.keys)
            let userinfo=jwt.verify(token,ctx.app.config.keys)//解密钥
            // console.log(userinfo)
            let title=await ctx.app.mysql.get('identity',{
                id:userinfo.identity
            })
            // console.log(title)
            userinfo.userIdentitytitle=title.title
            // console.log(userinfo)
            ctx.userinfo=userinfo
            await next()
       }catch(error){
            ctx.status=401;
            ctx.body={
                code:0,
                msg:'用户登录超时或用户信息错误，可能信息被篡改'
            }
       }
}