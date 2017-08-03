(function(){
angular.module('app')
    .controller('BookmarkDetailsController', BookmarkDetailsController);
    
    BookmarkDetailsController.$inject = ['$location' ,'BookmarkDetailsService', 'RegisterService', '$filter', 'BookmarkService', '$rootScope'];
   
    function BookmarkDetailsController($location ,BookmarkDetailsService, RegisterService, $filter, BookmarkService, $rootScope) {
        
        var vm = this;
        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.saveComment = saveComment;
        vm.comment;
        vm.selectedComment;
        vm.user = RegisterService.user; 
        vm.operation;
        vm.bookmark = BookmarkDetailsService.selectedBookmark;
        vm.selectComment = selectComment;
        vm.getBookmarkById = getBookmarkById;
        vm.goToBookmarksDetailsPage = goToBookmarksDetailsPage;
        vm.rate;
        vm.rate = {};
        vm.getNumber = getNumber;
        vm.importBookmark = importBookmark;
        vm.commentForm;
        vm.importError = "";
        vm.commentInput = {
    		rateMark : 5
        }
        vm.meanRate;
        vm.count;
        vm.userBookmarks = BookmarkService.userBookmarks;
        vm.checkImport = checkImport;
        vm.importAndDisable = importAndDisable;
        vm.getRoles = getRoles;
        vm.ADMIN = false;
        
        vm.comment = {};
        
        init();

        function init() {
        	getMeanRate(vm.bookmark.id);
        	getComments(vm.bookmark.id);
        	getRoles();
        }
        
        function getNumber(number) {
        	return new Array(number);
        }
        
        function getRoles(){
        	vm.ADMIN = false;
        	if(vm.user.roles != undefined){
        		for(var i = 0; i < vm.user.roles.length; i++){
        			if(vm.user.roles[i].type == "ROLE_ADMIN"){
        				vm.ADMIN = true;
        			}
        		}
        	}
        }
        
        function addComment(commentInput) {
        	vm.comment = {};
        	vm.comment.commentContent = commentInput.commentContent;
        	vm.comment.rateMark = commentInput.rateMark;
        	vm.comment.bookmarkUser =  vm.user;
        	vm.comment.createdDate = new Date();
//        	vm.bookmark.comment.push(vm.comment);
            vm.bookmark.comment.push(vm.comment);
            commentInput.commentContent='';
            BookmarkService.saveBookmark(vm.bookmark).then(function(response){
            	getMeanRate(vm.bookmark.id);
            	vm.bookmark = response.data;
            	getComments(vm.bookmark.id)})
            
        }

        function deleteComment(id){
        	BookmarkDetailsService.deleteComment(id).then(function(){
        		getMeanRate(vm.bookmark.id);
                getComments(vm.bookmark.id);                
            }, function(error){

            });
            vm.comment = {};
        }
        
        function selectComment(comment){
            vm.selectedComment = angular.copy(comment);
        }
        
        function getComments(id){
        	BookmarkService.getBookmark(id).then(function(response){
        		vm.bookmark = response;
        	}).then(function(){
        		vm.comments = vm.bookmark.comment;
        	})        	
        }
        
        function getMeanRate(id) {
        	BookmarkService.getBookmark(id).then(function(response){
        		vm.bookmark = response;
        	}).then(function(){
        		vm.comments = vm.bookmark.comment;
        		var count = 0;
        		var pom = 0;
        		if(vm.comments != undefined){
        		vm.comments.forEach(function(comment) {
        			if(comment.rateMark != null) {
        				pom = pom + comment.rateMark;
        				count++;
        			}        			
        		})
        		vm.meanRate = Math.round(pom / count);       
        		vm.count = count;
        	}
        	})
        }
        
        //Get all comments
        function handleSuccessComment(data, status) {
            vm.comments = data;
        }
        
        function getBookmarkById(id) {
        	BookmarkDetailsService.getBookmarkById(id).then(handleSuccessBookmarks);        	
        }
                
        function handleSuccessBookmarks(data, status){
            vm.bookmark = data;
            BookmarkDetailsService.selectedBookmark = vm.bookmark;
        	$location.url("bookmarkDetails");
        }

        function saveComment(comment){
        	comment.createdDate = new Date();
        	BookmarkDetailsService.saveComment(comment).then(function(response){
                init();
            }, function(error){

            })
            //remove input value after submit
        }
        
        
        function goToBookmarksDetailsPage(id){
        	getBookmarkById(id);
        } 
        
        function importBookmark(id) {
			console.log(id);
			BookmarkService.importBookmark(id).then(function(response){
				vm.importError = "";
				console.log(response);
			},function(error){
				console.log(error.data.message);
				vm.importError = error.data.message;
			})
		}
		function checkImport(title){
			if(vm.userBookmarks != undefined){
			for(var i = 0; i < vm.userBookmarks.length; i++){
				if(title == vm.userBookmarks[i].title)
					return true;
			}
			return false;
			}
		}
		
		function importAndDisable(bookmarkId, buttonId){
			$('#'+buttonId).addClass('disabled');
			$('#'+buttonId).removeAttr('data');
			$('#'+buttonId).removeAttr('data-target');
			importBookmark(bookmarkId);
		}
		
    };
})();