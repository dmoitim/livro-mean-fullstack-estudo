angular.module('contatooh')
.factory('contatoohInterceptor',
    function($location,$q) {
        var interceptor = {
            responseError: function(resposta){
                if(resposta.status == 401){
                    $location.path('/auth');
                }
                //Rejeita a promisse da resposta
                return $q.reject(resposta);
            }
        }

        return interceptor;
    });