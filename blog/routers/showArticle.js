const express = require('express')
const articleModel = require('../model/articleModel')
const router = express.Router()

router.post('/', (req, res) => {
    var userid = req.body.userid
    var pag = req.body.pag
    if (userid && pag) {
        articleModel.find({ author: userid, '__v': '0' }).sort({ 'time': '-1' }).skip(pag * 5).limit(5).exec((err, art) => {
            if (err) {
                res.json({
                    state: 'fail',
                    msg: "失败",
                    data: err
                })
            } else {
                res.json({
                    state: 'success',
                    msg: "成功",
                    data: art
                })
            }
        })
    } else {
        if (userid) {
            articleModel.find({ author: userid, '__v': '0' }).sort({ 'time': '-1' }).exec((err, art) => {
                if (err) {
                    res.json({
                        state: 'fail',
                        msg: "失败",
                        data: err
                    })
                } else {
                    res.json({
                        state: 'success',
                        msg: "成功",
                        data: art
                    })
                }
            })
        }
        else {
            articleModel.find({ '__v': '0' }).sort({ 'time': '-1' }).exec((err, art) => {
                if (err) {
                    res.json({
                        state: 'fail',
                        msg: "失败",
                        data: err
                    })
                } else {
                    res.json({
                        state: 'success',
                        msg: "成功",
                        data: art
                    })
                }
            })
        }

    }

})

module.exports = router