const express = require('express')
const commentModel = require('../model/commentModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var commentid = req.body.commentid
    var userid = req.session.user.username
    if(commentid && userid){
        commentModel.findOneAndUpdate({_id:commentid},{__v:'1'},(err,del)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'删除评论失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'删除评论成功',
                    data:del
                })
            }
        })
    }else{
        res.json({
            state:'fail',
            msg:'删除评论失败',
            data:'缺少参数'
        })
    }
})

module.exports = router