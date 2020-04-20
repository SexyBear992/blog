const express = require('express')
const replyCommentModel = require('../model/replyCommentModel')
const router = express.Router()

router.post('/',(req,res)=>{

    var userid = req.session.user.username
    var replyid = req.body.replyid
    var content = req.body.content
    var replyuser = req.body.replyuser
    var articleid = req.body.articleid

    if( userid && replyid && content && replyuser && articleid){
        var replyComment = new replyCommentModel({
            userid,
            replyid,
            content,
            articleid,
            replyuser,
            time : Date.now(),
            like : 0 ,
            replylen : 0
        })

        replyComment.save((err,suc)=>{
            if(err){
                res.json({
                    state :'fail',
                    msg:'回复失败',
                    data:err
                })
            }else{
                res.json({
                    state :'success',
                    msg:'回复成功',
                    data:suc
                })
            }
        })
    }else{
        res.json({
            state :'fail',
            msg:'回复失败',
            data:'缺少参数'
        })
    }


})

module.exports = router