<!--  -->
<template>
    <el-container>
        <el-form ref="myform" :model="userinfo" :rules="userRule" label-width="80px" size="mini">
            <el-form-item label="身份" prop="identity">
                <el-select v-model="userinfo.identity" placeholder="请选择身份">
                   <el-option v-for="item in option" :key="item.id" :value="item.id" :label="item.title">{{item.title}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="username">
                <el-input v-model="userinfo.username"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="usercode" v-if="userinfo.identity==='aaa111'">
                <el-input type="usercode" v-model="userinfo.usercode"></el-input>
            </el-form-item>
             <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userinfo.password"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
import {getIdentity,sendUserinfo} from '../../api/registry'

export default {
  data () {
    return {
        userinfo:{
            username:'',
            password:'',
            usercode:'',
            identity:''
        },
        userRule:{
            username:[
                { required: true, message: '请输入姓名', trigger: 'change' }
            ],
            usercode:[
                { required: true, message: '请输入学号', trigger: 'change' }
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'change' },
                { min: 6, max:16, message: '长度在6到16个字符', trigger: 'change' }
            ],
            identity:[
                { required: true, message: '请选择身份', trigger: 'change' },
            ]
        },
        option:[]
    };
  },
  mounted() {
      getIdentity().then(res=>{
        //   console.log(res.data.data)
          this.option=res.data.data
      })
  },
  methods: {
      submit(){
          this.$refs['myform'].validate(res=>{
              if(res){
                  //发送ajax请求提交数据
                    sendUserinfo(this.userinfo).then(res=>{
                        console.log(res)
                        if(res.data.code==1){
                            this.$message({
                                message:'注册成功',
                                type:'success'
                            })
                            this.$router.push('/login')
                        }
                    })
                  return;
              }
          })
      }
  },
}

</script>
<style lang='scss' scoped>

</style>