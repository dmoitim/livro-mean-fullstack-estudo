module.exports = function(app){
    var sanitize = require('mongo-sanitize');

    var Contato = app.models.contato;
    var controller = {}

    controller.listaContatos = function(req,res){
        Contato.find().populate('emergencia').exec()
        .then(
            function(contatos){
                res.json(contatos);
            },
            function(erro){
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };

    controller.obtemContato = function(req,res){
        var _id = sanitize(req.params.id);
        Contato.findById(_id).exec()
        .then(
            function(contato){
                //Linhas comentadas pois o código original não está funcionando, substitui pelas abaixo
                //if (!contato) throw new Error("Contato não encontrado");
                //res.json(contato);

                if(!contato) {
                    res.status(404).json("Contato não encontrado.");
                } else {
                    res.json(contato);
                }
            },
            function(erro){
                console.log(erro);
                res.status(404).json(erro);
            }
        );
    };

    controller.removeContato = function(req,res){
        var _id = sanitize(req.params.id);
        Contato.remove({"_id": _id}).exec()
        .then(
            function(){
                res.status(204).end();
            },
            function(erro){
                console.error(erro);
            }
        );
    };

    controller.salvaContato = function(req,res){
        var _id = sanitize(req.body._id);

        /*
            Seleciona apenas os parâmetros:
            nome, email e emergencia
        */

        var dados = {
            "nome" : req.body.nome,
            "email" : req.body.email,
            "emergencia" : req.body.emergencia || null //Caso não tenha sido selecionado nenhum contato como emergência, seta nulo
        };

        if(_id){ //Update
            Contato.findByIdAndUpdate(_id, dados).exec()
            .then(
                function(contato){
                    res.json(contato);
                },
                function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
        }else{ //Insert
            Contato.create(dados)
            .then(
                function(contato){
                    res.status(201).json(contato);
                },
                function(erro) {
                    console.log(erro);
                    res.status(500).json(erro);
                }
            );
        }
    };

    return controller;
};