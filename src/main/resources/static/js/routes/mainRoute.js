(function () {
    angular.module('app')
            .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/main.html',
                controller: 'mainController',
                controllerAs: 'vm'
            })
            .when('/register', {
            	templateUrl: '/views/register.html',
            	controller: 'registerController',
            	controllerAs: 'vm'
            })
            .when('/login', {
            	templateUrl: '/views/login.html',
            	controller: 'mainController',
            	controllerAs: 'vm'
            })            
            .otherwise('/');
    }
}());