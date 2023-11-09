/*Création d'un espace utilisateur*/ 
const User = require("../models/users"); // Si que vous ayez un modèle User défini

exports.createUser = async (req, res) => {
try {
    const { email, password } = req.body;

    const existingUser = User.findOne({ email }); //voir si la personne est déjà enregistrée
    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà." });
    }
    const hashedPassword = bcrypt.hash(password, 10); // hacher le mdp
   
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    newUser.save(); // enregistre l'utilisateur ds la base de données

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur." });
  }};