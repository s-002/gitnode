const Controller=require('egg').Controller
class IndexController extends Controller{
    async init(ctx,next){
        ctx.body='hello eggr'
    }
}
module.exports=IndexController