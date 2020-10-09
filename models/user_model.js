const User = (sequelize, DataTypes, Model) => {
  class User extends Model {}
  User.init(
    {
      nombre: { type: DataTypes.STRING(100), allowNull: false },
      apellido: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: true },
      password: { type: DataTypes.STRING(100), allowNull: true },
      roleId: { type: DataTypes.INTEGER(), allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};

module.exports = User;
