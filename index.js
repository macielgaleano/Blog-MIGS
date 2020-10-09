require("dotenv").config();
//const analyticsLib = require("analytics").default;
//const googleAnalytics = require("@analytics/google-analytics").default;
const {
  db_LoadArticles,
  db_LoadAuthors,
  db_LoadComments,
} = require("./seeder.js");
const express = require("express");
const { routes } = require("./routes");
const {
  sequelize,
  Sequelize,
  Article,
  Author,
  Comment,
} = require("./models/index");
const session = require("express-session");
const passport = require("passport");
//const { Model } = require("sequelize/types");
const Modelo = require("./models/index");
const LocalStrategy = require("passport-local").Strategy;
const { authenticate, authenticateFB } = require("./authentication");

const app = express();
const port = process.env.APP_PORT;

// Configuracion app
app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs", "formidable");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "Elmecacodigosecretisimo",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

authenticate();
//authenticate();
authenticateFB();

// Sequelize

sequelize
  .sync({ force: true })
  .then(() => {})
  /// Cargo articulos a la tabla
  .then(() => db_LoadAuthors(Author, 5))
  .then(() => db_LoadArticles(Article, 5))
  .then(() => db_LoadComments(Comment, 10))
  .catch((error) => {
    console.log("echoTestSequelizeError: ", error);
  });

routes(app);

app.listen(port, () => console.log(`Servidor escuchando en puerto: ${port}`));

// test completado de los dos lados ;) //
