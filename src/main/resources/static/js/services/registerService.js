(function () {
    angular.module("app")
        .factory('registerService', RegisterService);
    
    RegisterService.$inject = ['$http', '$q'];
    
    function RegisterService($http, $q) {

        var register = {
            saveUser : saveUser,
            user : {}
        }

        return register;

        function saveUser(user) {
            var def = $q.defer();
            var req = {
                method: user.id ? 'PUT' : 'POST',
                url: "users",
                data: user}
            $http(req).success(function (data) {
                def.resolve(data);
            })
                    .error(function (error) {
                    	console.log(error.exceptions[0].field, error.exceptions[0].message);
                        def.reject(error.exceptions[0].field + " " + error.exceptions[0].message);
                    });
            return def.promise;
        }
    }
} ());