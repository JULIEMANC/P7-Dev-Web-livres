const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const rootsUser=require("./roots/rootsUser");

app.use(express.json());
dotenv.config()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD"
  );
  next();
});

mongoose
  .connect(
    process.env.MONGODB
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Connexion à MongoDB échouée !", error));


app.use(`/api/auth/`,rootsUser); // Dossier Roots

module.exports = app;
