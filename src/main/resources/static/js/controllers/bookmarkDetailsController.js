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
        	vm.comment.createdAt = new Date();
        	vm.bookmark.comment.push(vm.comment);
            vm.operation = "Add";
            console.log(vm.comment);
            BookmarkService.saveBookmark(vm.bookmark).then(function(response){
            	vm.bookmark = response.data;
            	console.log(vm.bookmark);
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
        	BookmarkDetailsService.deleteComment(id).then(function(response){
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
        	BookmarkDetailsService.saveComment(comment).then(function(response){
                getComments(vm.bookmark.id);
            }, function(error){

            })
            //remove input value after submit
        }
        function goToBookmarksDetailsPage(id){
        	getBookmarkById(id);
        }
        
//    	vm.directive('starRating', starRating);

//        init();

//        function init() {
/*            getBookmarks();
            vm.error = {};
            vm.bookmark = {
           creationDate: new Date()
            };
            vm.closeModal = false;*/
 //       }

       
        
/*        function getBookmarks(){
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }*/

//        function saveBookmark(bookmark){
//            bookmark.creationDate = $filter('date')(bookmark.creationDate, "yyyy-MM-dd");
//            var tag = bookmark.tags;
//            bookmark.tags = {"name":tag};
//            vm.user = RegisterService.user;
//            bookmark.visible = true;
//            bookmark.bookmarkUser = vm.user;
//            console.log(bookmark);
//            BookmarkService.saveBookmark(bookmark).then(function(response){
//                getBookmarks();
//                $('#add-bookmark-modal').modal('hide');
//            }, function(error){
//                vm.error = {};
//                angular.forEach(error.data.exceptions, function(e){
//                    errorHandler(e);
//                });
//            })
//            //remove input value after submit
//            vm.addBookmarkForm.$setPristine();
//            vm.error = {};
//        }
        
/*        function selectBookmark(bookmark){
            vm.bookmark = bookmark;
        }
        
        function Controller(vm) {
        	vm.comments = [];
        	vm.btn_post = function() {
                if (vm.cmtName != '') {
                	vm.comments.push(vm.cmtName);
                	vm.cmtName = "";
                }
            }
        	vm.post_cmt = function($home) {
        		vm.comments.splice($home, 1);
            }
        }*/
        
        
//        function RatingController() {
//        	    vm.rating1 = 5;
//        	    vm.rating2 = 2;
//        	    vm.isReadonly = true;
//        	    vm.rateFunction = function(rating) {
//        	      console.log('Rating selected: ' + rating);
//        	    };
//        	  }

//        function starRating() {
//        	    return {
//        	      restrict: 'EA',
//        	      template:
//        	        '<ul class="star-rating" ng-class="{readonly: readonly}">' +
//        	        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
//        	        '    <i class="fa fa-star"></i>' + // or &#9733
//        	        '  </li>' +
//        	        '</ul>',
//        	      scope: {
//        	        ratingValue: '=ngModel',
//        	        max: '=?', // optional (default is 5)
//        	        onRatingSelect: '&?',
//        	        readonly: '=?'
//        	      },
//        	      link: function(scope, element, attributes) {
//        	        if (scope.max == undefined) {
//        	          scope.max = 5;
//        	        }
//        	        function updateStars() {
//        	          scope.stars = [];
//        	          for (var i = 0; i < scope.max; i++) {
//        	            scope.stars.push({
//        	              filled: i < scope.ratingValue
//        	            });
//        	          }
//        	        };
//        	        scope.toggle = function(index) {
//        	          if (scope.readonly == undefined || scope.readonly === false){
//        	            scope.ratingValue = index + 1;
//        	            scope.onRatingSelect({
//        	              rating: index + 1
//        	            });
//        	          }
//        	        };
//        	        scope.$watch('ratingValue', function(oldValue, newValue) {
//        	          if (newValue || newValue === 0) {
//        	            updateStars();
//        	          }
//        	        });
//        	      }
//        	    };
//        	  }
    };
})();

