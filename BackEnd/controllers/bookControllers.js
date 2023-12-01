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

exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const foundBook = await book.findById(bookId).exec();

    if (!foundBook) {
      return res.status(404).json("Livre non trouvé.");
    }
    const oldImagePath =`images/${foundBook.imageUrl.split("/images/")[1]}`;

    const { title, author, genre, year } = req.body;
    if (title !== undefined) {
      foundBook.title = title;
    }
    if (author !== undefined) {
      foundBook.author = author;
    }
    if (genre !== undefined) {
      foundBook.genre = genre;
    }
    if (year !== undefined) {
      foundBook.year = year;
    }

    if (req.file) {
      const newImageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.name}`;
      foundBook.imageUrl = newImageUrl;

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    const updateBook = await foundBook.save();

    res.status(200).json(updateBook);
    fs.unlinkSync(req.file.path);

  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors de la mise à jour du livre.");
  }
};
exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
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

    // Supprimer le livre de la base de données
    await book.deleteOne({ _id: bookId });

    res.status(200).json({ message: "Livre supprimé avec succès" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue", error });
  }

  // Ajouter une redirection du côté client après un court délai (par exemple, 1 seconde)
  setTimeout(() => {
    res.redirect("/");
  }, 1000);
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
