<template>
  <div class="home">
   <div class="topdiv"><p></p> <h3>客户账户</h3> <p></p></div>
   <div>
     <div class="ipt">
        <input type="text" v-model="ipt" placeholder="输入客户名称,手机号,备注名">
        <button @click="include()">搜索</button>
      </div>
   </div>
   
   <div class="navlist">
     <p v-for="(item,index) in navlist" :key="index" :class="isNoN===index?'active':''" @click="btn(index)">{{item.title}}</p>
   </div>
   <div>
       <dl class="dl" v-for="(item,index) in datalist" :key="index">
         <dd>图</dd>
         <dt>
            <p>{{item.name}}</p>
            <span class="span">{{item.title}}</span>
         </dt>
         <dt>

         </dt>
       </dl>
   </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
 data(){
   return {
     navlist:[{
                  title:'全部',
                  num:'',
                  type:'all'
              },{
                  title:'云近货商',
                  num:'',
                  type:'buyer'
              },
              {
                  title:'关注用户',
                  num:'',
                  type:'like'
              },
              {
                  title:'成交',
                  num:'',
                  type:'ok'
              }],
     alldata:[],//初始所有的数据
     datalist:[],//进行渲染的数据
     isNoN:0,
     ipt:''
   }
 },
 async created() {
    await  axios.get('/api/getlist').then(res=>{
      console.log(res)
      this.alldata=res.data.data
      this.setResdata(this.navlist[this.isNoN].type); //设置展示数据.
      // console.log(this.datalist)
    })
 },
 methods: {
   btn(index){//tab切换
     this.isNoN=index
     this.setResdata(this.navlist[index].type);
   },
   include(){//模糊搜索
    if(this.ipt){
        axios.post(`/api/getincludes`,{ipt:this.ipt}).then(res=>{
            // console.log(res.data)
            this.datalist=res.data.listdata
        })
    }else{
      alert('请输入客户名称,手机号,备注名')
    }
   },
   setResdata(type){//根据传过来的type 来进行筛选
     if(type==='all'){
       this.datalist=this.alldata
     }else{
       this.datalist=this.alldata.filter(item=>item.type===type)
     }
   }
 }
}
</script>
<style lang="scss">
  .topdiv{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-around;
    // background: #f7b516;
    // color: #Fff;
  }
  .span{
    font-size: 13px;
    color:#ccc;
  }
  .dl{
    display: flex;
    dd{
      flex: 3;
      text-align: center;
      line-height: 40px;
    }
    dt{
      flex:7;
    }
  }
  .ipt{
    width: 300px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 30px;
    border: 1px solid #ccc;
    margin-left:30px;
  
    color: #Fff;
    input{
      border:0;
      width: 70%;
      height: 25px;
      outline:none;
    }
    button{
      border:0;
      background: #Fff;
    }
  }
  .navlist{
    width: 100%;
    height: 35px;
    line-height: 35px;
    display: flex;
    justify-content: space-around;
  }
  .active{
    color: red;
  }
</style>