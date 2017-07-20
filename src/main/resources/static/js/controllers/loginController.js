(function () {
    angular.module('app')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$rootScope', '$location', '$http'];
    
    function LoginController($rootScope, $location, $http) {
    	
    	var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.user;
        vm.error = '';

        vm.loginCredentials = {};
        authenticate();
        
        init();


        function init() {
            if (vm.user) {
                $route.reload();
            }
        }
        
        function authenticate(loginCredentials, callback) {        	
        	var headers = loginCredentials ? {authorization: "Basic " + btoa(loginCredentials.username + ":" + loginCredentials.password)} : {};
        	
        	$http.get('/user', {headers: headers}).then(function (response) {
                console.log(response.data);
                if (response.data.username) {
                    $rootScope.authenticated = true;
                } else {
                    $rootScope.authenticated = false;
                }
                callback && callback();
            }, function () {
                $rootScope.authenticated = false;
                callback && callback();
            });
        	
        }
        
        function login() {
        	authenticate(vm.loginCredentials, function () {
                if ($rootScope.authenticated) {
                    $location.path("/");
                    vm.error = false;
                } else {
                    $location.path("/login");
                    vm.error = true;
                }
            });
        }      

        function logout() {            	
        	console.log('ok');            	
            // clearing the authorization header
            $http.defaults.headers.common['Authorization'] = null;
            // clearing all data
            delete vm.user;
            vm.error = '';
        }
        
    }
    
})();