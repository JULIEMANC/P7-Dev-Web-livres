const book = require("../models/book");
const multerConf = require(`../middleware/multer-config`);

exports.createBook = async (req, res) => {
  try {
 //const bodyBook = JSON.parse(req.body);
    // ajouter .book ds parenthèse apres
const bodyBook = req.body;
    //const yearRegExp =/^(145[5-9]|14[6-9][0-9]|1[5-9][0-9]{2}|20[01][0-9]|202[0-4])$/;
    //const year = bodyBook.year.toString();

    //   if (!yearRegExp.test(year)) {
    //     return res.status(400).json("Année non valide !");
    //   }
    const newBook = new book({
     ...bodyBook,

      // imageUrl: req.file ? req.file.path : null,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors de la création du livre");
  }
};
