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

        function getUserByUsername(username) {
            var def = $q.defer();
            var user;
            var req = {
                method: 'GET',
                url: "users/username/" + username,
                data: user
            }
            $http(req).success(function (data) {
                def.resolve(data);
            })
                    .error(function (error) {
                        def.reject("error");
                    });
            return def.promise;
        }
        
        function findAll(){
        	var def = $q.defer();
        	var users;
        	var req = {
        			mathod: 'GET',
        			url: "users/",
        			data: users
        	}
        	 $http(req).success(function (data) {
                 def.resolve(data);
             })
                     .error(function () {
                         def.reject("Failed");
                     });
             return def.promise;
         } 	
        
        function deleteUser(id) {
            var def = $q.defer();
            var req = {
                method: 'DELETE',
                url: "users/" + id
            }
            $http(req).success(function (data) {
                def.resolve(data);
            })
                    .error(function () {
                        def.reject("Failed");
                    });
            return def.promise;
        }
    }
})();