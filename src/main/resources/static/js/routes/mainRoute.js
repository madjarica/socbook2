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
            .when('/register', {
            	templateUrl: '/views/register.html',
            	controller: 'RegisterController',
            	controllerAs: 'vm'
            })
            .when('/login', {
            	templateUrl: '/views/login.html',
            	controller: 'LoginController',
            	controllerAs: 'vm'
            })            
            .otherwise('/');
    }
}());