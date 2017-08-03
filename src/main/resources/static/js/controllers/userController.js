(function () {
    angular.module('app')
            .controller('UserController', UserController);

    UserController.$inject = ['$location', '$http', '$route', 'UserService', 'RegisterService', 'SearchService' ];
	
	function UserController($location, $http, $route, UserService, RegisterService, SearchService) {
	
		var vm = this;
		vm.users;
		vm.user = RegisterService.user;
		vm.selectUser = selectUser;
		vm.findAll = findAll;
		vm.blockUser = blockUser;
		vm.blockedUser;
		vm.deleteUser = deleteUser;
		vm.errors = {};
		vm.errors.blockUser = '';
		vm.errors.deleteUser = '';
		
		findAll();
		
		function findAll() {		
			UserService.findAll().then(function(response){
				vm.users = response;
				vm.errors.blockUser = '';
				vm.errors.deleteUser = '';
			});			
		}
		
        function selectUser(user){
			vm.errors.blockUser = '';
			vm.errors.deleteUser = '';
            vm.blockedUser = user;
        }
        
        function blockUser(userToBeBlocked){
        	if(vm.user.username == userToBeBlocked.username){
        		vm.errors.blockUser = "You can't block yourself!";
        	} 
        	else if(userToBeBlocked.active==false) {
        		userToBeBlocked.active=true;
        		vm.errors.blockUser = '';
        		vm.errors.deleteUser = '';
        	} else {
        		userToBeBlocked.active=false;
        		vm.errors.blockUser = '';
        		vm.errors.deleteUser = '';
        	}        	
        	RegisterService.saveUser(userToBeBlocked);
        }
        
        function deleteUser(id){
            UserService.deleteUser(id).then(function(response){
                findAll();
            }, function(error){
            	vm.errors.deleteUser = error.message;
            }).then(function(){
    			if(vm.user) {
    				SearchService.getAllPublicBookmarksExceptCurrentUser().then(function(response){
    					SearchService.bookmarks = response;
    				})
    			}
            });


        }
        
    }

})();