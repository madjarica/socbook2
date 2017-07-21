(function() {
	angular.module('app').controller('mainController', MainController);

	MainController.$inject = [ '$location', '$anchorScroll', '$http', '$rootScope', '$route', '$window',
		'registerService', 'bookmarkService'];

	function MainController($location, $anchorScroll, $http, $rootScope, $route, $window, RegisterService, BookmarkService) {

		var vm = this;
		vm.isActive = isActive;
		vm.scrollTo = scrollTo;

		vm.login = login;
		vm.logout = logout;
		vm.user;
		vm.registerUser = registerUser;
		vm.registrationError;
		vm.registerUserForm;
		vm.errorHandler = errorHandler;
		vm.registerInput = {};
		vm.login.error = '';
		vm.error = '';

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

		function registerUser(user) {
			user.active = true;
			user.roles = [ {
				"id" : 2
			} ];
			console.log(user);
			vm.registerUserForm.$setPristine();
			RegisterService.saveUser(user).then(function(response) {
				$window.location.href = '/';
			}, function(error) {

				vm.error = error;
				console.log(error);
			});

			// remove input value after submit
			vm.registerUserForm.$setPristine();
			vm.error = '';
		}

		init();

		function init() {
			if (vm.user) {
				$route.reload();
			}
		}

		function login() {
			
			// creating base64 encoded String from username and password
			var base64Credential = btoa(vm.loginCredentials.username + ':'
					+ vm.loginCredentials.password);

			// calling GET request for getting the user details
			$http
					.get('user', {
						headers : {
							// setting the Authorization Header
							'Authorization' : 'Basic ' + base64Credential
						}
					})
					.success(
							function(res) {
								vm.loginCredentials.password = null;
								vm.message = '';
								// setting the same header value for all request
								// calling from this app
								$http.defaults.headers.common['Authorization'] = 'Basic '
										+ base64Credential;
								vm.user = res;
								console.log(vm.user);
								init();
							}).error(function(error) {
						vm.login.error = 'Bad credentials!';
					});
		}

		function logout() {
			console.log('logged out');
			$http.defaults.headers.common['Authorization'] = null;
			delete vm.user;
			vm.error = '';
		}

		// nav-bar
		function isActive(viewLocation) {
			return viewLocation === $location.path();
		}

		function scrollTo(id) {
			$location.hash(id);
			$anchorScroll();
		}
	}
})();