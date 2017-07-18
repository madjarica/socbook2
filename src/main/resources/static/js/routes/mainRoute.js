(function () {
    angular.module('app')
            .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })            
            .otherwise('/');
    }
}());