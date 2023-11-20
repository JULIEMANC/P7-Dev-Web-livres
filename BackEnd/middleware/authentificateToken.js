const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
// const crypto = require("crypto"); // generateur de clefs secrete
// const secretKey = crypto.randomBytes(32).toString("hex");
// const authenticateToken = (req, res, next) => {
//   try {
//     const token = req.header("Authorization");

//     if (!token) {
//       return res.status(401).json({ message: "Accès non autorisé." });
//     }
//     // console.log( "okbrothermyfri", process.env.JWT_SECRET)
//      jwt.verify(token, process.env.JWT_SECRET);
//     // console.log("User ID from token:", userId);
//     req.user =test;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Token non valide." });
//   }
// };

// module.exports = authenticateToken;

module.exports=(req, res, next)=>{
  try{
const token = req.headers.authorization.split(' ')[1];
const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
const userId = decodeToken.userId;

req.auth={userId : userId};
next();

  }catch(err){
res.status(403).json({message : "Token non valide.", err});
  }
}