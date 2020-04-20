const express = require('express')
const seeModel = require('../model/seeModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var articleid = req.body.articleid
    var userid = req.body.userid
    if(articleid && userid){
        seeModel.remove({$and:[{userid},{articleid}]},(err,del)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'删除浏览失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'删除浏览成功',
                    data:del
                })
            }
        })
    }else{
        res.json({
            state:'fail',
            msg:'删除浏览失败',
            data:'缺少参数'
        })
    }
})

module.exports = router