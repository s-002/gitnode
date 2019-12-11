import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home/index'
  },{
    path:'/home',
    beforeEnter(to, from, next){

      // ...
      let token=window.localStorage.getItem('token')
      if(token&&token.split('.').length===3){
        next()
      }else{
        router.replace('/login')
      }
    },
    component:Home,
    children:[
      {
        path:'index',
        component:()=>import('../views/components/index.vue')
      },{
        path:'show',///查看成绩
        component:()=>import('../views/Show/index.vue')
      },{
        path:'submit',//提交成绩
        component:()=>import('../views/submit/index.vue')
      }
    ],
    redirect:'/home/index'
  },{
    path:'/registry',
    component:()=>import('../views/registry/index.vue')
  },{
    path:'/login',
    component:()=>import('../views/login/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
