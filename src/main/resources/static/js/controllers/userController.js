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
			});			
		}
		
        function selectUser(user){
            vm.blockedUser = user;
        }
        
        function blockUser(userToBeBlocked){
        	if(vm.user.username == userToBeBlocked.username){
        		vm.errors.blockUser = "You can't block yourself!";
        	} 
        	else if(userToBeBlocked.active==false) {
        		userToBeBlocked.active=true;
        	} else {
        		userToBeBlocked.active=false;
        	}        	
        	RegisterService.saveUser(userToBeBlocked);
        }
        
        function deleteUser(id){
            UserService.deleteUser(id).then(function(response){
                findAll();
            }, function(error){
            	vm.errors.deleteUser = error.message;
            	console.log(error);
            }).then(function(){
    			if(vm.user) {
    				SearchService.getAllPublicBookmarksExceptCurrentUser().then(function(response){
    					SearchService.bookmarks = response;
    				})
    			}
            });
            console.log(vm.user);


        }
        
    }

})();