const Model = require("../models/index");
const MailController = require("./mail_controller");
const passport = require("passport");
const formidable = require("formidable");
const path = require("path");
const moment = require("moment");

const ArticleController = {};

ArticleController.getArticles = async (req, res) => {
  const isLogged = req.isAuthenticated();
  let user;

  if (isLogged) {
    user = req.session.passport.user;
  } else {
    user = false;
  }
  const articles = await Model.Article.findAll({
    include: [Model.User, Model.Comment],
    order: ["fecha_creacion"],
  });

  res.render("home_view", { articles, user });
};

ArticleController.toAdmin = async (req, res) => {
  console.log("sesion user", req.session.passport.user);
  let user;
  if (req.isAuthenticated()) {
    user = req.session.passport.user;
  } else {
    user = false;
  }
  if (user[0].user === "root") {
    res.render("admin.view.ejs", {
      articles: await Model.Article.findAll({}),
      users: await Model.User.findAll({}),
      user,
    });
  } else {
    res.render("admin.view.ejs", {
      articles: await Model.Article.findAll({
        where: {
          id: user[0].id,
        },
      }),
      user,
    });
  }
};

ArticleController.createArticle = async (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: path.dirname(__dirname) + "/public/img",
    keepExtensions: true,
  });

  form.keepFilenames = true;

  form.parse(req, async (err, fields, files) => {
    const { title, contenido, id } = fields;
    const fecha_creacion = moment().format();
    const imagen = `img/${files.imagen.name}`;

    await Model.Article.create({
      titulo: title,
      contenido: contenido,
      fecha_creacion: fecha_creacion,
      imagen: "/img/" + path.basename(files.imagen.path),
      UserId: id,
    });

    await MailController.sendMail(title, contenido, fecha_creacion);

    res.redirect("/admin");
  });
};

ArticleController.getArticle = async (req, res) => {
  const isLogged = req.isAuthenticated();
  let user;

  if (isLogged) {
    user = req.session.passport.user;
  } else {
    user = false;
  }
  const article = await Model.Article.findOne({
    where: {
      id: req.params.id,
    },
    include: Model.User,
  });
  const comments = await Model.Comment.findAll({
    where: {
      ArticleId: req.params.id,
    },
  });

  const user_id = article.user_id;
  res.render("article_view", { article, user, comments, user_id });
};

ArticleController.delete = async (req, res) => {
  Model.Article.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/admin");
};

ArticleController.toModify = async (req, res) => {
  const article = await Model.Article.findOne({
    where: {
      id: req.params.id,
    },
    include: Model.User,
  });
  const user = article.User;
  res.render("modify_view", { article });
};

ArticleController.apiGetArticles = async (req, res) => {
  const articles = await Model.Article.findAll({
    include: [Model.User, Model.Comment],
    order: ["fecha_creacion"],
  });
  res.send(articles);
};

ArticleController.apiGetArticle = async (req, res) => {
  const article = await Model.Article.findOne({
    where: { id: req.params.id },
    include: [Model.User, Model.Comment],
    order: ["fecha_creacion"],
  });
  res.send(article);
};

ArticleController.modify = async (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: path.dirname(__dirname) + "/public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { titulo, contenido } = fields;
    const fecha_creacion = moment().format();
    const id = req.params.id;
    const imagen = "/img/" + path.basename(files.imagen.path);
    await Model.Article.update(
      { titulo, contenido, fecha_creacion, imagen },
      { where: { id: id } }
    );
    res.redirect("/admin");
  });
};

module.exports = ArticleController;
