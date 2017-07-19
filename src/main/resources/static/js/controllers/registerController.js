(function() {
    angular.module('app')
        .controller('registerController', RegisterController);

    RegisterController.$inject = ['registerService'];
    
    function RegisterController(RegisterService) {
    	var vm = this;
    	vm.registerUser = registerUser;
    	vm.registrationError;
    	vm.registerUserForm;
    	vm.errorHandler = errorHandler;
    	vm.registerInput = {};
    	vm.error = '';
    	
    	
    	
    	 function capitalize(error){
            return '* ' + error[0].toUpperCase() + error.slice(1); 
         }
    	  
    	function errorHandler(error){
    		switch(error.field){
    		case 'password': vm.error.password = capitalize(error.message);
    		break;
    		case 'email': vm.error.password = capitalize(error.message);
    		break;
    		}
    	}
    	
    	function registerUser(user) {
    		user.active = true;
        	user.roles = [{"id": 2}];
        	console.log(user);
        	vm.registerUserForm.$setPristine();
        	RegisterService.saveUser(user).then(function(response){
        		
        	}, function(error){
        		
        		vm.error = error.message; 
        		console.log(error.message);
                angular.forEach(error.message, function(e){
                    errorHandler(e);
                });
            });
            
            //remove input value after submit
        	vm.registerUserForm.$setPristine();
        	vm.error = '';
    	}
    }
})();