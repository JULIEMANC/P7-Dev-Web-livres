const book = require("../models/book");
const multerConf = require(`../middleware/multer-config`);
const fs = require("fs");

exports.createBook = async (req, res) => {
  try {
    const bodyBook = JSON.parse(req.body.book);
    const yearRegExp = /^(?:2[\d]{3}|1[\d]{3}|[\d]{3}|[\d]{2}|[\d]{1})$/;
    const year = bodyBook.year.toString();

    if (!yearRegExp.test(year)) {
      return res.status(400).json("Année non valide !");
    }
    if (!req.file) {
      return res.status(400).json("Veuillez télécharger une image !");
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.name
    }`;

    fs.unlinkSync(req.file.path);
    const newBook = new book({
      ...bodyBook,
      imageUrl: imageUrl,
    });

 const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors de la création du livre");
  }
};
