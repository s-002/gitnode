#!/usr/bin/env node
const path=require('path')
const fs=require('fs')
const koa=require('koa')
const Router=require('koa-router')
const bodyParser=require('koa-bodyparser')
const app=new koa();
const router =new Router()
// const express=require('express')
// const app=express()

const getData=(path)=>new Promise((resolve,reject)=>{
    fs.readFile(path,(err,data)=>{
        if(err){
            reject(err)
            return;
        }
        resolve(JSON.parse(data.toString()))
    })
})
app.use(bodyParser())
app.use(router.routes(),router.allowedMethods())
//数据 接口

router.get('/getlist',async (ctx,next)=>{
    // console.log(req.query)
    let data=await getData('./public/mock/mock.json')
    ctx.body={
        data:data
    }
})


//模糊搜索 接口
router.post('/getincludes',async (ctx,next)=>{
    console.log(ctx.request.body)
    const {ipt}=ctx.request.body
    let data=await getData('./public/mock/mock.json')
    let listdata=data.filter(item=>{
        return item.name.includes(ipt)||item.title.includes(ipt)
    })
   ctx.body={
       listdata
   }
})
app.listen(3002,()=>{
    console.log('1')
})