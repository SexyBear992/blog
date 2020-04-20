var multer = require('multer');
//修改上传图片名字
var storage = multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,'./public/images/pic')
    },
    filename:function(req,file,cd){
        var oname = file.originalname;
        var arr = oname.split('.');
        var suffix = arr[arr.length-1];

        cd(null,Date.now()+'.'+suffix)
    }
})

var upload = multer({storage:storage})

module.exports = upload