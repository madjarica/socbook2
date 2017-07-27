(function () {
    angular.module("app")
        .factory('TagService', TagService);
    
    TagService.$inject = ['$http', '$q'];
    
    function TagService($http, $q) {

        var service = {
            saveTag: saveTag,
            deleteTag: deleteTag,
            getTags: getTags
        }

        return service;

        /**
         * Saving tag into database
         * @param {Object} tag
         * @return {Object} data
         */
        function saveTag(tag) {
            var def = $q.defer();
            var req = {
                method: tag.id ? 'PUT' : 'POST',
                url: "tags",
                data: tag}
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            })
                .error(function () {
                    def.reject("Failed");
                });
            return def.promise;
        }

        /**
         * Deleting tag from database
         * @param {Long} id
         * @return {Object} data
         */
        function deleteTag(id) {
            var def = $q.defer();
            var req = {
                method: 'DELETE',
                url: "tags/" + id
            }
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            })
                .error(function () {
                    def.reject("Failed");
                });
            return def.promise;
        }

        /**
         * Getting all tags from database
         * @return {Object} data
         */
        function getTags() {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "tags"
            }
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            })
                .error(function () {
                    def.reject("Failed to get tag");
                });
            return def.promise;
        }
    }
} ());