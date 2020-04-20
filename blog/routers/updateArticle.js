const express = require('express')
const crypto = require('crypto');
const articleModel = require('../model/articleModel')
const router = express.Router()


router.post('/', (req, res) => {

    var articleid = req.body.articleid
    var title = req.body.title
    var content = req.body.content
    var pic = req.body.pic

    articleModel.findOneAndUpdate({ _id: articleid }, { title: title, content: content, pic: pic }, (err, suc) => {
        if (err) {
            res.json({
                state: 'fail',
                msg: '修改失败',
                data: err
            })
        } else {
            res.json({
                state: 'success',
                msg: '修改成功',
                data: suc
            })
        }
    })
})

module.exports = router