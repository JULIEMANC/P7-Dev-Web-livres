const express = require('express');
const router = express.Router();
const bookControllers = require("../controllers/bookControllers");
// const authenticateToken =require ("../middleware/authentificateToken");
const {upload, resizeImage} = require("../middleware/multer-config");

router.post(`/`,upload,resizeImage, bookControllers.createBook);

module.exports=router;