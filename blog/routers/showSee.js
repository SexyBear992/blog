const express = require('express')
const seeModel = require('../model/seeModel')
const router = express.Router()

router.post('/',(req,res)=>{

    var userid = req.body.userid
    seeModel.find({userid,'__v':'0'}).populate('articleid','').sort({'time':'-1'}).exec((err,art)=>{
        art.forEach(item=>{
            console.log(item.articleid._id);
            
        })
        
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
    })
})

module.exports = router