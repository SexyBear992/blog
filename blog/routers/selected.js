const express = require('express')
const articleModel = require('../model/articleModel')
const router = express.Router()

router.post('/',(req,res)=>{
    articleModel.find({'__v':'0'}).sort({'see':'-1'}).exec((err,art)=>{
        if(err){
            res.json({
                state:'fail',
                msg:"失败",
                data:err
            })
        }else{
            res.json({
                state:'success',
                msg:"成功",
                data:art
            })
        }

        console.log(art);
    })
})

module.exports = router