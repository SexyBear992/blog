const express = require('express')
const articleModel = require('../model/articleModel')
const adminDelModel = require('../model/adminDelModel')
const router = express.Router()

router.post('/', (req, res) => {
    var articleid = req.body.articleid
    var userid = req.body.userid
    var author = req.body.author
    if (articleid && userid) {
        if (userid == 'SexyBear') {
            articleModel.findOneAndUpdate({ _id: articleid }, { __v: '1' }, (err, del) => {
                if (err) {
                    res.json({
                        state: 'fail',
                        msg: '删除文章失败',
                        data: err
                    })
                } else {
                    var adminDel = new adminDelModel({
                        admin: userid,
                        content: '您的文章含违规内容，已被管理员删除',
                        articleid,
                        author
                    })

                    adminDel.save((delerr, delsuc) => {
                        if (err) {
                            res.json({
                                state: 'fail',
                                msg: '发送失败',
                                data: delerr
                            })
                        } else {
                            res.json({
                                status: 'success',
                                msg: "发送且删除成功",
                                data: delsuc
                            })
                        }
                    })
                }
            })
        }
        else {
            articleModel.findOneAndUpdate({ _id: articleid }, { __v: '1' }, (err, del) => {
                if (err) {
                    res.json({
                        state: 'fail',
                        msg: '删除文章失败',
                        data: err
                    })
                } else {
                    res.json({
                        state: 'success',
                        msg: '删除文章成功',
                        data: del
                    })
                }
            })
        }

    } else {
        res.json({
            state: 'fail',
            msg: '删除文章失败',
            data: '缺少参数'
        })
    }
})

module.exports = router