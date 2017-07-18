(function () {
    angular.module("app")
        .factory('registerService', RegisterService);
    
    RegisterService.$inject = ['$http', '$q'];
    
    function RegisterService($http, $q) {

        var register = {
            saveUser: saveUser
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
                    .error(function () {
                        def.reject("Failed");
                    });
            return def.promise;
        }
    }
} ());