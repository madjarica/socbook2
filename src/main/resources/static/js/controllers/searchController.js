(function(){
    angular.module('app')
    .controller('SearchController', SearchController);   
    
    SearchController.$inject = ['SearchService', 'RegisterService'];
    
    function SearchController(SearchService, RegisterService) {
    	
    	var vm = this;
    	vm.search = {
    		option: 'category'
    	}
    	vm.bookmarks = {};
    	vm.searchError;
    	vm.user;
    	vm.getByCategory = getByCategory;
    	vm.getByUsername = getByUsername;
    	vm.getByTag = getByTag;
    	vm.getByDesc = getByDesc;
    	
    	vm.searchBookmarks = searchBookmarks;
    	
    	function searchBookmarks(search) {
    		vm.user = RegisterService.user;
    		switch(search.option) {
    			case 'category' :
    				getByCategory(search.searchField);
    				break;
    			case 'username' :
    				getByUsername(search.searchField);
    				break;
    			case 'tag' :
    				getByTag(search.searchField);
    				break;
    			case 'description' :
    				getByDesc(search.searchField);
    				break;    			
    		}
    	}
    	
    	function getByCategory(category){
    		SearchService.getByCategory(category).then(function(response){
    			vm.bookmarks = response;
    		},function(error){
    			vm.searchError = error;
    		});
    	}
    	
    	function getByUsername(searchedUser){
    		SearchService.getByUsername(searchedUser).then(function(response){
    			vm.bookmarks = response;
    			console.log(response);
    		},function(error){
    			vm.searchError = error;
    		});
    	}
    	
    	function getByTag(tag){
    		SearchService.getByTag(tag).then(function(response){
    			vm.bookmarks = response;
    		},function(error){
    			vm.searchError = error;
    		});
    	}
    	function getByDesc(desc){
    		SearchService.getByDesc(desc).then(function(response){
    			vm.bookmarks = response;
    		},function(error){
    			vm.searchError = error;
    		});
    	}

};
})();