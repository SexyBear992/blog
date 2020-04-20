var mongoose = require('./mongoose')
//用户信息的Model
var userSchema = mongoose.Schema({
    username : String,
    password : String,
    gender : String,
    pic : String,
    content : String,
},{collection:'user'});

var userModel = mongoose.model('user',userSchema);

module.exports = userModel;