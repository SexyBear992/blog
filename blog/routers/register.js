const express = require('express')
const upload = require('../model/update');
const userModel = require('../model/userModel');
const router = express.Router();
const crypto = require('crypto');

router.post('/', upload.single('avatar'), (req, res) => {
    var username = req.body.username;
    var pw = req.body.password
    var content = req.body.content
    var gender = req.body.gender
    console.log(req.file);
    
    if (req.file) {
        var avatar = req.file.filename
    } else {
        var avatar = '123456789.jpg'
    }
    if (username && pw && gender) {
        var md5 = crypto.createHash("md5");
        var md5Sum = md5.update(pw);
        var password = md5Sum.digest('hex');

        userModel.find({ username: username }, (err, us) => {
            if (us.length > 0) {
                res.json({
                    status: 'fail',
                    msg: "注册失败",
                    data: '用户已经存在'
                })
            } else {
                var user = new userModel({
                    username,
                    password,
                    gender,
                    content,
                    pic: avatar
                })

                user.save((err, success) => {
                    if (err) {
                        res.json({
                            status: 'fail',
                            msg: "注册失败",
                            data: err
                        })
                    } else {
                        res.json({
                            status: 'success',
                            msg: "注册成功",
                            data: success
                        })
                    }
                })

            }
        })

    } else {
        res.json({
            status: 'fail',
            msg: "注册失败",
            data: '123'
        })
    }
})





module.exports = router