//importando o sequelize
const Sequelize = require("sequelize");
//importar a conexão com o bando de dados
const connection = require("./database");

const Asks = connection.define('asks', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Asks.sync({force: false}).then(() => {});