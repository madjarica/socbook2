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

        function getByCategory(category) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/search/category/" + category
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmarks with given criteria");
            });
        }
        
        function getByUsername(searchedUser) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/search/user/" + searchedUser
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmarks with given criteria");
            });
        }
        
        function getByTag(tagname) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/search/tag/" + tagname
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmarks with given criteria");
            });
        }
        
        function getByDesc(desc) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/search/desc/"+ desc
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmarks with given criteria");
            });
        }
        

    };
}());