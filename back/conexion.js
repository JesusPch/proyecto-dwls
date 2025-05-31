const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './proyecto.sqlite'
});

module.exports = sequelize;