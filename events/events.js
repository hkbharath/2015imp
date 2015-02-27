$('.ev_button').click(function(){
	$('#ev_cover').css("background-color","black");
	$('#ev_content').css("opacity","0.3");
});
$('.ev_cancel').click(function(){
	$('#ev_cover').css("background-color","transparent");
	$('#ev_content').css("opacity","");
});


(function(){
	var height = Math.max(Math.round($(window).height()*0.95),600),
	width = Math.max(Math.round($(window).width()*0.95),600),
    cwidth = Math.min(height,width);

    $('.cu_container').css({'height':height*0.66,'width':(width-cwidth*0.5)*0.92});
    $('#st_events').bind('visibleNow',function(){
        console.log(this);
        if(pagnav.isNewPage('st_events')){
            var values = [45,45,45,45],
                data = [
                    {title:"",picpath:"images/back.png",target_div:pagnav.getPrevPage(),active:-1},
                    {title:"workshops",picpath:"images/workshops.png",target_div:"st_workshops",active:0},
                    {title:"contact us",picpath:"images/events.png",target_div:"",active:1},
                    {title:"Home",picpath:"images/home.png",target_div:"st_space",active:0}
                ];
            Raphael("st_events", 0.5 * cwidth, cwidth)
            .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);
            $('.cu_container').jScrollPane();
        }
    })
})();