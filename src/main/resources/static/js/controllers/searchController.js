(function() {
	angular.module('app').controller('SearchController', SearchController);

	SearchController.$inject = ['$location', 'SearchService','RegisterService', 'BookmarkService' ];

	function SearchController($location, SearchService, RegisterService, BookmarkService) {

		var vm = this;
		vm.bookmarks = SearchService.bookmarks;
		vm.userBookmarks = BookmarkService.userBookmarks;
        vm.bookmark;
		vm.searchError;
        vm.importError = '';
		vm.user = RegisterService.user;
		vm.getCategoryByClickOnSearch = getCategoryByClickOnSearch;
		vm.getTagByClickOnSearch = getTagByClickOnSearch;
		vm.getAuthorByClickOnSearch = getAuthorByClickOnSearch;
		vm.getByCategory = getByCategory;
		vm.getByUsername = getByUsername;
		vm.getByTag = getByTag;
		vm.getByDesc = getByDesc;
		vm.getAllPublicBookmarks = getAllPublicBookmarks;
		vm.getCategoryByClick = getCategoryByClick;
		vm.getTagByClick = getTagByClick;
		vm.getAuthorByClick = getAuthorByClick;
        vm.importBookmark = importBookmark;
        vm.selectBookmark = selectBookmark;
        vm.checkImport = checkImport;
        vm.importAndDisable = importAndDisable;
        vm.showSearch = showSearch;

		vm.searchBookmarks = searchBookmarks;
		
		showSearch();
		
		
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
		
//		vm.srchCtrl.searchInput = {
//			option : 'category'
//		}

		function importBookmark(id) {
			BookmarkService.importBookmark(id).then(function(response){
				vm.importError = "";
				getUserBookmarks();
			},function(error){
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
			}).then(function(){
				getUserBookmarks();
				showSearch();
			});

		}
		
		function getTagByClick(tag) {
			SearchService.getByTag(tag).then(function(response) {
				SearchService.bookmarks = response;
			}).then(function(){
				$location.url("search");
			});

		}
		
		function getAuthorByClick(searchedUser){
			SearchService.getByUsername(searchedUser).then(function(response){
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
		
		function getAuthorByClickOnSearch(searchedUser){
			SearchService.getByUsername(searchedUser).then(function(response){
				vm.bookmarks = response;
			})
		}
		
		
        function selectBookmark(bookmark){
            vm.bookmark = bookmark;
        }
		function showSearch() {
			if(vm.user) {
				SearchService.getAllPublicBookmarksExceptCurrentUser().then(function(response){
					SearchService.bookmarks = response;
				})
			}
		}
        function getUserBookmarks() {
        	vm.user = RegisterService.user;
        	BookmarkService.getUserBookmarks(vm.user.username).then(handleSuccessUserBookmarks);
        }
        function handleSuccessUserBookmarks(data, status) {
        	vm.userBookmarks = data.data;
        	BookmarkService.userBookmarks = data.data;
        }

	};
})();