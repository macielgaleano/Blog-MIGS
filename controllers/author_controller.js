const Model = require("../models/index");
const { body, validationResult } = require("express-validator");

const AuthorController = {};

AuthorController.createAuthor = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  Model.Author.create({
    nombre: req.body.name,
    apellido: req.body.surname,
    email: req.body.email,
  });
  res.redirect("/admin");
};

module.exports = AuthorController;
