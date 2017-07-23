(function () {
    angular.module("app")
        .factory('UserService', UserService);
    
    UserService.$inject = ['$http', '$q'];
    
    function UserService($http, $q) {

        var service = {
            getUserByUsername: getUserByUsername
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
                    .error(function () {
                        def.reject("Failed");
                    });
            return def.promise;
        }
    }
})();