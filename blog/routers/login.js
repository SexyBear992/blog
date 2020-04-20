const exprerss = require('express')
const userModel = require('../model/userModel');
const router = exprerss.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const tokenModel = require('../model/tokenModel');

router.post('/', (req, res) => {
    var uname = req.body.username;
    var username = req.body.username;
    var pw = req.body.password;

    if (uname && pw) {
        var md5 = crypto.createHash("md5");
        var md5Sum = md5.update(pw);
        var password = md5Sum.digest('hex');

        userModel.find({ username: uname, password: password }, (err, us) => {
            if (us.length > 0) {
                var userinfo = {
                    _id: us[0]._id,
                    username: us[0].username,
                    pic: us[0].pic,
                    content: us[0].content
                }
                var token = jwt.sign(
                    userinfo,
                    'secret',
                    { expiresIn: '7d' }
                )
                // console.log(token);
                var decode = jwt.verify(token, 'secret');

                var person = {
                    username: req.body.username,
                    password,
                    uid: decode._id
                }
                req.session.user = person;
                var userid = us[0].username
                var token2 = new tokenModel({
                    token,
                    userid
                })

                //数据库登录状态
                token2.save((err, tt) => {
                    res.json({
                        status: 'success',
                        msg: "登录成功",
                        data: {
                            token,
                            userid,
                            userinfo
                        }
                    })
                })
            } else {
                res.json({
                    status: 'fail',
                    msg: "登录失败",
                    data: '用户名或者密码错误'
                })
            }
        })
    } else {
        res.json({
            status: 'fail',
            msg: "登录失败",
            data: '缺少参数'
        })
    }
})

module.exports = router