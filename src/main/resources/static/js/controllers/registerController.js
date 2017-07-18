(function() {
    angular.module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['registerService'];
    
    function RegisterController(RegisterService) {
    	var vm = this;
    	vm.registerUser = registerUser;
    	
    	function registerUser(user) {
    		console.log(user);
    	}
    }
})();