(function(){
	angular.module('desktop',[])
		.controller('desktopPage',function($rootScope,$scope,$http){
			$rootScope.headText = "Desktop";
			$scope.folders = [{title:'name1'},{title:'name2'},{title:'name1'},{title:'name2'},{title:'name1'},{title:'name2'}];
			$http.get('src/getCatagories.php')
				.success(function(data){
					$scope.folders = data;
				})
				.error(function(e){
					$rootScope.notification = "No Catagories Added";
				})
		})
})();