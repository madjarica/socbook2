(function(){
    angular.module('app')
    .controller('bookmarkController', BookmarkController);   
    
    BookmarkController.$inject = ['bookmarkService'];
    
    function BookmarkController(BookmarkService) {
        
        var bo = this;
        bo.addBookmark = addBookmark;
        bo.deleteBookmark = deleteBookmark;
        bo.editBookmark = editBookmark;
        bo.saveBookmark = saveBookmark;
        bo.selectBookmark = selectBookmark;
        bo.operation;
        
        //Create new bookmark
        bo.bookmark = {};

        getBookmarks();
        
        function addBookmark() {
            bo.operation = "Add";
            bo.addBookmarkForm;
            bo.bookmark = {};
        }

        function deleteBookmark(){
            BookmarkService.deleteBookmark(bo.bookmark.id).then(function(response){
            	getBookmarks();
            }, function(error){

            });
            bo.bookmark = {};
        }
        
        function editBookmark(bookmark) {
            bo.operation = "Edit";
            bo.bookmark = angular.copy(bookmark);
        }
        
        function getBookmarks(){
            BookmarkService.getBookmarks().then(handleSuccessBookmark);
        }
        
        //Get all bookmarks
        function handleSuccessBookmark(data, status){
            bo.bookmarks = data;
        }

        function saveBookmark(bookmark){
            BookmarkService.saveBookmark(bookmark).then(function(response){
            	getBookmarks();
            }, function(error){

            })
            //remove input value after submit
            bo.addBookmarkForm.$setPristine();
        }
        
        function selectBookmark(bookmark){
            bo.bookmark = bookmark;
        }
    };
})();