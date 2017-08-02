(function(){
    angular.module('app')
    .controller('CategoryController', CategoryController);   
    
    CategoryController.$inject = ['CategoryService', 'RegisterService'];
    
    function CategoryController(CategoryService, RegisterService) {
        
        var vm = this;
        vm.addCategory = addCategory;
        vm.deleteCategory = deleteCategory;
        vm.editCategory = editCategory;
        vm.saveCategory = saveCategory;
        vm.selectCategory = selectCategory;
        vm.operation;
        vm.user = RegisterService.user;
        vm.errors = {};
        vm.errors.category = '';
        
        //Create new category
        vm.category = {};

        if(vm.user) {
        	getCategories();
        }        
        
        function addCategory() {
        	vm.errors.category = '';
            vm.operation = "Add";
            vm.addCategoryForm;
            vm.category = {};
        }
        
        function deleteCategory(id){
            CategoryService.deleteCategory(vm.category.id).then(function(response){
            	vm.errors.category = '';
                getCategories();
            }, function(error){
            	vm.errors.category = error;
            });
            vm.category = {};
        }
        
        function editCategory(category) {
        	vm.errors.category = '';
            vm.operation = "Edit";
            vm.category = angular.copy(category);
        }
        
        function getCategories(){
            CategoryService.getCategories().then(handleSuccessCategory);
        }
        
        //Get all categories
        function handleSuccessCategory(data, status){
            vm.categories = data;
        }

        function saveCategory(category){
            CategoryService.saveCategory(category).then(function(response){
            	vm.errors.category = '';
                getCategories();
            }, function(error){

            })
            //remove input value after submit
            vm.addCategoryForm.$setPristine();
        }
        
        function selectCategory(category){
        	vm.errors.category = '';
            vm.category = category;
        }
    };
})();