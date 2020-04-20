var mongoose = require('./mongoose')
//发表文章的Model

var articleSchema = mongoose.Schema({
    title: String,
    content: String,
    pic: String,
    avatar: String,
    author: String,
    time: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    share: String,
    len: Number,
    see: Number,
    like: Number,
    col: Number
}, { collection: 'article' })

var articleModel = mongoose.model('article', articleSchema)

module.exports = articleModel;