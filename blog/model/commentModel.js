var mongoose = require('./mongoose')

var commentSchema = mongoose.Schema({
    userid : String,
    username : String,
    author : String,
    avatar : String,
    articleid : {type: mongoose.Schema.Types.ObjectId, ref: 'article'},
    content : String ,
    time : String ,
    like : Number,
    replylen : Number 

},{commention:'comment'})

var commentModel = mongoose.model('comment',commentSchema)

module .exports = commentModel