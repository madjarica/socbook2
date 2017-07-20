(function () {
    angular.module("app")
        .factory('bookmarkService', BookmarkService);
    
    BookmarkService.$inject = ['$http', '$q'];
    
    function BookmarkService($http, $q) {

        var service = {
            saveBookmark: saveBookmark,
            deleteBookmark: deleteBookmark,
            getBookmarks: getBookmarks
        }

        return service;

        function saveBookmark(bookmark) {
            var def = $q.defer();
            var req = {
                method: bookmark.id ? 'PUT' : 'POST',
                url: "bookmarks",
                data: bookmark}
            $http(req).success(function (data) {
                def.resolve(data);
            })
                    .error(function () {
                        def.reject("Failed");
                    });
            return def.promise;
        }

        function deleteBookmark(id) {
            var def = $q.defer();
            var req = {
                method: 'DELETE',
                url: "bookmarks/" + id
            }
            $http(req).success(function (data) {
                def.resolve(data);
            })
                    .error(function () {
                        def.reject("Failed");
                    });
            return def.promise;
        }

        function getBookmarks0() {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks"
            }
            $http(req).success(function (data) {
                def.resolve(data);
            })
                    .error(function () {
                        def.reject("Failed to get bookmark");
                    });
            return def.promise;
        }
    }
} ());