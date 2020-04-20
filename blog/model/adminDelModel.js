var mongoose = require('./mongoose')

var adminDelSchema = mongoose.Schema({
    admin: String,
    content: String,
    articleid: { type: mongoose.Schema.Types.ObjectId, ref: 'article' },
    author: String
}, { commention: 'adminDel' })

var adminDelModel = mongoose.model('adminDel', adminDelSchema)

module.exports = adminDelModel