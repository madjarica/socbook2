(function(){
    angular.module('app')
        .controller('mainController', MainController);
    
        MainController.$inject = ['$location', '$anchorScroll'];
    
        function MainController($location, $anchorScroll) {

            var vm = this;
            vm.isActive = isActive;
            vm.scrollTo = scrollTo;

            //nav-bar
            function isActive(viewLocation) {
                return viewLocation === $location.path();
            };

            function scrollTo(id) {
                $location.hash(id);
                $anchorScroll();
            }
        }
})();