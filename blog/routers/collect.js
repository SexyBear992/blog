const express = require('express')
const collectModel = require('../model/collectModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var userid = req.body.userid
    var articleid = req.body.articleid

    if(userid && articleid){
        var collect = new collectModel({
            userid,
            articleid,
            time:Date.now()
        })
        collect.save((err,suc)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'收藏失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'收藏成功',
                    data:suc
                })
            }
        })
    }else{
        res.json({
            state:'fail',
            msg:'收藏失败',
            data:'缺少参数'
        })
    }
})

module.exports = router