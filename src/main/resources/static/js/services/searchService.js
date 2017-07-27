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

        /**
         * Searching bookmarks by category
         * @param {String} category
         * @return {Object} bookmarksList
         */
        function getByCategory(category) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/search/category/" + category
            }
            return $http(req)
	            .success(function (response) {
	                return bookmarksList = response.data;
	            })
	            .error(function () {
	                return def.reject("Failed to get bookmarks with given criteria");
	            });
        }
        
        /**
         * Searching bookmarks by username
         * @param {String} username
         * @return {Object} bookmarksList
         */
        function getByUsername(searchedUser) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/search/user/" + searchedUser
            }
            return $http(req)
	            .success(function (response) {
	                return bookmarksList = response.data;
	            })
	            .error(function () {
	                return def.reject("Failed to get bookmarks with given criteria");
	            });
        }
        
        /**
         * Searching bookmarks by tag
         * @param {String} tag
         * @return {Object} bookmarksList
         */
        function getByTag(tagname) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/search/tag/" + tagname
            }
            return $http(req)
	            .success(function (response) {
	                return bookmarksList = response.data;
	            })
	            .error(function () {
	                return def.reject("Failed to get bookmarks with given criteria");
	            });
        }
        
        /**
         * Searching bookmarks by description
         * @param {String} description
         * @return {Object} bookmarksList
         */
        function getByDesc(desc) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/search/desc/"+ desc
            }
            return $http(req)
	            .success(function (response) {
	                return bookmarksList = response.data;
	            })
	            .error(function () {
	                return def.reject("Failed to get bookmarks with given criteria");
	            });
        }
        

    };
}());