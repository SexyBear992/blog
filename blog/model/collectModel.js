var mongoose = require('./mongoose')

var collectSchema = mongoose.Schema({
    userid : String,
    time:String,
    articleid : {type: mongoose.Schema.Types.ObjectId, ref: 'article'}
},{collection:'collect'})

var collectModel = mongoose.model('collect',collectSchema)

module .exports = collectModel