var mongoose = require('./mongoose')

var followSchema = mongoose.Schema({
    userid : String,
    followid : {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
},{collection:'follow'})

var followModel = mongoose.model('follow',followSchema)

module .exports = followModel