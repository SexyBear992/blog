const express = require('express')
const articleModel = require('../model/articleModel')
const userModel = require('../model/userModel')
const router = express.Router()

router.post('/',(req,res)=>{

    var articleid = req.body.articleid
    var content = req.body.content

    userModel.findOne({_id:req.session.user.uid},(err,uM)=>{
        if(articleid && content){
            articleModel.findOne({_id:articleid},(err,aM)=>{
                // uM 分享者的信息
                // aM 为分享的文章信息
                var articke = new articleModel({
                    content ,
                    share : aM,
                    avatar : uM.pic,
                    author : uM.username,
                    time : Date.now(),
                    len : 0,
                    see : 0,
                    like : 0,
                    col : 0
                })

                articke.save((err,suc)=>{
                    if(err){
                        res.json({
                            state:'fail',
                            msg:'分享失败',
                            data:err
                        })
                    }else{
                        res.json({
                            status:'success',
                            msg:"分享成功",
                            data:suc
                        })
                    }
                })
            })
        }else{
            res.json({
                state:'fail',
                msg:'分享失败',
                data:'缺少参数'
            })
        }
        
    })

})

module.exports = router