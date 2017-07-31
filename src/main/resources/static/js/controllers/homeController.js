(function () {
    angular.module('app')
            .controller('HomeController', HomeController);

	HomeController.$inject = ['CategoryService', 'BookmarkService', '$location', '$http', 'RegisterService'];
	
	function HomeController(CategoryService, BookmarkService, $location, RegisterService) {

        var vm = this;
        vm.isActive = isActive;
        vm.categories;
        vm.bookmarks;
        vm.user = RegisterService.user;

        init();

        function init() {        	
        	if(vm.user) {
        		getCategories();
                getBookmarks();
        	}
        }

        function getCategories() {
            CategoryService.getCategories().then(handleSuccessCategories);
        }

        function getBookmarks() {
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }

        //Get all category
        function handleSuccessCategories(data, status) {
            vm.categories = data;
        }

        //Get all books
        function handleSuccessBookmarks(data, status) {
            vm.books = data.data;
        }

        //nav-bar
        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
    }

})();