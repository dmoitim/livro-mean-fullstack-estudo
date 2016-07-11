var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

//ObjectID do contato
var _idProcurado = new ObjectID("578103ac3d61fd048f944d9e");

MongoClient.connect(
    'mongodb://127.0.0.1:27017/contatooh',
    function(erro, db){
        if(erro) throw erro;
        var query = {"_id": _idProcurado}
        db.collection('contatos').findOne(query,
            function(erro, contato){
                if(erro) throw erro;
                console.log(contato);
            }
        );
    }
);