const express = require('express')
const commentModel = require('../model/commentModel')
const router = express.Router()

router.post('/', (req, res) => {

    var author = req.body.author
    var pag = req.body.pag
    if (author && pag) {
        commentModel.find({ author, '__v': '0' }).populate('articleid','').sort({ 'time': '-1' }).skip(pag * 10).limit(10).exec((err, art) => {
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
    }else{
        if(author){
            commentModel.find({ author, '__v': '0' }).populate('articleid','').sort({ 'time': '-1' }).exec((err, art) => {
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