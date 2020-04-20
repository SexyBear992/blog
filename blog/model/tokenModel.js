var mongoose = require('./mongoose');

var tokenSchema = mongoose.Schema({  
    token:String,
    userid:String
},{collection:'tokens'})  
var tokenModel = mongoose.model('tokens',tokenSchema);

module.exports = tokenModel;