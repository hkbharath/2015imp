(function(){
	angular.module('impetus',['ngRoute','login'])
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
			})
			$rootScope.pageTitle = "Impetus !5";
			$rootScope.headText = "Impetus !5";
		})
		/* Title Controller Uses Services */
		.controller('title',function($scope){
			//$scope.pageTitle = titleService.getTitle();
		})
		
})();