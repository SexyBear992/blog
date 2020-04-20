const express = require('express')
const tokenModel = require('../model/tokenModel');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/',(req,res)=>{
    var token = req.body.token
    tokenModel.findOne({token},(req,s)=>{
        if(s){

            try {
                var decode = jwt.verify(token,'secret');
            } catch (er) {
                res.json({
                    status:'fail',
                    msg:"登录过期",
                    data: er
                })
            }
            if(decode){
                res.json({
                    status:'success',
                    msg:"查询成功",
                    data: decode
                })                
            }else{
                res.json({
                    status:'fail',
                    msg:"登录过期",
                    data: ''
                })
            }
        }else{
            res.json({
                state:"fail",
                msg:'登录失败',
                data:''
            })
        }
    })

})

module.exports = router