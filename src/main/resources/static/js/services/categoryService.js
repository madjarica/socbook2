(function () {
    angular.module("app")
        .factory('CategoryService', CategoryService);
    
    CategoryService.$inject = ['$http', '$q'];
    
    function CategoryService($http, $q) {

        var service = {
            saveCategory: saveCategory,
            deleteCategory: deleteCategory,
            getCategories: getCategories
        }

        return service;

        /**
         * Saving category into database
         * @param {Object} category
         * @return {Object} data
         */
        function saveCategory(category) {
            var def = $q.defer();
            var req = {
                method: category.id ? 'PUT' : 'POST',
                url: "categories",
                data: category}
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            })
                .error(function () {
                    def.reject("Failed to save category");
                });
            return def.promise;
        }

        /**
         * Deleting category from database
         * @param {Long} id
         * @return {Object} data
         */
        function deleteCategory(id) {
            var def = $q.defer();
            var req = {
                method: 'DELETE',
                url: "categories/" + id
            }
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            })
                .error(function () {
                    def.reject("Failed to delete category");
                });
            return def.promise;
        }

        /**
         * Getting all categories from database
         * @return {Object} data
         */
        function getCategories() {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "categories"
            }
            $http(req)
	            .success(function (data) {
	                def.resolve(data);
	            })
                .error(function () {
                    def.reject("Failed to get categories");
                });
            return def.promise;
        }
    }
} ());