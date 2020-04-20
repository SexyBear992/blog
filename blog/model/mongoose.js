var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/newblog')
mongoose.connect('mongodb://127.0.0.1:27017/newblog',{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});
mongoose.connection.on('connected',function(){
    console.log('已连接');
})

module.exports = mongoose