const express = require('express')
const artickeModel = require('../model/articleModel')
const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var username = req.body.username
    userModel.findOne({username},(err,u)=>{
        var title = req.body.title
        var content = req.body.content
        var pic = req.body.pic

        if(title && content){

            var articke = new artickeModel({
                title,
                content,
                pic,
                avatar : u.pic,
                author : u.username,
                time : Date.now(),
                user : u,
                len : 0,
                see : 0,
                like : 0,
                col : 0
            })

            articke.save((err,suc)=>{
                if(err){
                    res.json({
                        state:'fail',
                        msg:'发表失败',
                        data:err
                    })
                }else{
                    res.json({
                        status:'success',
                        msg:"发表成功",
                        data:suc
                    })
                }
            })

        }else{
            res.json({
                state:"fail",
                msg:'发表失败',
                data:''
            })
        }

        
        // console.log(u.username);
        // console.log(u.pic);

    })

})

module.exports = router