const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    //'image/jfif': 'jfif'
}

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'public/images/classes');
    },
    filename: (req, file, callback)=>{
        var name = Math.floor(Math.random() * Math.floor(1524587)).toString();
        name += Math.floor(Math.random() * Math.floor(8546287)).toString();
        name += Math.floor(Math.random() * Math.floor(7122287)).toString();
        name += Math.floor(Math.random() * Math.floor(8923587)).toString();
        name+=Date.now()+".";

        const extension = MIME_TYPES[file.mimetype];
        name += extension;

        callback(null, name);
    }
})

module.exports = multer({storage}).single('image');