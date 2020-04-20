const express = require('express')
const followModel = require('../model/followModel')
const router = express.Router()

router.post('/', (req, res) => {
    var userid = req.body.userid
    var followid = req.body.followid

    if (userid && followid) {
        if (userid == followid) {
            res.json({
                state: 'fail',
                msg: '关注失败',
                data: '无法关注自己'
            })
        } else {
            followModel.find({userid,followid},(ferr,fsuc)=>{
                if(ferr){
                    res.json({
                        state: 'fail',
                        msg: '关注失败',
                        data: ferr
                    })
                }else{
                    if(fsuc.length===0){
                        var follow = new followModel({
                            userid,
                            followid,
                        })
            
                        follow.save((err, suc) => {
                            if (err) {
                                res.json({
                                    state: 'fail',
                                    msg: '关注失败',
                                    data: err
                                })
                            } else {
                                res.json({
                                    state: 'success',
                                    msg: '关注成功',
                                    data: suc
                                })
                            }
                        })
                    }else{
                        res.json({
                            state: 'fail',
                            msg: '无法重复关注',
                            data: fsuc
                        })
                    }
                }
            })
            
        }
    } else {
        res.json({
            state: 'fail',
            msg: '关注失败',
            data: '缺少参数'
        })
    }

})

module.exports = router