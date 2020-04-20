const express = require('express')
const adminDelModel = require('../model/adminDelModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var author = req.body.userid
    adminDelModel.find({author,'__v':'0'}).populate('articleid','').sort({'time':'-1'}).exec((err,art)=>{
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