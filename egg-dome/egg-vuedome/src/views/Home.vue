<template>
    <el-container class="index">
        <el-aside width="200px">
          <div class="logo">
            <img src="https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=31ae4c2cac611321b2816410a594ec94&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F9f5b6ac2d5628535ddc0f85898ef76c6a7ef63b5.jpg" alt="">
          </div>
          <div>
            <router-link tag="p" :to="item.path" v-for="(item,index) in asidelist" :key="index">{{item.name}}</router-link>
          </div>
        </el-aside>
      <el-main>
        <el-header><p class="p">{{userinfo.userIdentitytitle}}:{{userinfo.username}}</p></el-header>
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script>
// @ is an alias to /src
import {getuserinfo} from '../api/info'
export default {
  data() {
    return {
      userinfo:{},
      asidelist:[
        {
          name:'提交成绩',
          path:'/home/submit',
        },
        {
          name:'查看成绩',
          path:'/home/show'
        }
      ]
    }
  },
  created() {
    getuserinfo().then(res=>{
      // console.log(res)
      this.userinfo=res.data
      if(this.userinfo.identity!=='aaa111'){
        this.asidelist=[
            {
            name:'查看成绩',
            path:'/home/show'
          }
        ]
      }
    }).catch(error=>{
      this.$message.error(error.response.data.msg)
      window.localStorage.removeItem('token')
      this.$router.replace('/login')
    })
  },
}
</script>
<style lang="scss">
  .index{
    width: 100%;
    height: 100%;
  }
  .p{
    float: right;
  }
   .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #2f5f83;
    color: #333;
    text-align: center;
    line-height: 100px;
    color: #Fff;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

</style>
