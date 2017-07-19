(function(){
    angular.module('app')
        .controller('mainController', MainController);
    
        MainController.$inject = ['$location', '$anchorScroll', '$http', '$rootScope', '$route'];
    
        function MainController($location, $anchorScroll, $http, $rootScope, $route) {

            var vm = this;
            vm.isActive = isActive;
            vm.scrollTo = scrollTo;
            
            vm.login = login;
            vm.logout = logout;
            vm.user;
            vm.error;
            
            init();

            function init() {
                if (vm.user) {
                    $route.reload();
                }
            }
            
            function login() {
                // creating base64 encoded String from username and password
                var base64Credential = btoa(vm.loginCredentials.username + ':' + vm.loginCredentials.password);

                // calling GET request for getting the user details
                $http.get('user', {
                    headers: {
                        // setting the Authorization Header
                        'Authorization': 'Basic ' + base64Credential
                    }
                }).success(function (res) {
                	vm.loginCredentials.password = null;
                    vm.message = '';
                    // setting the same header value for all request calling from this app
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
                    vm.user = res;
                    console.log(vm.user);
                    init();
                }).error(function (error) {
                    vm.error = 'Bad credentials!';
                });
            }            

            
//            function login() {
//            	authenticate(vm.loginCredentials, function () {
//                    if ($rootScope.authenticated) {
//                        $location.path("/");
//                        vm.error = false;
//                    } else {
//                        $location.path("/login");
//                        vm.error = true;
//                    }
//                });
//            }      

            function logout() {            	
            	console.log('ok');            	
                // clearing the authorization header
                $http.defaults.headers.common['Authorization'] = null;
                // clearing all data
                vm.user = {};
                vm.error = {};
            }

            //nav-bar
            function isActive(viewLocation) {
                return viewLocation === $location.path();
            };

            function scrollTo(id) {
                $location.hash(id);
                $anchorScroll();
            }
            


        }
})();