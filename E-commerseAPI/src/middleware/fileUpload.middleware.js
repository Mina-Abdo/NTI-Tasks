const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null , "src/images")
    },
    filename:function(req,file,cb){
        const imgName = file.originalname
        cb(null , imgName)
    }
})
const upload = multer({
    storage,
    limits:{fileSize:2000000}
})
module.exports = upload