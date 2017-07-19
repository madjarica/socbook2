(function () {
    angular.module('app')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$rootScope', '$location', '$http'];
    
})();