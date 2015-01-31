(function(){
	angular.module('impetus.serv',[])
		.factory('titleService',function(){
			var services = {};
			var pageTitle = "Impetus !5";
			services.getTitle = function(){
				return pageTitle;
			}
			services.setTtitle = function(title){
				pageTitle = title;
			}
			return services;
		});
})();