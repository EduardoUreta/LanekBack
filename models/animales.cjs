'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animales extends Model {
    static associate(models) {
      const { Usuarios } = models;
      this.belongsTo(Usuarios, {
        onDelete: 'CASCADE'
      });
    }
  }
  Animales.init({
    animalFavorito: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 15]
      }
    },
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UsuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios', 
        key: 'id',
      }, 
    }
  }, {
    sequelize,
    modelName: 'Animales',
  });
  return Animales;
};