module.exports = function(app){
    var Contato = app.models.contato;
    var controller = {}

    controller.listaContatos = function(req,res){
        Contato.find().exec()
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
        var _id = req.params.id;
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
        var _id = req.params.id;
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
        var _id = req.body._id;
        if(_id){ //Update
            Contato.findByIdAndUpdate(_id, req.body).exec()
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
            Contato.create(req.body)
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