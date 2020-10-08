const moment = require("moment");
const ArticleController = require("./controllers/article_controller");
const AuthorController = require("./controllers/author_controller");
const CommentController = require("./controllers/comment_controller");
const formidable = require("formidable");
var fs = require("fs");

const routes = (app) => {
  app.get("/", async (req, res) => {
    const articles = await ArticleController.findAll({
      include: AuthorController,
      order: ["fecha_creacion"],
    });
    res.render("home_view", { articles });
  });

  app.get("/articulo/:id", async (req, res) => {
    const article = await ArticleController.findOne({
      where: {
        id: req.params.id,
      },
      include: AuthorController,
    });
    const comments = await CommentController.findAll({
      where: {
        ArticleId: req.params.id,
      },
    });
    console.log(comments);
    const author = article.Author;
    res.render("article_view", { article, author, comments });
  });

  app.get("/admin", async (req, res) => {
    res.render("admin.view.ejs", {
      articles: await ArticleController.findAll({}),
      authors: await AuthorController.findAll({}),
    });
  });

  app.post("/admin/crearAutor", async (req, res) => {
    console.log(req.body);
    AuthorController.create({
      nombre: req.body.name,
      apellido: req.body.surname,
      email: req.body.email,
    });
    res.redirect("/admin");
  });

  app.post("/admin/crearArticulo", async (req, res) => {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/public/img",
      keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
      console.log(req.body);
    });
    res.redirect("/admin");
  });

  app.get("/admin/:id/eliminar", async (req, res) => {
    ArticleController.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/admin");
  });

  app.get("/admin/:id/modificar", async (req, res) => {
    const article = await ArticleController.findOne({
      where: {
        id: req.params.id,
      },
      include: AuthorController,
    });
    const author = article.Author;
    res.render("modify_view", { article });
  });

  app.post("/articulo/agregarComentario", async (req, res) => {
    console.log(req.body);
  });

  app.post("/admin/:id/modificar", (req, res) => {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const { titulo, contenido } = fields;
      const fecha_creacion = moment().format();
      const id = req.params.id;
      const imagen = `img/${files.imagen.name}`;
      await ArticleController.update(
        { titulo, contenido, fecha_creacion, imagen },
        { where: { id: id } }
      );
      res.redirect("/admin");
    });
  });
};

module.exports = {
  routes,
};
