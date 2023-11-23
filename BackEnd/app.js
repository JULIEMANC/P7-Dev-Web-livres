const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const rootsUser=require("./roots/rootsUser");
const rootsBook=require("./roots/rootsBook");
const path = require('path');

dotenv.config()
app.use(express.json());

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
app.use(`/api/books/`, rootsBook); //Dossier Books roots

app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;
