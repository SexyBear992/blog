var mongoose = require('./mongoose')

var likeSchema = mongoose.Schema({
    userid : String,
    articleid : {type: mongoose.Schema.Types.ObjectId, ref: 'article'}
},{collection:'like'})

var likeModel = mongoose.model('like',likeSchema)

module .exports = likeModel