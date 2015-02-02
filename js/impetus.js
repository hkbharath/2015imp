(function(){
	angular.module('impetus',['ngRoute','login','desktop'])
		.config(function($routeProvider){
			$routeProvider
				.when('/',{
					templateUrl:'login/login_partial.html',
					controller:'loginPage'
				})
				.when('/login',{
					templateUrl:'login/login_partial.html',
					controller:'loginPage'
				})
				.when('/desktop',{
					templateUrl:'desktop/desktop_partials.html',
					controller:'desktopPage'
				})
		})
		
		/* Top Bar Controller */
		.controller('topBar',function($rootScope,$scope,$interval){
			$scope.time=new Date(); /*get this from server */
			var getTime = function(){
				//console.log($scope.time);
				$scope.time.setTime($scope.time.getTime()+1000);
			}
			var t = $interval(getTime,1000);
			
			$scope.$on('$destroy',function(){
				$interval.cancel(t);
				t = undefined;
			});
			$rootScope.pageTitle = "Impetus !5";
			$rootScope.headText = "Impetus !5";
			$scope.showSetup = function(){
				
			};
			
			$scope.showProfile = function(){
				
			};
			
			$scope.showCalender = function(){
			};
		})
		/* Title Controller Uses Services */
		.controller('title',function($scope){
			//$scope.pageTitle = titleService.getTitle();
		})
		
})();