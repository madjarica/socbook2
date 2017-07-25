(function () {	
    angular.module("app")
            .service('BookmarkDetailsService', BookmarkDetailsService);

    BookmarkService.$inject = ['$http', '$q'];

    function BookmarkService($http, $q) {

        var bookmarksList = [];
        
        var service= {
        		getBookmarks:getBookmarks
        }

        return service;
        this.getBookmarks = function () {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks"
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmark");
            });
        }

    };
}());