(function(){
	angular.module('impetus.start',[])
		.controller('start',function($scope,$interval){
			$scope.showLogin = false;
			$scope.showSignup = false;
			$scope.showGuest = false;
			$scope.time=new Date(); /*get this from server */
			var getTime = function(){
				//console.log($scope.time);
				$scope.time.setTime($scope.time.getTime()+1000);
			}
			$interval(getTime,1000);
			
			var reset = function(login){
				if(login){
					login.$setPristine();
					login.$setUntouched();
				}
			}
			$scope.loginReset = function(login){
				reset(login);
			}
			
			$scope.SignupReset = function(signup){
				reset(signup);
			}
			
			$scope.SignupReset();
			$scope.loginReset();
			
			$scope.signup = function(){
				
			}
		})
})();