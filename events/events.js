$('.ev_button').click(function(){
	$('#ev_cover').css("background-color","black");
	$('#ev_content').css("opacity","0.3");
});
$('.ev_cancel').click(function(){
	$('#ev_cover').css("background-color","transparent");
	$('#ev_content').css("opacity","");
});