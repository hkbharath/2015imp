(function(){
	angular.module('login',['impetus.serv'])
		.controller('loginPage',function($rootScope,$scope,$interval){
			$scope.showLogin = false;
			$scope.showSignup = false;
			$scope.showGuest = false;
			var prevHead = '';
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
					prevhead = $rootScope.headText;
					$rootScope.headText = "Login";
				}
				else
					$rootScope.headText = prevHead;
			};
			
			$scope.setSignup = function(){
				$scope.showSignup = !$scope.showSignup;
				if($scope.showSignup){
					prevhead = $rootScope.headText;
					$rootScope.headText = "Signup";
				}
				else
					$rootScope.headText = prevHead;
			};
			
			$scope.setGuest = function(){
				$scope.showGuest = !$scope.showGuest;
				if($scope.showGuest){
					prevHead = $rootScope.headText;
					$rootScope.headText = "Guest Login";
				}
				else
					$rootScope.headText = prevHead;
			};
			
			$scope.SignupReset();
			$scope.loginReset();
			
			$scope.signup = function(){
				
			}
			
			$scope.login = function(){
				
			}
		})
})();