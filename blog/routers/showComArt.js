const express = require('express')
const commentModel = require('../model/commentModel')
const replyCommentModel = require('../model/replyCommentModel')
const articleModel = require('../model/articleModel')
const router = express.Router()

router.post('/',(req,res)=>{
    var userid = req.session.user.username
    commentModel.find({userid,'__v':'0'}).populate('articleid','').sort({'time':'-1'}).exec((err,art)=>{
        if(err){
            res.json({
                state:'fail',
                msg:"失败",
                data:err
            })
        }else{
            res.json({
                state:'success',
                msg:"成功",
                data:art
            })
        }
    })

    // replyCommentModel.find({userid,'__v':'0'}).sort({'time':'-1'}).exec((err,art)=>{
    //     if(err){
    //         res.json({
    //             state:'fail',
    //             msg:"失败",
    //             data:err
    //         })
    //     }else{
    //         res.json({
    //             state:'success',
    //             msg:"成功",
    //             data:art
    //         })
    //     }
    // })

})

module.exports = router