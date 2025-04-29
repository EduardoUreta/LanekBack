'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Animales } = models;
      this.hasOne(Animales)
    }
  }
  Usuarios.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Ingresa un correo válido"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 12]
      }
    },
    rol: {
      type: DataTypes.ENUM("Usuario", "Admin"),
      defaultValue: "Usuario",
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};