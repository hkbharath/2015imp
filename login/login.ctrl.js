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
			var preHead = 'IMPETUS !5';
			$rootScope.HeadText = preHead;
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
			
			$scope.setLogin = function(){
				$scope.showLogin = !$scope.showLogin;
				if($scope.showLogin){
					$rootScope.headText = "Login";
				}
				else
					$rootScope.headText = preHead;
			};
			
			$scope.setSignup = function(){
				$scope.showSignup = !$scope.showSignup;
				if($scope.showSignup){
					$rootScope.headText = "Signup";
				}
				else
					$rootScope.headText = preHead;
			};
			
			$scope.setGuest = function(){
				$scope.showGuest = !$scope.showGuest;
				if($scope.showGuest){
					$rootScope.headText = "Guest Login";
				}
				else
					$rootScope.headText = preHead;
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