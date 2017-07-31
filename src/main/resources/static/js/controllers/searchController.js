(function() {
	angular.module('app').controller('SearchController', SearchController);

	SearchController.$inject = [ '$location', 'SearchService','RegisterService', 'BookmarkService' ];

	function SearchController($location, SearchService, RegisterService, BookmarkService) {

		var vm = this;
		vm.bookmarks = SearchService.bookmarks;
        vm.bookmark;
		vm.searchError;
        vm.importError = '';
		vm.user;
		vm.getCategoryByClickOnSearch = getCategoryByClickOnSearch;
		vm.getTagByClickOnSearch = getTagByClickOnSearch;
		vm.getByCategory = getByCategory;
		vm.getByUsername = getByUsername;
		vm.getByTag = getByTag;
		vm.getByDesc = getByDesc;
		vm.getAllPublicBookmarks = getAllPublicBookmarks;
		vm.getCategoryByClick = getCategoryByClick;
		vm.getTagByClick = getTagByClick;
        vm.importBookmark = importBookmark;
        vm.selectBookmark = selectBookmark;

		vm.searchBookmarks = searchBookmarks;
		
//		vm.srchCtrl.searchInput = {
//			option : 'category'
//		}

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

		function searchBookmarks(search) {
			vm.user = RegisterService.user;
			if(search) {
				switch (search.option) {
				case 'category':

					getByCategory(search.searchField);
					break;
				case 'username':
					getByUsername(search.searchField);
					break;
				case 'tag':
					getByTag(search.searchField);
					break;
				case 'description':
					getByDesc(search.searchField);
					break;
				}
			} else {
				getAllPublicBookmarks();
			}
		}

		function getByCategory(category) {
			SearchService.getByCategory(category).then(function(response) {
				vm.bookmarks = response;
			}, function(error) {
				vm.searchError = error;
			});
		}

		function getByUsername(searchedUser) {
			SearchService.getByUsername(searchedUser).then(function(response) {
				vm.bookmarks = response;
			}, function(error) {
				vm.searchError = error;
			});
		}

		function getByTag(tag) {			
			SearchService.getByTag(tag).then(function(response) {
				vm.bookmarks = response;
			}, function(error) {
				vm.searchError = error;
			});
		}
		
		function getByDesc(desc) {
			SearchService.getByDesc(desc).then(function(response) {
				vm.bookmarks = response;
			}, function(error) {
				vm.searchError = error;
			});
		}

		function getAllPublicBookmarks() {
			BookmarkService.getAllPublicBookmarks().then(function(response) {
				vm.bookmarks = response;
			}, function(error) {
				vm.searchError = error;
			});

		}

		function getCategoryByClick(category) {
			SearchService.getByCategory(category).then(function(response) {
				SearchService.bookmarks = response;
			}).then(function(){
				$location.url("search");
			});

		}
		
		function getTagByClick(tag) {
			SearchService.getByTag(tag).then(function(response) {
				SearchService.bookmarks = response;
			}).then(function(){
				$location.url("search");
			});

		}
		
		function getCategoryByClickOnSearch(category) {
			SearchService.getByCategory(category).then(function(response) {
				vm.bookmarks = response;
			});
		}
		function getTagByClickOnSearch(tag) {
			SearchService.getByTag(tag).then(function(response) {
				vm.bookmarks = response;
			});
		}
        function selectBookmark(bookmark){
            vm.bookmark = bookmark;
        }
	};
})();