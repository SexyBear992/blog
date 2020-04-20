const express = require('express')
const collectModel = require('../model/collectModel')
const articleModel = require('../model/articleModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var userid = req.body.userid
    collectModel.find({userid,'__v':'0'}).populate('articleid','').sort({'time':'-1'}).exec((err,art)=>{
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