const Article = (sequelize, DataTypes, Model) => {
  class Article extends Model {}
  Article.init(
    {
      titulo: { type: DataTypes.STRING(100), allowNull: false },
      contenido: { type: DataTypes.STRING(2000), allowNull: false },
      fecha_creacion: { type: DataTypes.DATE, allowNull: false },
      imagen: DataTypes.STRING(10000),
    },
    {
      sequelize,
      modelName: "Article",
      timestamps: false,
    }
  );

  return Article;
};

module.exports = Article;
