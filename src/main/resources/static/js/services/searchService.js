(function () {
    angular.module("app")
            .service('SearchService', SearchService);

    SearchService.$inject = ['$http', '$q'];

    function SearchService($http, $q) {

        var bookmarksList = [];
        
        var service = {
                getByCategory: getByCategory,
                getByUsername: getByUsername,
                getByTag: getByTag,
                getByDesc: getByDesc
            }
        return service;         

        function getByCategory(username, category) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/searchCategory/" + username + "+" + category
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmarks with given criteria");
            });
        }
        
        function getByUsername(username, searchedUser) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/searchUser/" + username + "+" + searchedUser
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmarks with given criteria");
            });
        }
        
        function getByTag(username, tagname) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/searchTag/" + username + "+" + tagname
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmarks with given criteria");
            });
        }
        
        function getByDesc(username, desc) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/searchDesc/" + username + "+" + desc
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmarks with given criteria");
            });
        }
        

    };
}());