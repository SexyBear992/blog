var mongoose = require('./mongoose')

var seeSchema = mongoose.Schema({
    userid : String,
    time: String,
    articleid : {type: mongoose.Schema.Types.ObjectId, ref: 'article'}
},{collection:'see'})

var seeModel = mongoose.model('see',seeSchema)

module .exports = seeModel