const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //pr hacher les mots de passe
const userControllers = require("./controllers/usersControllers")
mongoose
  .connect(
    "mongodb+srv://juliemancino38:fQt84jNzPLEkHrxp@clusterbook.nrx9bqn.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Connexion à MongoDB échouée !", error));

const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post(`/api/stuff`, (req, res, next) => {
  console.log(req.body);
});

/*Pour POST  SIGNUP */ /*Route d'inscription */
app.post(`/api/auth/signup`,userControllers.createUser );
app.post('/api/auth/login', userControllers.loginUser);

module.exports = app;
