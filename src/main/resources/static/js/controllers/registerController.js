(function() {
    angular.module('app')
        .controller('registerController', RegisterController);

    RegisterController.$inject = ['registerService'];
    
    function RegisterController(RegisterService) {
    	var vm = this;
    	vm.registerUser = registerUser;
    	vm.registrationError;
    	vm.registerInput = {};
    	
    	function registerUser(user) {
    		user.active = true;
        	user.roles = [{"id": 2}];
        	console.log(user);
        	RegisterService.saveUser(user).then(function(response){
        		
        	}, function(error){
        		vm.registrationError = {};
//                angular.forEach(error.data.exceptions, function(e){
//                    errorHandler(e);
//                });
            });
            
            //remove input value after submit
            vm.registerUserForm.$setPristine();
    	}
    }
})();