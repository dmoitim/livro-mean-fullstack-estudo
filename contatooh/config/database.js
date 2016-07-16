var mongoose = require('mongoose');

module.exports = function(uri){
    //Realiza a conex�o e configura o pool
    mongoose.connect(uri, {server: {poolSize: 15}});

    //Produ��o: false
    mongoose.set('debug', false);

    mongoose.connection.on('connected', function(){
        console.log('Mongoose conectado em '+uri);
    });

    mongoose.connection.on('disconnected', function(){
        console.log('Mongoose desconectado de '+uri);
    });

    mongoose.connection.on('', function(erro){
        console.log('Mongoose com erro em '+erro);
    });

    //Desconecta quando a aplica��o � encerrada (CTRL + C por exemplo)
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Mongoose desconectado pelo t�rmino da aplica��o');
            //0 indica que a fincaliza��o ocorreu sem erros
            process.exit(0);
        });
    });
};