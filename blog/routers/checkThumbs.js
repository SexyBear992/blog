const express = require('express')
const thumbsModel = require('../model/thumbsModel')
const articleModel = require('../model/articleModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var userid = req.body.userid
    var articleid = req.body.articleid
    thumbsModel.find({userid,articleid},(err,art)=>{
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
})

module.exports = router