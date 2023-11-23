const express = require("express");
const router = express.Router();
const bookControllers = require("../controllers/bookControllers");
const authenticateToken = require("../middleware/authentificateToken");
const { upload, resizeImage } = require("../middleware/multer-config");

router.post( `/`,authenticateToken, upload,resizeImage,bookControllers.createBook);
router.get(`/`, bookControllers.readAllBook); 
router.get(`/bestrating`,bookControllers.bestRating);
router.get(`/:id`, bookControllers.searchBook); 

router.put(`/:id`, bookControllers.updateBook);

router.delete(`/:id`, bookControllers.deleteBook);
router.post(`/:id/rating`, bookControllers.gradeBook);

module.exports = router;
