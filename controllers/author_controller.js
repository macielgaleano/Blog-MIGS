const Model = require("../models/index");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");

const AuthorController = {};

AuthorController.createAuthor = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync("root", salt);

  console.log(req.isAuthenticated());
  Model.Author.create({
    nombre: req.body.name,
    apellido: req.body.surname,
    email: req.body.email,
    user: "admin",
    password: hash,
  });
  res.redirect("/admin");
};

AuthorController.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  //console.log(req.body);
  Model.Author.create({
    nombre: req.body.name,
    apellido: req.body.surname,
    email: req.body.email,
    user: req.body.email,
    password: hash,
  });
  res.redirect("/login");
};

module.exports = AuthorController;
