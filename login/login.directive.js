(function(){
	angular.module('login')
		.directive('username',function($q,loginServ){
			return{
				require:'ngModel',
				link:function(scope,ele,attr,ctrl){
					ctrl.$asyncValidators.username = function(modelValue,viewValue){
						if(ctrl.$isEmpty(modelValue)){
							return $q.when();
						}
						var res = $q.defer();
						/* checked working */
						loginServ.checkUsername({user:modelValue})
						.success(function(data,status){
								//console.log("data :"+data.type);
								if(data.type == true)
									res.resolve();
								else
									res.reject();
							})
							.error(function(e){
								//console.log("Error : "+e);
								res.reject();
							});
						return res.promise;
						
					}
				}
			}
		})
})();