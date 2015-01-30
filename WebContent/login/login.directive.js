(function(){
	angular.module('login')
		.directive('username',function($q){
			return{
				require:'ngModel',
				link:function(scope,ele,attr,ctrl){
					ctrl.$asyncValidator.user = function(modelValue,viewValue){
						if(ctrl.$isEmpty(modelValue)){
							return $q.when();
						}
						var res = $q.defer();
						/* check this */
						$http.post('checkUser.php',{'username':modelValue})
							.success(function(data){
								if(data.ok == true)
									res.resolve();
								else
									res.reject();
							})
							.error(function(e){
								res.reject();
							});
						return res.promise;
					}
				}
			}
		})
})();