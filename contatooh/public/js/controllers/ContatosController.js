angular.module('contatooh').controller('ContatosController', function($scope, Contato){
    //Contato est� vindo o ContatoService, que � onde o $resource foi constru�do

    $scope.contatos = [];
    $scope.filtro = '';
    $scope.mensagem = {texto: ''};

    function buscaContatos(){
        Contato.query(
            function(contatos){
                $scope.contatos = contatos;
                $scope.mensagem = {};
            },
            function(erro) {
                console.log(erro);
                $scope.mensagem = {texto: 'N�o foi poss�vel obter a lista de contatos.'};
            }
        );
    }
    buscaContatos();

    $scope.remove = function(contato){
        Contato.delete({id: contato._id},
            buscaContatos,
            function(erro){
                console.log(erro);
                $scope.mensagem = {texto: 'N�o foi poss�vel remover o contato.'};
            }
        );
    }
});