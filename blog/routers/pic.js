const express = require('express')
const upload = require('../model/update-articke');
const router = express.Router()

router.post('/',upload.single('pic'),(req,res)=>{

    res.json({data:req.file.filename})
})

module.exports = router