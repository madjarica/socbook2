(function () {
    angular.module('app')
            .controller('MainController', MainController);

    MainController.$inject = ['$location', '$http', '$route', '$window', 'RegisterService', 'UserService'];

    function MainController($location, $http, $route, $window, RegisterService, UserService) {

        var self = this;
        self.isActive = isActive;
        self.login = login;
        self.logout = logout;
        self.user;
        
        self.errors = {};
        self.success = {};
        self.errors.login = '';
        self.errors.register = '';
        self.success.register = '';
        
        self.registerInput = {};
        self.loginCredentials = {};
        
        self.registerUserForm;

        self.registerUser = registerUser;
        self.registrationError;        
        self.errorHandler = errorHandler;        	
        self.loggedUser;

        init();

        function init() {
            if (self.user) {
                $route.reload();
            }
        }

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
        
		function registerUser(user) {
			user.active = true;
			user.roles = [{
				"id" : 2
			}];
			console.log(user);
//			self.registerUserForm.$setPristine();
			RegisterService.saveUser(user).then(function(response) {
				self.success.register = "Successfully registered. You can now log in.";				
				
				$("#login-form").delay(20).fadeIn(100);
				$("#register-form").fadeOut(100);
				$('#register-form-link').removeClass('active');
				$('#login-form-link').addClass('active');
				
			}, function(error) {
				self.errors.register = error;
				console.log(error);
			});
			
			self.registerUserForm.$setPristine();
			self.registerInput = {};
			self.errors.register = '';
		}

    	function login() {
			var base64Credential = btoa(self.loginCredentials.username + ':' + self.loginCredentials.password);
			$http
				.get('user', {
					headers : {						
						'Authorization' : 'Basic ' + base64Credential
					}
				})
				.success(
					function(res) {
						self.loginCredentials.password = null;
						self.message = '';						
						$http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
						self.user = res;						
						UserService.getUserByUsername(self.user.username).then(function(response) {
							self.loggedUser = response;
							RegisterService.user = self.loggedUser;
						});								
						init();
					})
				.error(
					function(error) {
						if(self.loginCredentials.username == undefined && self.loginCredentials.email == undefined) self.errors.login = '';
						else if(self.loginCredentials.username == undefined) self.errors.login = '';
						else if(self.loginCredentials.email == undefined) self.errors.login = '';
						else self.errors.login = 'Bad credentials';
					
			});
		}
       
        function logout() {
			$http.defaults.headers.common['Authorization'] = null;
			delete self.user;
			self.error = '';
			self.login.error = '';
			self.success.register = '';
        }
        
		function capitalize(error) {
			return '* ' + error[0].toUpperCase() + error.slice(1);
		}

		function errorHandler(error) {
			switch (error.field) {
			case 'password':
				vm.error.password = capitalize(error.message);
				break;
			case 'email':
				vm.error.password = capitalize(error.message);
				break;
			}
		}
    }

})();