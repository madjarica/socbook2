(function () {
    angular.module("app")
        .factory('UserService', UserService);
    
    UserService.$inject = ['$http', '$q'];
    
    function UserService($http, $q) {

        var service = {
            getUserByUsername: getUserByUsername,
            findAll: findAll,
            deleteUser: deleteUser
        }

        return service;

        /**
         * Getting single user from database
         * @param {String} username
         * @return {Object} data
         */
        function getUserByUsername(username) {
            var def = $q.defer();
            var user;
            var req = {
                method: 'GET',
                url: "users/username/" + username,
                data: user
            }
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            })
                .error(function (error) {
                    def.reject("error");
                });
            return def.promise;
        }
        
        /**
         * Getting all users from database
         * @return {Object} data
         */
        function findAll(){
        	var def = $q.defer();
        	var users;
        	var req = {
        			mathod: 'GET',
        			url: "users/",
        			data: users
        	}
        	$http(req)
	        	.success(function (data) {
	                 def.resolve(data);
	            })
                 .error(function () {
                     def.reject("Failed");
                 });
             return def.promise;
         } 	
        
        /**
         * Deleting user from database
         * @param {Long} id
         * @return {Object} data
         */
        function deleteUser(id) {
            var def = $q.defer();
            var req = {
                method: 'DELETE',
                url: "users/" + id
            }
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            })
                .error(function () {
                    def.reject("Failed");
                });
            return def.promise;
        }
        
        function activateUser(code) {
        	var def = $q.defer();
        	var req = {
    			method: 'GET',
    			url: "users/activate/" + code
        	}
        	$http(req)
        		.success(function (data) {
        			def.resolve(data);
        		})
        		.error(function() {
        			def.reject("Failed");
        		});
        	return def.promise;
        }
    }
})();