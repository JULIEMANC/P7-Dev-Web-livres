const multer =require('multer');
const MIME_TYPES={
'image/jpg': 'jpg',
'image/jpeg':'jpg',
'image/png': 'png'
};

//Config du stockage pour les images.
const storage =multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null, 'images')
    },
    filename:(req, file, callback)=>{
        const name= file.originalname.split('').join('_'); // Elimine probleme d'espace
const extension =MIME_TYPES[file.mimetype];
callback(null, name + Date.now() + '.'+extension); // Géneration unique name
    }
});

module.exports=multer({storage}).single('images');