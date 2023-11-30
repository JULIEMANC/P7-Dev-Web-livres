const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodeToken.userId;
    req.userId= userId;

    next();
  } catch (err) {
    res.status(403).json({ message: "Token non valide.", err });
  }
};
