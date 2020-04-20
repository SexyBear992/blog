var mongoose = require('./mongoose')

var thumbsSchema = mongoose.Schema({
    userid : String,
    articleid : {type: mongoose.Schema.Types.ObjectId, ref: 'article'}
},{collection:'thumbs'})

var thumbsModel = mongoose.model('thumbs',thumbsSchema)

module .exports = thumbsModel