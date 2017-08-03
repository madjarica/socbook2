(function () {
    angular.module('app')
            .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$location', '$http', '$route', '$window', 'RegisterService', 'UserService', 'SearchService', 'BookmarkService'];

    function MainController($rootScope, $location, $http, $route, $window, RegisterService, UserService, SearchService, BookmarkService) {

        var self = this;
        self.isActive = isActive;
        self.login = login;
        self.logout = logout;
        self.user;
        self.checkUser;
        self.showSearch = showSearch;
        self.clearLogin = clearLogin;
        self.clearRegister = clearRegister;
        
        self.errors = {};
        self.success = {};
        self.errors.login = '';
        self.errors.register = '';
        self.success.register = '';
        
        self.registerInput = {};
        self.loginCredentials = {};
        
        self.loginForm;
        self.registerForm;

        self.registerUser = registerUser;
        self.registrationError;        
        self.errorHandler = errorHandler;        	
        self.loggedUser;

        init();

        function init() {
            if (self.user) {
                $route.reload();
                self.loginForm.$setPristine();
                self.registerForm.$setPristine();
            }
            showSearch();
        }
        
        function clearLogin() {
        	self.loginForm.$setPristine();
        }
        
        function clearRegister() {
        	self.registerForm.$setPristine();
        }

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
        
		function registerUser(user) {			
			user.roles = [{
				"id" : 2
			}];
			RegisterService.saveUser(user).then(function(response) {
				self.success.register = "Successfully registered. Check your email to confirm your account.";				
				
				self.errors.login = "";
				$("#login-form").delay(20).fadeIn(100);
				$("#register-form").fadeOut(100);
				$('#register-form-link').removeClass('active');
				$('#login-form-link').addClass('active');
				self.registerForm.$setPristine();
				self.errors.register = ''
				self.registerInput = {};
				self.loginCredentials = {};
				
			}, function(error) {
				
				if(self.registerInput.username == undefined) { 
					self.errors.register = ""; 
				} else if(self.registerInput.email == undefined) { 
					self.errors.register = "";
				} else { 
					self.errors.register = error;
				}
				
				console.log(error);
			});
			
;
			
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
						
						UserService.getUserByUsername(self.loginCredentials.username).then(function(response) {
							self.checkUser = response;
							
							if(self.checkUser.active != true) {
			    				self.errors.login = "This user is not active";
			    				self.checkUser = null;
			    				logout();			    				
							} else {								
    							UserService.getUserByUsername(self.user.username).then(function(response) {
    								self.loggedUser = response;
    								RegisterService.user = self.loggedUser;
    							}).then(function() {    								
    								init();
    							});
    							self.registerInput = {};
    							self.loginCredentials = {};
    							self.errors.register = "";	
    							self.errors.login = "";
							}
						})
					}	
				)
				.error(
					function(error) {
						self.success.register = "";
						if (self.loginCredentials.username == undefined) { 
							self.errors.login = ""; 
						} else if(self.loginCredentials.password == undefined) { 
							self.errors.login = "";
						} else { 
							self.errors.login = 'Bad credentials';
						}											
					}
				)				
		}
       
        function logout() {
			$http.defaults.headers.common['Authorization'] = null;
			delete self.user;
			self.error = '';
			self.login.error = '';
			self.success.register = '';
			$location.url("/");
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
		
		function showSearch() {
			if(self.user) {
				SearchService.getAllPublicBookmarksExceptCurrentUser().then(function(response){
					SearchService.bookmarks = response;
				})
			}
		}
    }

})();