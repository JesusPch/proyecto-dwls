const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const Clientes = sequelize.define('clientes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // ✅ Esto es importante
  },
  nombre: { type: DataTypes.STRING },
  apellidopaterno: { type: DataTypes.STRING },
  apellidomaterno: { type: DataTypes.STRING },
  edad: { type: DataTypes.INTEGER },
  sexo: { type: DataTypes.STRING },
}, {
  timestamps: false,
});

module.exports = Clientes;
