//importando o módulo do express
const express = require("express");
//instancia do express
const app = express();
//importamos o body parser no express
const bodyParser = require("body-parser")
//carregando a conexão com o banco de dados
const connection = require("./database/database");
//importando o model
const askModel = require("./database/Ask");


//database
connection.authenticate().then(() => {
    console.log("Conexão feita com o banco de dados")
}).catch((msgErro) => {
    console.log(msgErro);
});

//configuração do EJS
app.set('view engine' , 'ejs');
//arquivos estáticos
app.use(express.static('public'));

//configuração do body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rotas
//rota teste, principal da aplicação 
app.get("/", (req,res) => {
    res.render("index");
});

//rota para o formulário de perguntas 
app.get("/question", (req,res) => {
    res.render("question");
});

//rota para receber os dados dos formulários
app.post("/savequestion", (req,res) => {
    var title = req.body.title;
    var description = req.body.description;
    res.send("Formulário recebido. Título: " + title + " " + "Description: " + description);
});

//porta para rodar a aplicação 
app.listen(8000, () => {
    console.log("Aplicação rodando.");
});

