const Model = require("../models/index");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");

const UserController = {};

UserController.createAuthor = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync("root", salt);

  console.log(req.isAuthenticated());
  Model.User.create({
    nombre: req.body.name,
    apellido: req.body.surname,
    email: req.body.email,
    user: "admin",
    password: hash,
  });
  res.redirect("/admin");
};

UserController.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  //console.log(req.body);
  Model.User.create({
    nombre: req.body.name,
    apellido: req.body.surname,
    email: req.body.email,
    user: req.body.email,
    password: hash,
  });
  res.redirect("/login");
};

module.exports = UserController;
