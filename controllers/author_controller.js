const Model = require("../models/index");

<<<<<<< HEAD:controllers/user_controller.js
<<<<<<< HEAD:controllers/user_controller.js
const UserController = {};
=======
const AuthorController = {};
>>>>>>> parent of de836da... Cambia autor por usuario:controllers/author_controller.js

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
=======
const AuthorController = Model.Author;
>>>>>>> parent of aad1a9e... Paso de archivos:controllers/author_controller.js

module.exports = AuthorController;
