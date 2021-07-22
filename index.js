//importando o módulo do express
const express = require("express");
//instancia do express
const app = express();
//importamos o body parser no express
const bodyParser = require("body-parser")
//carregando a conexão com o banco de dados
const connection = require("./database/database");
//importando o model sequelize
//model que representa a tabela de perguntas
const asksModel = require("./database/Asks");
//importando a resposta
const Answer = require("./database/Answer");


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
//rota principal da aplicação 
app.get("/", (req,res) => {
    asksModel.findAll({raw: true, order: [
        ['id','DESC']
    ]}).then(asks => {
        //console.log(asks);
        res.render("index", {
            asks: asks,
        });
        //console.log(asks)
    });
    
});

//rota para o formulário de perguntas 
app.get("/question", (req,res) => {
    res.render("question");
});

//rota para receber os dados dos formulários
app.post("/savequestion", (req,res) => {
    var title = req.body.title;
    var description = req.body.description;
    //para salvar o dado na tabela, pegamos o model da tabela
    //e chamamos o create, que ele irá salvar
    asksModel.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    });
});

//rota para entrar na pergunta
app.get("/question/:id", (req,res) => {
    var id = req.params.id;
    asksModel.findOne({
        where: {id: id}
    }).then(asks => {
        if(asks != undefined){ //achou a pergunta

            Answer.findAll({
                where: {questionId: id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(answer => {
                res.render("questions", {
                asks: asks,
                answer: answer
            });
            });
        }else{//não achou a pergunta
            res.redirect("/");
        }
    });
});

//rota para receber as respostas
app.post("/answer", (req,res) => {
    var content = req.body.content;
    var questionId = req.body.questionId;
    Answer.create({
        content: content,
        questionId: questionId
        
    }).then(() => {
        res.redirect("/question/" + questionId);
        console.log(questionId);
    });
    console.log(questionId);

});


//porta para rodar a aplicação 
app.listen(8000, () => {
    console.log("Aplicação rodando.");
});

