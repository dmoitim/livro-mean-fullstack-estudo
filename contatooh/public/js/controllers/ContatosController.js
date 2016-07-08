angular.module('contatooh').controller('ContatosController', function($scope, $resource){
    $scope.contatos = [];
    $scope.filtro = '';

    var Contato = $resource('/contatos/:id');

    function buscaContatos(){
        Contato.query(
            function(contatos){
                $scope.contatos = contatos;
            },
            function(erro) {
                console.log(erro);
                console.log('N�o foi poss�vel obter a lista de contatos.');
            }
        );
    }
    buscaContatos();

    $scope.remove = function(contato){
        Contato.delete({id: contato._id},
            buscaContatos,
            function(erro){
                console.log(erro);
                console.log('N�o foi poss�vel remover o contato.');
            }
        );
    }
});