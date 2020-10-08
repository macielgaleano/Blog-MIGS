var faker = require("faker");
faker.locale = "es_MX";
var bcrypt = require("bcryptjs");

const db_LoadArticles = async (Article, quantity) => {
  let articles2 = [];
  let articles_count = await Article.count({});
  if (await !articles_count) {
    for (let i = 0; i < quantity; i++) {
      articles2.push({
        titulo: faker.name.title(),
        contenido: faker.lorem.words(100),
        fecha_creacion: faker.date.recent(),
        // imagen: `${faker.image.nature()}?random=${Date.now()}`,
        imagen: faker.image.avatar(),
        AuthorId: faker.random.arrayElement([1, 2, 3]),
      });
    }
    Article.bulkCreate(articles2);
  }
};

const db_LoadAuthors = async (User, quantity) => {
  {
    let autores = [];
    let authors_count = await User.count({});

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("root", salt);

    if (await !authors_count) {
      for (let i = 0; i < quantity; i++) {
        autores.push({
          nombre: faker.name.firstName(),
          user: "root",
          password: hash,
          apellido: faker.name.lastName(),
          email: faker.internet.email(),
        });
      }
      User.bulkCreate(autores);
    }
  }
};

const db_LoadComments = async (Comment, quantity) => {
  {
    let comments = [];
    let comments_count = await Comment.count({});
    if (await !comments_count) {
      for (let i = 0; i < quantity; i++) {
        comments.push({
          comentario: faker.lorem.words(15),
          autor_comentario: faker.name.firstName(), // + faker.name.lastName(),
          fecha_comentario: faker.date.recent(),
          ArticleId: faker.random.arrayElement([1, 2, 3, 4, 5]),
        });
      }
      Comment.bulkCreate(comments);
    }
  }
};

module.exports = { db_LoadArticles, db_LoadAuthors, db_LoadComments };
