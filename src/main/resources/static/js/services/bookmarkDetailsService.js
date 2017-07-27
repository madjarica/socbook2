(function() {
	angular.module("app")
		.factory('BookmarkDetailsService', BookmarkDetailsService);
	
	BookmarkDetailsService.$inject = ['$http', '$q'];
	
	function BookmarkDetailsService($http, $q){

		
		var service= {
        		saveComment: saveComment,
                deleteComment: deleteComment,
                getComments: getComments,
                getBookmarkById: getBookmarkById,
                getCommentByBookmarkId: getCommentByBookmarkId,
                selectedBookmark: {}
        }

        return service;
        
        
        function saveComment(comment) {
            var def = $q.defer();
            var req = {
                method: comment.id ? 'PUT' : 'POST',
                url: "comments",
                data: comment}
            $http(req).success(function (data) {
                def.resolve(data);
            })
                    .error(function () {
                        def.reject("Failed");
                    });
            return def.promise;
        }

        function deleteComment(id) {
            var def = $q.defer();
            var req = {
                method: 'DELETE',
                url: "comments/" + id
            }
            $http(req).success(function (data) {
                def.resolve(data);
            })
                    .error(function () {
                        def.reject("Failed");
                    });
            return def.promise;
        }
        
        function getComments() {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "comments"
            }
            $http(req).success(function (data) {
                def.resolve(data);
            })
                    .error(function () {
                        def.reject("Failed to get comment");
                    });
            return def.promise;
        }
        
        function getBookmarkById(id)
        {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/" + id
            }
            $http(req).success(function (data) {
            	console.log(data);
                def.resolve(data);
            })
            .error(function () {
                return def.reject("Failed to get bookmark");
            });
            return def.promise;
        }
        
        function getCommentByBookmarkId(id){
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "comments/bookmark/" + id
            }
            $http(req).success(function (data) {
            	console.log(data);
                def.resolve(data);
            })
            .error(function () {
                return def.reject("Failed to get bookmark");
            });
            return def.promise;
        }
    };
}());