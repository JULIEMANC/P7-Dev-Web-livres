const multer = require("multer");
const sharp = require("sharp");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

//Config du stockage pour les images.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); // Elimine probleme d'espace
    const extension = MIME_TYPES[file.mimetype];
    const uniqueFilename =
    name.split(".")[0] + "-" + Date.now() + "." + extension;
    callback(null, uniqueFilename);
  },
});

const upload = multer({ storage }).single("image");
const resizeImage = (req, res, next) => {
  if(!req.file){
    return next();
  }
 const { originalname,path } = req.file;
  const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = `${originalname.split(".")[0]}_${uniqueName}.webp`;
  
  sharp(path)
    .resize(400, 500, { fit: "inside" })
    .webp({ quality: 80 })
    .toFile(`images/${filename}`)
    .then(() => {
      req.file.name = filename;
      next();
    })
    .catch((err) => {
      console.error(
        "Une erreur est survenue lors du traitement de l'image: ",
        err
      );
      next();
    });
};
module.exports = { upload, resizeImage };
