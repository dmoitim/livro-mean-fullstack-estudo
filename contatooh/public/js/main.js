angular.module('contatooh', ['ngRoute', 'ngResource'])
    .config(function($routeProvider, $httpProvider){
        $httpProvider.interceptors.push('contatoohInterceptor');

        $routeProvider.when('/contatos',{
            templateUrl: 'partials/contatos.html',
            controller: 'ContatosController'
        });

        $routeProvider.when('/contato',{
            templateUrl: 'partials/contato.html',
            controller: 'ContatoController'
        });

        $routeProvider.when('/contato/:contatoId',{
            templateUrl: 'partials/contato.html',
            controller: 'ContatoController'
        });

        $routeProvider.when('/auth',{
            templateUrl: 'partials/auth.html'
        });

        //Caso a rota não exista, faz redirecionamento
        //para o padrão
        $routeProvider.otherwise({
            redirectTo: '/contatos'
        });
    });