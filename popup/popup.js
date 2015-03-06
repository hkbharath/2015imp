(function(){
	var h = $(window).height()*0.05,
		iw = $(window).width()*0.901 - h/2*0.8	,
		ih = $(window).height()*0.1 - h/2;
	$('.pp_close').css({width:h,height:h,left:iw,top:ih})
	.click(function(){
		$('.pp_content').empty();
		$('#st_popup').hide('fast');
	})



})();