const express = require('express')
const articleModel = require('../model/articleModel')
const router = express.Router()

router.post('/', (req, res) => {
    var articleid = req.body.articleid
    if (articleid) {
        articleModel.findOne({ _id: articleid }, (err, suc) => {
            if (err) {
                res.json({
                    state: 'fail',
                    msg: '查看文章详情失败',
                    data: err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'查看文章详情成功',
                    data:suc
                })
            }
        })
    }
})

module.exports = router
