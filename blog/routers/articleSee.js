const express = require('express')
const articleModel = require('../model/articleModel')
const seeModel = require('../model/seeModel')
const router = express.Router()

router.post('/', (req, res) => {

    var articleid = req.body.articleid
    var userid = req.body.userid
    if (userid) {
        var userid = userid
    } else {
        var userid = 'tourist'
    }
    if (articleid) {
        articleModel.findOne({ _id: articleid }, (err, suc) => {
            if (err) {
                res.json({
                    state: 'fail',
                    msg: '查看文章详情失败',
                    data: err
                })
            } else {
                var newart = suc;
                suc.see = newart.see + 1
                articleModel.findOneAndUpdate({ _id: articleid }, suc, (errs, see) => {
                    if (errs) {
                        res.json({
                            state: 'fail',
                            msg: '失败添加浏览数量1',
                            data: errs
                        })
                    } else {
                        if (userid && articleid) {

                            seeModel.find({ $and: [{ userid }, { articleid }] }, (seer, ssuc) => {
                                if (seer) {
                                    res.json({
                                        state: 'fail',
                                        msg: '失败添加历史记录',
                                        data: seer
                                    })
                                } else {
                                    if (ssuc.length === 0) {
                                        var seeM = new seeModel({
                                            userid,
                                            articleid,
                                            time: Date.now()
                                        })
                                        seeM.save((erre, suce) => {
                                            if (erre) {
                                                res.json({
                                                    state: 'fail',
                                                    msg: '添加浏览历史失败',
                                                    data: erre
                                                })
                                            } else {
                                                res.json({
                                                    state: 'success',
                                                    msg: '添加浏览历史成功',
                                                    data: suce
                                                })
                                            }
                                        })
                                    }else{
                                        seeModel.findOneAndUpdate({articleid},{time:Date.now()},(xerr,xsuc)=>{
                                            if(xerr){
                                                res.json({
                                                    state: 'fail',
                                                    msg: '更新历史记录时间失败',
                                                    data: xerr
                                                })
                                            }else{
                                                res.json({
                                                    state: 'success',
                                                    msg: '更新历史记录时间成功',
                                                    data: xsuc
                                                })
                                            }
                                        })
                                    }
                                }
                            })


                        } else {
                            res.json({
                                state: 'fail',
                                msg: '添加浏览历史失败',
                                data: '缺少参数'
                            })
                        }
                        // res.json({
                        //     state:'success',
                        //     msg:'成功添加浏览数量1',
                        //     data:see
                        // })
                    }
                })
            }
        })
    } else {
        res.json({
            state: 'fail',
            msg: '查看文章详情失败',
            data: '缺少参数'
        })
    }


})

module.exports = router