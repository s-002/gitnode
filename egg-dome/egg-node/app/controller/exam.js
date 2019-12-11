const Controller=require('egg').Controller
module.exports=class extends Controller{
    async submit(){
        // console.log(this.ctx.userinfo)
        // console.log(this.ctx.request.body)
        try{
            let date=await this.app.mysql.get('examlist',{
                userid:this.ctx.userinfo.id,
               date:this.ctx.request.body.date
            })
            // console.log(date)
            if(date){
                await this.app.mysql.update('examlist',{
                    id:date.id,
                    ...this.ctx.request.body
                 })
            }
            else{
                await this.app.mysql.insert('examlist',{
                    userid:this.ctx.userinfo.id,
                    ...this.ctx.request.body
                })
            }
            this.ctx.body={
                code:1,
                msg:'succes'
            }
        }catch(error){
            this.ctx.body={
                code:0,
                msg:'error'
            }
        }
    }
    async showexam(){
        let {userIdentitytitle,id}=this.ctx.userinfo
        let data=null
        if(userIdentitytitle==='学生'){
            data=await this.app.mysql.select('examlist',{
                where:{
                    userid:id
                }
            })
        }else{
            data=await this.app.mysql.select('examlist')
        }
        this.ctx.body={
            code:1,
            msg:'success',
            data:[...data]
        }
    }
}