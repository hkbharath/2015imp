(function(){
	angular.module('login')
	.factory('loginServ',function($http){
		var servman = {};
		servman.addUser = function(user){
			return $http.post('src/addUser.php',user);
		};
		servman.loginUser = function(user){
			return $http.post('src/loginUser.php',user);
		};
		servman.checkUsername = function(user){
			return $http.post('src/checkUser.php',user);
		};
		return servman;
	})
})();

			