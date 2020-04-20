const express = require('express')
const article = require('../model/articleModel')
const router = express.Router()

router.post('/', (req, res) => {

    var keyword = req.body.keyword
    var pag = req.body.pag
    var reg = new RegExp(keyword, 'ig')
    if (keyword) {
        article.find({ "$or": [{ title: { $regex: reg } }, { content: { $regex: reg } }] }).exec((err, suc) => {

            if (err) {
                res.json({
                    status: 'fail',
                    msg: '查询失败',
                    data: err
                })
            } else {
                res.json({
                    status: 'success',
                    msg: '查询成功',
                    data: suc
                })
            }
        })
    }

})

module.exports = router