var express = require('express');

module.exports = function(){
    var app = express();

    //Variáveis de ambiente
    app.set('port', 3000);

    //Middleware
    app.use(express.static('./public'));

    return app;
}