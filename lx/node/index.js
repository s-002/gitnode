const path=require('path')
const fs=require('fs')
const express=require('express')
const app=express()

const getData=(path)=>new Promise((resolve,reject)=>{
    fs.readFile(path,(err,data)=>{
        if(err){
            reject(err)
            return;
        }
        resolve(JSON.parse(data.toString()))
    })
})

//数据 接口

app.get('/getlist',async (req,res)=>{
    // console.log(req.query)
    let data=await getData('./public/mock/mock.json')
    res.send({
        data:data
    })
})


//模糊搜索 接口
app.get('/getincludes',async (req,res)=>{
    console.log(req.query)
    const {ipt}=req.query
    let data=await getData('./public/mock/mock.json')
    let listdata=data.filter(item=>{
        return item.name.includes(ipt)||item.title.includes(ipt)
    })
    res.send(listdata)
})
app.listen(3001,()=>{
    console.log('1')
})