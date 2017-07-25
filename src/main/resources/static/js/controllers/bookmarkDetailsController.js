(function(){
angular.module('app')
    .controller('BookmarkDetailsController', BookmarkDetailsController);
    
    BookmarkController.$inject = ['$filter', 'BookmarkDetailsService', 'uibDateParser'];
   
    function BookmarkController($filter, BookmarkDetailsService, uibDateParser) {
        
        var vm = this;
        vm.comments = [];
     	'use strict';

    	.directive('starRating', starRating);

        init();

        function init() {
            getBookmarks();
            vm.error = {};
            vm.bookmark = {
           creationDate: new Date()
            };
            vm.closeModal = false;
        }

       
        
        function getBookmarks(){
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }

        function saveBookmark(bookmark){
            bookmark.creationDate = $filter('date')(bookmark.creationDate, "yyyy-MM-dd");
            var tag = bookmark.tags;
            bookmark.tags = {"name":tag};
            vm.user = RegisterService.user;
            bookmark.visible = true;
            bookmark.bookmarkUser = vm.user;
            console.log(bookmark);
            BookmarkService.saveBookmark(bookmark).then(function(response){
                getBookmarks();
                $('#add-bookmark-modal').modal('hide');
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
        }
        
        
        function RatingController() {
        	    vm.rating1 = 5;
        	    vm.rating2 = 2;
        	    vm.isReadonly = true;
        	    vm.rateFunction = function(rating) {
        	      console.log('Rating selected: ' + rating);
        	    };
        	  }

        function starRating() {
        	    return {
        	      restrict: 'EA',
        	      template:
        	        '<ul class="star-rating" ng-class="{readonly: readonly}">' +
        	        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        	        '    <i class="fa fa-star"></i>' + // or &#9733
        	        '  </li>' +
        	        '</ul>',
        	      scope: {
        	        ratingValue: '=ngModel',
        	        max: '=?', // optional (default is 5)
        	        onRatingSelect: '&?',
        	        readonly: '=?'
        	      },
        	      link: function(scope, element, attributes) {
        	        if (scope.max == undefined) {
        	          scope.max = 5;
        	        }
        	        function updateStars() {
        	          scope.stars = [];
        	          for (var i = 0; i < scope.max; i++) {
        	            scope.stars.push({
        	              filled: i < scope.ratingValue
        	            });
        	          }
        	        };
        	        scope.toggle = function(index) {
        	          if (scope.readonly == undefined || scope.readonly === false){
        	            scope.ratingValue = index + 1;
        	            scope.onRatingSelect({
        	              rating: index + 1
        	            });
        	          }
        	        };
        	        scope.$watch('ratingValue', function(oldValue, newValue) {
        	          if (newValue || newValue === 0) {
        	            updateStars();
        	          }
        	        });
        	      }
        	    };
        	  }
    };
})();
