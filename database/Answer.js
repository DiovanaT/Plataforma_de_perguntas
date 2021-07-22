//importando o sequelize
const Sequelize = require("sequelize");
//importar a conexão com o bando de dados
const connection = require("./database");

const Answer = connection.define('answer', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Answer.sync({force: false}).then(() => {});
module.exports = Answer;