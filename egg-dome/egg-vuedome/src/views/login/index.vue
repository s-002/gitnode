<!--  -->
<template>
    <el-container>
        <el-form ref="myformlogin" :model="userinfo" :rules="userRule" label-width="80px" size="mini">
           <el-form-item label="姓名" prop="username">
                <el-input v-model="userinfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userinfo.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
import {senduser} from '../../api/login'
export default {
  data () {
    return {
      userinfo:{
        username:'',
        password:''
      },
      userRule:{
          username:[
              { required: true, message: '请输入姓名', trigger: 'change' },
          ],
          password:[
              { required: true, message: '请输入密码', trigger: 'change' },
              { min: 6, max:16, message: '长度在6到16个字符', trigger: 'change' }
          ]
      },
      logindata:[]
    };
  },
  methods: {
    login(){
      this.$refs['myformlogin'].validate(res=>{
          // console.log(this.userinfo)
          if(res){
            senduser(this.userinfo).then(res=>{
              // console.log(res)
              if(res.data.code==2){
                window.localStorage.setItem('token',res.data.data.token)
                this.$router.push('/home')
              }else{
                this.$message.error(res.data.msg)
              }
            })
            return
          }
      })
    }
  },
}

</script>
<style lang='scss' scoped>

</style>