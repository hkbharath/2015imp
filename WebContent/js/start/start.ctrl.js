(function(){
	angular.module('impetus.start',[])
		.controller('start',function($scope){
			$scope.showLogin = false;
			$scope.showSignup = false;
			$scope.showGuest = false;
		})
})();