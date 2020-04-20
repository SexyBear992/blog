const express = require('express')
const commentModel = require('../model/commentModel')
const router = express.Router()

router.post('/', (req, res) => {

    var pag = req.body.pag
    var articleid = req.body.articleid
    if (pag) {
        commentModel.find({ articleid, '__v': '0' }).sort({ 'time': '-1' }).limit(5).skip(pag * 5).exec((err, art) => {
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

            console.log(art);
        })
    }else{
        commentModel.find({ articleid, '__v': '0' }).sort({ 'time': '-1' }).exec((err, art) => {
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

            console.log(art);
        })
    }

})

module.exports = router