const express = require('express')
const upload = require('../model/update');
const crypto = require('crypto');
const userModel = require('../model/userModel')
const router = express.Router()


router.post('/',upload.single('avatar'),(req,res)=>{

    var username = req.body.username
    var pw = req.body.password
    var content = req.body.content
    if(req.file){
        var avatar = req.file.filename
    }

    if(pw && content && avatar){
        var md5 = crypto.createHash("md5"); 
        var md5Sum = md5.update(pw);    
        var password = md5Sum.digest('hex'); 
        console.log(avatar);
        
        userModel.findOneAndUpdate({username:username},{password:password,content:content,pic:avatar},(err,suc)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'修改失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'修改成功',
                    data:suc
                })
            }
        })
        
        
    }else{
        // res.json({
        //     state:'fail',
        //     msg:'修改失败',
        //     data:'缺少参数'
        // })
        var md5 = crypto.createHash("md5"); 
        var md5Sum = md5.update(pw);    
        var password = md5Sum.digest('hex'); 
        console.log(avatar);
        
        userModel.findOneAndUpdate({username:username},{password:password,content:content},(err,suc)=>{
            if(err){
                res.json({
                    state:'fail',
                    msg:'修改失败',
                    data:err
                })
            }else{
                res.json({
                    state:'success',
                    msg:'修改成功',
                    data:suc
                })
            }
        })
    }
})

module.exports = router