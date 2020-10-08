const moment = require("moment");
const { body, validationResult } = require("express-validator");
var path = require("path");
const ArticleController = require("./controllers/article_controller");
const AuthorController = require("./controllers/author_controller");
const CommentController = require("./controllers/comment_controller");
const MailController = require("./controllers/mail_controller");
const formidable = require("formidable");
var fs = require("fs");

const routes = (app) => {
  app.get("/", (req, res) => {
    ArticleController.getArticles(req, res);
  });

  app.get("/articulo/:id", async (req, res) => {
    ArticleController.getArticle(req, res);
  });

  app.get("/admin", ArticleController.toAdmin);

  app.post(
    "/admin/crearArticulo",
    [
      body("title").exists(),
      body("contenido").isLength({ min: 50 }),
      body("id").exists(),
    ],
    (req, res) => {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }
      ArticleController.createArticle(req, res);
    }
  );

  app.post(
    "/admin/crearAutor",
    [body("surname").isLength({ min: 5 }), body("email").isEmail()],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      AuthorController.createAuthor(req, res);
    }
  );

  app.get("/admin/:id/eliminar", async (req, res) => {
    ArticleController.delete(req, res);
  });

  app.get("/admin/:id/modificar", async (req, res) => {
    ArticleController.toModify(req, res);
  });

  app.post(
    "/articulo/:id/agregarComentario",
    [body("comentario").exists(), body("autor_comentario").exists()],
    async (req, res) => {
      console.log(req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      CommentController.addComment(req, res);
    }
  );

  app.post("/admin/:id/modificar", [], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    ArticleController.modify(req, res);
  });
  app.get("/api/articulos", async (req, res) => {
    ArticleController.apiGetArticles(req, res);
  });
  app.get("/api/articulos/:id", async (req, res) => {
    ArticleController.apiGetArticle(req, res);
  });
};
module.exports = {
  routes,
};
