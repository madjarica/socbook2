(function () {
    angular.module('app')
            .controller('UserController', UserController);

    UserController.$inject = ['$location', '$http', '$route', 'UserService', 'RegisterService' ];
	
	function UserController($location, $http, $route, UserService, RegisterService) {
	
		var vm = this;
		vm.users;
		vm.user;
		vm.selectUser=selectUser;
		vm.findAll=findAll;
		vm.blockUser=blockUser;
		vm.deleteUser= deleteUser;
		
		findAll();
		
		function findAll(){
			UserService.findAll().then(function(response){
				vm.users = response;
			})
			
		}
		
        function selectUser(user){
            vm.user = user;
        }
        
        function blockUser(user){
        	console.log(user);
        	if(user.active==false)
        		user.active=true;
        	else user.active=false;
        	
        	RegisterService.saveUser(user);
        }
        
        function deleteUser(id){
            UserService.deleteUser(vm.user.id).then(function(response){
                findAll();
            }, function(error){

            });
            vm.user = {};
        }
    }

})();