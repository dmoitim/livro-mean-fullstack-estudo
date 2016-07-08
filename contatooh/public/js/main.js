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

        //Caso a rota não exista, faz redirecionamento
        //para o padrão
        $routeProvider.otherwise({
            redirectTo: '/contatos'
        });
    });