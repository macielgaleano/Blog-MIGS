const { body, validationResult } = require("express-validator");
const passport = require("passport");
const ArticleController = require("./controllers/article_controller");
const AuthorController = require("./controllers/author_controller");
const CommentController = require("./controllers/comment_controller");

//coment
const routes = (app) => {
  app.get("/", (req, res) => {
    ArticleController.getArticles(req, res);
  });

  app.get("/articulo/:id", async (req, res) => {
    ArticleController.getArticle(req, res);
  });

  app.get(
    "/admin",
    (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/login");
      }
    },
    (req, res) => {
      ArticleController.toAdmin(req, res);
    }
  );

  app.get("/login", (req, res) => {
    res.render("login_view");
  });
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/admin",
      failureRedirect: "/login",
    })
  );

  app.get("/register", (req, res) => {
    res.render("register_view");
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post(
    "/admin/crearArticulo",
    [
      body("title").exists(),
      body("contenido").isLength({ min: 50 }),
      body("id").exists(),
    ],
    (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/login");
      }
    },
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
    (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/login");
      }
    },

    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      AuthorController.createAuthor(req, res);
    }
  );

  app.post("/register", (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    AuthorController.createUser(req, res);
  });

  app.get(
    "/admin/:id/eliminar",
    (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/login");
      }
    },
    async (req, res) => {
      ArticleController.delete(req, res);
    }
  );

  app.get(
    "/admin/:id/modificar",
    (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/login");
      }
    },
    async (req, res) => {
      ArticleController.toModify(req, res);
    }
  );

  app.post(
    "/articulo/:id/agregarComentario",
    [body("comentario").exists(), body("autor_comentario").exists()],
    (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/login");
      }
    },
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      CommentController.addComment(req, res);
    }
  );

  app.post(
    "/admin/:id/modificar",
    [],
    (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/login");
      }
    },
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      ArticleController.modify(req, res);
    }
  );
  app.get("/api/articulos", async (req, res) => {
    ArticleController.apiGetArticles(req, res);
  });
  app.get("/api/articulos/:id", async (req, res) => {
    ArticleController.apiGetArticle(req, res);
  });

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email"],
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/admin",
      failureRedirect: "/login",
    })
  );
};
module.exports = {
  routes,
};
