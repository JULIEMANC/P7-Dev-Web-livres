const User = require("../models/users"); // Si que vous ayez un modèle User défini
const bcrypt = require("bcrypt"); //pr hacher les mots de passe
const jwt = require(`jsonwebtoken`);

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Veuillez entrez un email ou/et mot de passe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // hacher le mdp

    const users = new User({
      email: email,
      password: hashedPassword,
    });

    users.save();
    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur."});
  }
};
//*--------------------------------------------------------------------------------------//
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs du formulaire." });
    }
// Recherche de l'utilisateur dans la base de données par son email
    const existingUser= await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect.", error: "Email ou mot de passe incorrect." });
    }
 // Vérification de la validité du mot de passe en comparant avec celui enregistré
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect.", error: "Email ou mot de passe incorrect." });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const response = {"userId": existingUser._id,
                      "token": token}

    return res.status(200).json(response);
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion de l'utilisateur.", error: error.message });
  }
};
