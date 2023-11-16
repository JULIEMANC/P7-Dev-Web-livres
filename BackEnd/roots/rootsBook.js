const express = require('express');
const router = express.Router();
const bookControllers = require("../controllers/bookControllers");

router.post(`/`, bookControllers.createBook);

module.exports=router;