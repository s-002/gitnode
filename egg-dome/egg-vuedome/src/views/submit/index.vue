<!--  -->
<template>
    <div>
        <el-form>
           <el-form-item label="理论成绩">
                <el-input type='number' v-model="textnum"></el-input>
            </el-form-item>
            <el-form-item label="技能成绩">
                <el-input type='number' v-model="codenum"></el-input>
            </el-form-item>
            <el-form-item label='选择日期'>
              <el-date-picker
                v-model="date"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="submitclick">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {submitexam} from '../../api/info'
export default {
  data () {
    return {
      textnum:'',
      codenum:'',
      date:new Date().toLocaleDateString(),
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
      }
    };
  },
  methods: {
    submitclick(){
      let date=new Date(this.date).toLocaleDateString()
      submitexam({
        textnum:this.textnum,
        codenum:this.codenum,
        date
      }).then(res=>{
        console.log(res)
        if(res.data.code){
          this.$message({
            message:'提交成功',
            type:'success'
          })
        }
      })
    }
  },
}

</script>
<style lang='scss' scoped>

</style>