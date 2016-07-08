angular.module('contatooh', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider.when('/contatos',{
            templateUrl: 'partials/contatos.html',
            controller: 'ContatosController'
        });

        $routeProvider.when('/contato/:contatoId',{
            templateUrl: 'partials/contato.html',
            controller: 'ContatoController'
        });

        //Caso a rota n�o exista, faz redirecionamento
        //para o padr�o
        $routeProvider.otherwise({
            redirectTo: '/contatos'
        });
    });