(function(){
	angular.module('login',[])
		.controller('loginPage',function($rootScope,
				$scope,
				$interval,
				$http,
				loginServ,
				$location){
			$scope.showLogin = false;
			$scope.showSignup = false;
			$scope.showGuest = false;
			$scope.showEntry = true;
			var reset = function(login){
				if(login){
					login.$setPristine();
					login.$setUntouched();
				}
			};

			$scope.loginReset = function(login){
				reset(login);
			};
			
			$scope.SignupReset = function(signup){
				reset(signup);
			};
			
			$scope.setEntry = function(){
				$scope.showEntry = !$scope.showEntry;
			};
			$scope.setLogin = function(){
				$scope.showLogin = !$scope.showLogin;
			};
			
			$scope.setSignup = function(){
				$scope.showSignup = !$scope.showSignup;
			};
			
			$scope.setGuest = function(){
				$scope.showGuest = !$scope.showGuest;
			};
			
			
			$scope.impSignup = function(){
				loginServ.addUser($scope.nuser)
					.success(function(data){
						$rootScope.notification = data.message;	
					})
					.error(function(e){
						$rootScope.notification = "Error Occured in Server Please Contact Server Admin";
					});
			};
			
			$scope.impLogin = function(){
				loginServ.loginUser($scope.user)
					.success(function(data){
						if(data.type){
							$scope.$apply($location.path('/desktop'));
						}
						else
							$rootScope.notification = "Username Password was not matched";
					})
					.error(function(e){
						$rootScope.notification = "Error Occured in Server Please Contact Server Admin";
					});
			};
		});
})();