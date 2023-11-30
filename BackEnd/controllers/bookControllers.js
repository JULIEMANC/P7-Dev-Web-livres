const book = require("../models/book");
const multerConf = require(`../middleware/multer-config`);
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");

exports.createBook = async (req, res) => {
  //Pour creer un livre et le mettre sur le
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
    // Construction de l'url de l'image ( http)
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.name
    }`;

    fs.unlinkSync(req.file.path); // supprimer image format mimetype de base dans le dossier images

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

exports.readAllBook = async (req, res) => {
  // Fonction pour recuperer les livres enregistrés sur la page d'accueil
  try {
    const books = await book.find(); //.find() : C'est une méthode de Mongoose qui permet de rechercher des documents dans la collection. Ici, elle est utilisée sans aucun critère de recherche, ce qui signifie qu'elle récupérera tous les documents de la collection.
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        "Erreur lors de la récupération des livres présents dans la base de donée."
      );
  }
};

exports.searchBook = async (req, res) => {
  //clique et recherche livre via ID
  try {
    const bookId = req.params.id;
    const foundBook = await book.findById(bookId); // Recherche du livre par ID dans la base de données

    if (!foundBook) {
      return res.status(404).json("Livre non trouvé.");
    }
    res.status(200).json(foundBook);
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors du téléchargement du livre.");
  }
};


exports.updateBook = async (req, res) => { //le mien
  try {
    const bookId = req.params.id;
    const foundBook = await book.findById(bookId).exec();

    if (!foundBook) {
      return res.status(404).json("Livre non trouvé.");
    }
    let imageUrl = foundBook.imageUrl; // Declare imageUrl using let

    if (req.file) {
      const newImageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.name
      }`;
      fs.unlinkSync(req.file.path);
      imageUrl = newImageUrl;
    }
    //const imagePath = boook.imageUrl.split("/images/")[1];
    //       fs.unlink(`images/${imagePath}`, () => {
    //         book
    //           .updateOne(
    //             { _id: req.params.id },
    //             { ...bookObject, _id: req.params.id }
    //           )
    //           .then(res.status(200).json({ message: "Livre modifié! " }))
    //           .catch((error) => res.status(400).json({ error }));
    //       });
    const bodyBook = req.body;
    const { title, author, genre, year } = bodyBook;

    foundBook.title = title;
    foundBook.author = author;
    foundBook.genre = genre;
    foundBook.year = year;

    const updatedBook = await foundBook.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors de la mise à jour du livre.");
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deleteBook = await book.findByIdAndDelete(bookId);

    if (!deleteBook) {
      return res.status(404).json("Livre non trouvé");
    }

    const imagePath = path.join(
      __dirname,
      "../images",
      deleteBook.imageUrl.split("/images/")[1]
    );
    fs.unlinkSync(imagePath);

    // res.status(200).json({ message: "Livre supprimé avec succès", deleteBook });
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors de la suppression du livre.");
  }
};

exports.bestRating = async (req, res) => {
  //3 livres les mieux notés
  try {
    const books = await book.find().sort({ averageRating: -1 }).limit(3);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors du téléchargement des livres.");
  }
};

exports.gradeBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const ratingGrade = req.body;
    ratingGrade.grade = ratingGrade.rating;
    delete ratingGrade.rating;

    const updatedBook = await book.findByIdAndUpdate(
      bookId,
      { $push: { ratings: ratingGrade } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Livre non trouvé." });
    }
    const totalRatings = updatedBook.ratings.length;
    const totalGrade = updatedBook.ratings.reduce(
      (acc, rating) => acc + rating.grade,
      0
    );
    // Arrondir la moyenne à une décimale
    const noteRat = Math.round((totalGrade / totalRatings) * 10) / 10;

    // Mettre à jour la moyenne des notes dans le livre
    updatedBook.averageRating = noteRat;

    const savedBook = await updatedBook.save();

    res.status(200).json(savedBook);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la notation du livre.", error });
  }
};
