const User = require("../models/users");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto"); // generateur de clefs secrete
// const secretKey = crypto.randomBytes(32).toString("hex");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé." });
    pasww;
  }
  jwt.verify(token, "votre cles secur", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token non valide." });
    }
    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
