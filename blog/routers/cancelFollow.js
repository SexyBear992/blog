const express = require('express')
const followModel = require('../model/followModel')
const router = express.Router()

router.post('/',(req,res)=>{

    var userid = req.body.userid
    var followid = req.body.followid

    if(userid && followid){
        followModel.remove({userid,followid},(err,del)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'取消关注失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'取消关注成功',
                    data:'删除' + del.deletedCount
                })
            }
        })
    }else{
        res.json({
            state:'fail',
            msg:"取消关注失败",
            data:'缺少参数'
        })
    }

})

module.exports = router