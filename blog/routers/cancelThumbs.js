const express = require('express')
const thumbsModel = require('../model/thumbsModel')
const router = express.Router()

router.post('/',(req,res)=>{

    var userid = req.session.user.username
    var articleid = req.body.articleid

    if(userid && articleid){
        thumbsModel.remove({userid,articleid},(err,del)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'取消点赞失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'取消点赞成功',
                    data:'删除' + del.deletedCount
                })
            }
        })
    }else{
        res.json({
            state:'fail',
            msg:"取消点赞失败",
            data:'缺少参数'
        })
    }

})

module.exports = router