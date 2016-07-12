angular.module('contatooh').controller('ContatoController', function($scope, $routeParams, Contato){
    //Contato está vindo o ContatoService, que é onde o $resource foi construído

    if($routeParams.contatoId){
        Contato.get({id: $routeParams.contatoId},
            function(contato){
                $scope.contato = contato;
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter o contato.'};
                console.log(erro);
            }
        );
    }else{
        $scope.contato = new Contato();
    }

    $scope.salva = function(){
        $scope.contato.$save()
            .then(function(){
                $scope.mensagem = {texto: 'Salvo com sucesso.'};
                //Limpa o formulário
                $scope.contato = new Contato();
            })
            .catch(function(erro){
                $scope.mensagem = {texto: 'Não foi possível salvar.'};
            });
    };

    //Retorna todos os contatos cadastrados
    Contato.query(function(contatos){
        $scope.contatos = contatos;
    });
});