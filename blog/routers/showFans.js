const express = require('express')
const followModel = require('../model/followModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var followid = req.body.followid
    var pag = req.body.pag
    if(followid && pag){
        followModel.find({followid}).populate('followid','').skip(pag * 10).limit(10).exec((err,art)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:"失败",
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:"成功",
                    data:art
                })
            }
        })
    }else{
        followModel.find({followid}).populate('followid','').exec((err,art)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:"失败",
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:"成功",
                    data:art
                })
            }
        })
    }
    
})

module.exports = router