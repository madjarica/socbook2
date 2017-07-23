(function () {
    angular.module('app')
            .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .when('/categories', {
            	templateUrl: '/views/categories.html',
            	controller: 'CategoryController',
            	controllerAs: 'vm'
            })
            .when('/tags', {
            	templateUrl: '/views/tags.html',
            	controller: 'TagController',
            	controllerAs: 'vm'
            })          
            .when('/users', {
            	templateUrl: '/views/users.html',
            	controller: 'UserController',
            	controllerAs: 'vm'
            })          
            .otherwise('/');
    }
}());