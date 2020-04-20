const express = require('express')
const replyCommentModel = require('../model/replyCommentModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var replyid = req.body.replyid
    var userid = req.session.user.username
    if(replyid && userid){
        replyCommentModel.findOneAndUpdate({_id:replyid},{__v:'1'},(err,del)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'删除回复评论失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'删除回复评论成功',
                    data:del
                })
            }
        })
    }else{
        res.json({
            state:'fail',
            msg:'删除回复评论失败',
            data:'缺少参数'
        })
    }
})

module.exports = router