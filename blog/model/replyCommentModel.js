var mongoose = require('./mongoose')

var replySchema = mongoose.Schema({
    userid : String,
    articleid : String,
    replyid : {type: mongoose.Schema.Types.ObjectId, ref: 'comments'},
    replyuser : String,
    content : String ,
    time : String ,
    like : Number,
    replylen : Number 

},{commention:'reply'})

var replyModel = mongoose.model('reply',replySchema)

module .exports = replyModel