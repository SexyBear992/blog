const express = require('express')
const commentModel = require('../model/commentModel')
const router = express.Router()

router.post('/',(req,res)=>{

    var username = req.body.username
    var userid = req.body.userid
    var articleid = req.body.articleid
    var content = req.body.content
    var avatar = req.body.avatar
    var author = req.body.author

    if(userid && articleid && content){
        var comment = new commentModel({
            userid,
            articleid,
            author,
            content,
            time : Date.now(),
            like : 0,
            replylen : 0,
            username,
            avatar
        })
        
        comment.save((err,suc)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'评论失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'评论成功',
                    data:suc
                })
            }
        })

    }else{
        res.json({
            state:'fail',
            msg:"评论失败",
            data:'缺少参数'
        })
    }
})

module.exports = router