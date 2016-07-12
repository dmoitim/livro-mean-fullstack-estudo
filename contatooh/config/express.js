var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function() {
    var app = express();

    //Variáveis de ambiente
    app.set('port', 3000);

    //Middleware
    app.use(express.static('./public'));

    //Configuração do template engine EJS
    app.set('view engine', 'ejs');
    app.set('views','./app/views');
    // novos middlewares
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')())

    app.use(cookieParser());
    app.use(session(
        {secret: 'homem avestruz',
         resave: true,
         saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    //Carregamento das rotas
    consign({cwd: 'app'})
    .include('models')
    .then('controllers')
    .then('routes')
    .into(app);

    return app;
};