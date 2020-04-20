const express = require('express')
const replyModel = require('../model/replyCommentModel')
const router = express.Router()

router.post('/',(req,res)=>{

    var size = req.body.size? parseInt(req.body.size):10;
    var page = req.body.page?parseInt(req.body.page):1;

    replyModel.find({'__v':'0'}).sort({'time':'-1'}).limit(size).skip(size*(page-1)).exec((err,art)=>{
        if(err){
            res.json({
                state:'fail',
                msg:"失败",
                data:err
            })
        }else{
            // function sortNumber(a, b){
            //     return b - a
            // }
            res.json({
                state:'success',
                msg:"成功",
                // data:art.sort(sortNumber)
                data:art
            })
        }
    })
})

module.exports = router