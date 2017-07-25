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
    				console.log(vm.user.username);
    				getByCategory(vm.user.username, search.searchField);
    				break;
    			case 'username' :
    				getByUsername(vm.user.username, search.searchField);
    				break;
    			case 'tag' :
    				getByTag(vm.user.username, search.searchField);
    				break;
    			case 'description' :
    				getByDesc(vm.user.username, search.searchField);
    				break;    			
    		}
    	}
    	
    	function getByCategory(username, category){
    		SearchService.getByCategory(username, category).then(function(response){
    			vm.bookmarks = response;
    		},function(error){
    			vm.searchError = error;
    		});
    	}
    	
    	function getByUsername(username, searchedUser){
    		SearchService.getByUsername(username, searchedUser).then(function(response){
    			vm.bookmarks = response;
    		},function(error){
    			vm.searchError = error;
    		});
    	}
    	
    	function getByTag(username, tag){
    		SearchService.getByTag(username, tag).then(function(response){
    			vm.bookmarks = response;
    		},function(error){
    			vm.searchError = error;
    		});
    	}
    	function getByDesc(username, desc){
    		SearchService.getByDesc(username, desc).then(function(response){
    			vm.bookmarks = response;
    		},function(error){
    			vm.searchError = error;
    		});
    	}

};
})();