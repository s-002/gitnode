const Controller=require('egg').Controller
const uid=require('uid')
const jwt=require('jsonwebtoken')
module.exports=class extends Controller{
    async index(ctx){
        let {request}=ctx;
        // console.log('rse',ctx.request.body)//传过来的参数
        //this.app.validator.validate()两个参数第一个配置对象，第二个要检验的值的对象
        // let msg=this.app.validator.validate({
        //     password:'password',
        //     username:'string',
        //     identity:'string'
        // },request.body)
        // if(msg){
        //     ctx.body={
        //         code:0,
        //         msg:'格式错误',
        //         data:msg
        //     }
        //     return;
        // }
        //通过校验 向数据库存储
        // let query=`INSERT INTO user(${Object.keys(request.body).join(',')},id)
        // values("${Object.values(request.body).join('","')}","${uid(5)}")`
        await this.app.mysql.insert("user",{
            ...ctx.request.body,
            id:uid(3)
        })
        ctx.body={
            code:1,
            msg:'注册成功'
        }
    }
    async getIdentity(){
        //查询表
        let data=await this.app.mysql.select('identity')
        // console.log(data)//identity表里的数据
        this.ctx.body={
            code:1,
            data:[...data]
        }
    }
    async senduser(ctx){
        let {username,password}=ctx.request.body;//传过来的参数
        //查询表
        let data=await this.app.mysql.get('user',{
            username,
            password
        })
        // console.log(data)//user表里筛选出来的数据
        // console.log(reg)
        if(data){
            this.ctx.body={
                code:2,
                msg:'登录成功',
                data:{//密钥  expiresIn过期时间
                    token:jwt.sign({...data},this.app.config.keys,{expiresIn:"1h"})
                }
            }
        }else{
            this.ctx.body={
                code:0,
                msg:'姓名或密码输入有误,请重新输入'
            }
        }   
    }
    async getuserinfo(ctx){//用户信息
       this.ctx.body=ctx.userinfo
       
    }
}