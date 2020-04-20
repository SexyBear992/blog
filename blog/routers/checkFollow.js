const express = require('express')
const followModel = require('../model/followModel')
const router = express.Router()

router.post('/',(req,res)=>{

    var userid = req.body.userid
    var followid = req.body.followid

    if(userid && followid){
        followModel.findOne({userid,followid},(err,del)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'查看关注失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'查看关注成功',
                    data:del
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