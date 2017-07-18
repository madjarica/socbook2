(function() {
    angular.module('app')
        .controller('registerController', RegisterController);

    RegisterController.$inject = ['$rootScope', '$location', '$http'];
    
    function RegisterController($rootScope, $location, $http) {
    	var vm = this;
    	vm.register = register;
    	
    	vm.credentials = {};
    	
    	function register(credentials, callback) {
    		
    	}
    }
})();