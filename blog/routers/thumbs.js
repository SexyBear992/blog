const express = require('express')
const thumbsModel = require('../model/thumbsModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var userid = req.session.user.username
    var articleid = req.body.articleid

    if(userid && articleid){
        var thumbs = new thumbsModel({
            userid,
            articleid
        })
        thumbs.save((err,suc)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'点赞失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'点赞成功',
                    data:suc
                })
            }
        })
    }else{
        res.json({
            state:'fail',
            msg:'点赞失败',
            data:'缺少参数'
        })
    }
})

module.exports = router