const { Sequelize, DataTypes, Model } = require("sequelize");
const ArticleModel = require("./article_model");
const AuthorModel = require("./author_model");
const CommentModel = require("./comment_model");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
  }
);

const User = AuthorModel(sequelize, DataTypes, Model);
const Article = ArticleModel(sequelize, DataTypes, Model);
const Comment = CommentModel(sequelize, DataTypes, Model);

Article.hasMany(Comment);
Comment.belongsTo(Article);
User.hasMany(Article);
Article.belongsTo(User);

module.exports = {
  sequelize,
  Sequelize,
  Article,
  User,
  Comment,
};
