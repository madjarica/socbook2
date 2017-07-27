(function(){
angular.module('app')
    .controller('BookmarkController', BookmarkController);
    
    BookmarkController.$inject = ['$filter', 'CategoryService', 'BookmarkService', 'uibDateParser', 'RegisterService', '$rootScope'];
   
    function BookmarkController($filter, CategoryService, BookmarkService, uibDateParser, RegisterService, $rootScope) {
        
        var vm = this;
        vm.addBookmark = addBookmark;
        vm.deleteBookmark = deleteBookmark;
        vm.editBookmark = editBookmark;
        vm.openCalendar = openCalendar;
        vm.saveBookmark = saveBookmark;
        vm.selectBookmark = selectBookmark;
        vm.getUserBookmarks = getUserBookmarks;
        vm.operation;
        vm.user;         

        init();        

        function init() {
            getCategories();
            getUserBookmarks();
            getBookmarks();
            vm.error = {};
            vm.bookmark = {
                creationDate: new Date()
            };
            vm.closeModal = false;
        }

        vm.datePickerOptions = {
            formatYear: 'yy',
            maxDate : new Date()
        };

        vm.popupCalendar = {
           opened: false
        }; 

        function addBookmark() {
            vm.addBookmarkForm.$setPristine();
            vm.operation = "Add";
            init();
        }

        function deleteBookmark(){
            BookmarkService.deleteBookmark(vm.bookmark.id).then(function(response){
                getBookmarks();
            }, function(error){

            });
            vm.bookmark= {};
        }

        function editBookmark(bookmark){
        	vm.error = {};
            vm.operation = "Edit";
            vm.bookmark = angular.copy(bookmark);
            vm.bookmark.created_at = new Date(vm.bookmark.created_at);
        }

        function getCategories(){
            CategoryService.getCategories().then(handleSuccessCategories);
        }
        
        function getBookmarks(){
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }
        
        function getUserBookmarks() {
        	vm.user = RegisterService.user;
        	BookmarkService.getUserBookmarks(vm.user.username).then(handleSuccessUserBookmarks);
        }

        //Get all category
        function handleSuccessCategories(data, status){
            vm.categories = data;
        }
        
        //Get all books
        function handleSuccessBookmarks(data, status){
            vm.bookmarks = data.data;
        }
        
        function handleSuccessUserBookmarks(data, status) {
        	vm.userBookmarks = data.data;
        }

        function openCalendar() {
            vm.popupCalendar.opened = true;
        };

        function capitalize(error){
            return '* ' + error[0].toUpperCase() + error.slice(1); 
        }

        function errorHandler(error){
            switch(error.field){
                case 'title':
                    vm.error.title = capitalize(error.message);
                    break;
                case 'isbn':
                    vm.error.isbn = capitalize(error.message);
                    break;
            }
        }

        function saveBookmark(bookmark){
            bookmark.creationDate = $filter('date')(bookmark.creationDate, "yyyy-MM-dd");
            
//            if(bookmark.tag) {
//            	var tagsToSave = [];
//            	var temp = bookmark.tag.split(' ');
//            	
//	            temp.forEach(function(t) {
//	                var tag = {};
//	                tag.name = t;
//	                tagsToSave.push(tag);
//	            });
//	            
//	            bookmark.tag = tagsToSave;
//            	
//            } else {
//            	bookmark.tag = [];
//            }         
            
            
            
            vm.user = RegisterService.user;
            bookmark.bookmarkUser = vm.user;
            BookmarkService.saveBookmark(bookmark).then(function(response){
                getUserBookmarks();
            }, function(error){
                vm.error = {};
                angular.forEach(error.data.exceptions, function(e){
                    errorHandler(e);
                });
            })
            //remove input value after submit            
            vm.addBookmarkForm.$setPristine();
            vm.error = {};
        }
        
        function selectBookmark(bookmark){
            vm.bookmark = bookmark;
        }
    };
})();