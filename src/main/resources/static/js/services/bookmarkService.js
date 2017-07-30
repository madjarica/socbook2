(function () {
    angular.module("app")
            .service('BookmarkService', BookmarkService);

    BookmarkService.$inject = ['$http', '$q'];

    function BookmarkService($http, $q) {

        var bookmarksList = [];

        /**
         * Getting all bookmarks from database
         * @return {Object} bookmarksList 
         */
        this.getBookmarks = function () {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks"
            }
            return $http(req)
	            .success(function (response) {
	                return bookmarksList = response.data;
	            })
	            .error(function () {
	                return def.reject("Failed to get bookmarks");
	            });
        }
        
        /**
         * Getting bookmarks from database from certain user
         * @param {String} username
         * @return {Object} bookmarksList
         */
        this.getUserBookmarks = function (username) {
        	var def = $q.defer();
        	var req = {
        		method: 'GET',
        		url: "bookmarks/search/current-user/" + username
        	}
        	return $http(req)
	        	.success(function (response) {
	        		return bookmarksList = response.data;
	        	})
	        	.error(function () {
	        		return def.reject("Failed to get bookmarks");
	        	});        	
        }

        /**
         * Saving bookmark into database
         * @param {Object} bookmark
         * @return {Object} response
         */
        this.saveBookmark = function (bookmark) {
            var def = $q.defer();
            var req = {
                method: bookmark.id ? 'PUT': 'POST',
                url: "bookmarks",
                data: bookmark
            }
            return $http(req)
	            .success(function (response) {
	                return response;
	            }).error(function () {
	                def.reject("Failed");
	            });
            return def.promise;
        }

        /**
         * Delete bookmark from database
         * @param {Number} id
         * @return {Object} data
         */
        this.deleteBookmark = function (id) {
            var def = $q.defer();
            var req = {
                method: 'DELETE',
                url: "bookmarks/" + id
            }
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            }).error(function () {
	                def.reject("Failed");
	            });
            return def.promise;
        }   
        
        /**
         * Getting single bookmark
         * @param {Long} id
         * @return {Object} data
         */
        this.getBookmark = function (id) {        	
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/" + id
            }
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            }).error(function () {
	                def.reject("Failed");
	            });
            return def.promise;
        } 
        
        /**
         * Getting all public bookmarks
         * @return {Object} data
         */
        this.getAllPublicBookmarks = function () {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/public"
            }
            return $http(req)
	            .success(function (response) {
	                return bookmarksList = response.data;
	            })
	            .error(function () {
	                return def.reject("Failed to get bookmarks");
	            });
        }
    };
}());