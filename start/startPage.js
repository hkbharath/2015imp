(function(){
	angular.module('startPage',[])
		.controller('startCtrl',function($scope,$rootScope){
			$rootScope.titleText = "Impetus 15";
			
			var height = Math.round($(window).height()*0.7);
			var width = Math.round($(window).width()*0.4);
			$('#st_container').css('height',Math.min(height,width)+'px');
			$('#st_container').css('width', Math.min(height,width)+'px');

			$scope.pauseAnimation = function(){
				$('.st_central').css('-webkit-animation-play-state','paused');
				$('.st_central').css('animation-play-state','paused');
			};
			$scope.restartAnimation = function(){
				$('.st_central').css('-webkit-animation-play-state','running');
				$('.st_central').css('animation-play-state','running');
			};
		})
})();