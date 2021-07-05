//importando o módulo
const Sequelize = require('sequelize');

//construção da conexão
const connection = new Sequelize('plataforma_de_perguntas','root','Geladeira2021', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;