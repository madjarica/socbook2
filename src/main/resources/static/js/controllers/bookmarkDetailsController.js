(function(){
angular.module('app')
    .controller('BookmarkDetailsController', BookmarkDetailsController);
    
    BookmarkDetailsController.$inject = ['$location' ,'BookmarkDetailsService', 'RegisterService', '$filter', 'BookmarkService'];
   
    function BookmarkDetailsController($location ,BookmarkDetailsService, RegisterService, $filter, BookmarkService) {
        
        var vm = this;
        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.editComment = editComment;
        vm.saveComment = saveComment;
        vm.post = post;
        vm.comment;
        vm.selectedComment;
        vm.user = RegisterService.user;
        vm.operation;
        vm.comments;
        vm.bookmark = BookmarkDetailsService.selectedBookmark;
        vm.selectComment = selectComment;
        vm.getBookmarkById = getBookmarkById;
        vm.goToBookmarksDetailsPage = goToBookmarksDetailsPage;
        
        
        vm.comment = {};
        
        init();
        
        function init() {        	
        	getComments(vm.bookmark.id);
        }
        
        
        function addComment(commentContent) {
        	vm.comment = {};
        	vm.comment.commentContent = commentContent;
        	vm.comment.bookmarkUser =  vm.user;
        	vm.comment.createdDate = new Date();
        	vm.bookmark.comment.push(vm.comment);
            vm.operation = "Add";
            console.log(vm.comment);
            
            BookmarkService.saveBookmark(vm.bookmark).then(function(response) {
            	vm.bookmark = response.data;
            	console.log(vm.bookmark);
            	
            }).then(function(){
            	getComments(vm.bookmark.id);
            	console.log(vm.comments);
            })
        }
        
        function post() {
            if (vm.comment.commentContent != '') {
            	vm.comments.push(vm.comment.commentContent);
            	vm.comment.commentContent = "";
            }
        }        

        function deleteComment(id){
        	console.log(id);
        	BookmarkDetailsService.deleteComment(id).then(function(){
                getComments(vm.bookmark.id);
            }, function(error){

            });
            vm.comment = {};
        }
        
        function selectComment(comment){
            vm.selectedComment = comment;
            console.log(vm.selectedComment);
        }
        
        function editComment(comment) {
            vm.operation = "Edit";
            vm.comment = angular.copy(comment);
        }
        
        function getComments(id){
        	BookmarkService.getBookmark(id).then(function(response){
        		vm.bookmark = response;
        	}).then(function(){
        		vm.comments = vm.bookmark.comment;
        		
        	})        	
        }
        
        //Get all comments
        function handleSuccessComment(data, status){
            vm.comments = data;
            console.log(vm.comments);
        }
        
        function getBookmarkById(id){
        	console.log(id);
        	BookmarkDetailsService.getBookmarkById(id).then(handleSuccessBookmarks);
        	
        }
        
        function handleSuccessBookmarks(data, status){
            vm.bookmark = data;
            console.log(vm.bookmark);
            BookmarkDetailsService.selectedBookmark = vm.bookmark;
        	console.log(BookmarkDetailsService.selectedBookmark);
        	$location.url("bookmarkDetails");
        }

        function saveComment(comment){
        	BookmarkDetailsService.saveComment(comment).then(function(response) {
                getComments(vm.bookmark.id);
            }, function(error){

            })
            //remove input value after submit
        }
        
        function goToBookmarksDetailsPage(id){
        	getBookmarkById(id);
        }  

    };
})();

