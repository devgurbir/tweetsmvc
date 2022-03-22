const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"))
    },
    filename: function (req, file, callback){
        const uniqueFilename = String(Date.now()) + Math.round(Math.random() * 1000)
        const uniqueFilenameTwo = 'abc' + Math.round(Math.random() * 1000);
        callback(null, uniqueFilename  + file.originalname)
    }
})

const upload = multer({
    storage: storage
    // can also do fileFilter
})


module.exports = upload