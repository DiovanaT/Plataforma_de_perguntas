//importando o módulo do express
const express = require("express");
//instancia do express
const app = express();

//configuração do EJS
app.set('view engine' , 'ejs');
//arquivos estáticos
app.use(express.static('public'));


//rota teste, principal da aplicação 
app.get("/", (req,res) => {
    res.render("index");
});

//rota para o formulário de perguntas 
app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

//porta para rodar a aplicação 
app.listen(8000, () => {
    console.log("Aplicação rodando.");
});

