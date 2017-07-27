(function () {
    angular.module("app")
        .factory('RegisterService', RegisterService);
    
    RegisterService.$inject = ['$http', '$q'];
    
    function RegisterService($http, $q) {

        var register = {
            saveUser : saveUser,
            user : {}
        }

        return register;

        /**
         * Saving user into database
         * @param {Object} user
         * @return {Object} data
         */
        function saveUser(user) {
            var def = $q.defer();
            var req = {
                method: user.id ? 'PUT' : 'POST',
                url: "users",
                data: user}
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            })
                .error(function (error) {
                	console.log(error.message);
                    def.reject(error.message);
                });
            return def.promise;
        }
    }
} ());