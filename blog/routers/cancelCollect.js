const express = require('express')
const collectModel = require('../model/collectModel')
const router = express.Router()

router.post('/',(req,res)=>{

    var userid = req.body.userid
    var articleid = req.body.articleid

    if(userid && articleid){
        collectModel.remove({userid,articleid},(err,del)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'取消收藏失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'取消收藏成功',
                    data:'删除' + del.deletedCount
                })
            }
        })
    }else{
        res.json({
            state:'fail',
            msg:"取消收藏失败",
            data:'缺少参数'
        })
    }

})

module.exports = router