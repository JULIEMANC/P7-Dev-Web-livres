/*Création d'un espace utilisateur*/
const User = require("../models/users"); // Si que vous ayez un modèle User défini
const bcrypt = require("bcrypt"); //pr hacher les mots de passe
const jwt = require(`jsonwebtoken`);
const dotenv = require("dotenv");

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Veuillez entrez un email ou/et mot de passe" });
    }
    // console.log(email + "  " + password)
    const hashedPassword = await bcrypt.hash(password, 10); // hacher le mdp

    const users = new User({
      email: email,
      password: hashedPassword,
    });

    users.save(); // enregistre l'utilisateur ds la base de données
    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur." });
  }
};

//*--------------------------------------------------------------------------------------//
require("dotenv").config();
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "L'utilisateur n'existe pas." });
    }
    console.log("ok");
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion de l'utilisateur." });
  }
};
