angular.module('contatooh').controller('ContatosController', function($scope, $http){
    $scope.contatos = [];
    $scope.filtro = '';

    var promisse = $http({
        method: 'GET',
        url: '/contatos'
    });

    promisse
        .success(function(data, status, headers, config){
            $scope.contatos = data;
        })
        .error(function(statusText, status, headers, config){
            console.log('Não foi possível obter a lista de contatos.');
            console.log(statusText);
            console.log(status);
        });
});