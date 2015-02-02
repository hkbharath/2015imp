(function(){
	angular.module('desktop')
		.directive('impetusFolder', function($document,$location){
			return {
		        restrict: 'A',
		        scope:{
		        	title: '='
		        },
		        template: '<img src="img/folder-icon.png" style="height:75px;"><div class="folderName">{{title}}</div>',
		        link: function(scope, element, attr) {
		          var startX = 0, startY = 0, x = 0, y =  0;
		 
			      element.css({
			       position: 'relative',
			       cursor: 'pointer'
			      });
		 
			      element.on('mousedown', function(event) {
			        // Prevent default dragging of selected content
			        event.preventDefault();
			        startX = event.pageX - x;
			        startY = event.pageY - y;
			        $document.on('mousemove', mousemove);
			        $document.on('mouseup', mouseup);
			      });
		 
			      function mousemove(event) {
			        y = event.pageY - startY;
			        x = event.pageX - startX;
			        element.css({
			          top: y + 'px',
			          left:  x + 'px'
			        });
			      }
		 
			      function mouseup() {
			        $document.unbind('mousemove', mousemove);
			        $document.unbind('mouseup', mouseup);
			      }
			      /* check this functionality */
			      element.on("click",function(){
			    	 scope.$apply(function(){$location.path('/desktop/'+scope.title)}) 
			      });
		        }
		    }
		});
})();