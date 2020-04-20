const express = require('express')
const articleModel = require('../model/articleModel')
// const likeModel = require('../model/likeModel')
const router = express.Router()

router.post('/',(req,res)=>{

    var articleid = req.body.articleid
    var userid = req.body.userid
    // if(userid){
    //     var userid = userid
    // }else{
    //     var userid = 'tourist'
    // }
    if(articleid){
        articleModel.findOne({_id:articleid},(err,suc)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'查看文章详情失败',
                    data:err
                })
            }else{
                var newart = suc;
                suc.like = newart.like + 1
                articleModel.findOneAndUpdate({_id:articleid},suc,(errs,like)=>{
                    if(errs){
                        res.json({
                            state:'fail',
                            msg:'失败添加喜欢数量1',
                            data:errs
                        })
                    }else{
                        // if(userid && articleid){
                        //     var likeM = new likeModel({
                        //         userid,
                        //         articleid
                        //     })

                        //     likeM.save((erre,suce)=>{
                        //         if(erre){
                        //             res.json({
                        //                 state:'fail',
                        //                 msg:'添加喜欢历史失败',
                        //                 data:erre 
                        //             })
                        //         }else{
                        //             res.json({
                        //                 state:'success',
                        //                 msg:'添加喜欢历史成功',
                        //                 data:suce
                        //             })
                        //         }
                        //     })
                        // }else{
                        //     res.json({
                        //        state:'fail',
                        //        msg:'添加喜欢历史失败',
                        //        data:'缺少参数' 
                        //     })
                        // }
                        res.json({
                            state:'success',
                            msg:'成功添加喜欢数量1',
                            data:like
                        })
                    } 
                })  
            }
        })
    }else{
        res.json({
            state:'fail',
            msg:'查看文章详情失败',
            data:'缺少参数'
        })
    }
    

})

module.exports = router