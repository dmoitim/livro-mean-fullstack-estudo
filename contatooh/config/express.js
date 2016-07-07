var express = require('express');
var home = require('../app/routes/home');

module.exports = function(){
    var app = express();

    //Variáveis de ambiente
    app.set('port', 3000);

    //Middleware
    app.use(express.static('./public'));

    //Configuração do template engine EJS
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //Rotas
    home(app);

    return app;
}