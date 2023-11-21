const express = require('express');
const router = express.Router();
const bookControllers = require("../controllers/bookControllers");
const authenticateToken =require ("../middleware/authentificateToken");
const {upload, resizeImage} = require("../middleware/multer-config");

router.post(`/`,authenticateToken,upload,resizeImage, bookControllers.createBook);// work
router.get(`/`, bookControllers.readAllBook);//work
router.get(`/:id`, bookControllers.searchBook);// work

// router.put(`/:id`,bookControllers.updateBook);
// fin etape 1


//etape 2
// router.delete(`/:id`, bookControllers.deleteBook);
// router.post(`/:id/rating`, bookControllers.gradeBook);
// router.get(`/bestrating`,bookControllers.bestRating);

module.exports=router;