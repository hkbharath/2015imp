(function(){
	var height =$(window).height(),
	width = $(window).width(),
    cwidth = Math.min(height,width),
    pane = $('.bu_container');
    $('.bu_container').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85});
    $('#st_bulletins').bind('visibleNow',function(){
        console.log(this);
        if(pagnav.isNewPage('st_bulletins')){
            var values = [45,45,45,45],
                data = [
                    {title:"events",picpath:"images/events.png",target_div:"st_events",active:0},
                    {title:"about us",picpath:"images/aboutus.png",target_div:"st_about",active:0},
                    {title:"bulletins",picpath:"images/news.png",target_div:"st_bulletins",active:1},
                    {title:"workshops",picpath:"images/workshops.png",target_div:"st_workshops",active:0}
                ];
            Raphael("st_bulletins", 0.5 * cwidth, height)
            .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);
            pane.jScrollPane();

            $.get("src/getUpdates.php",function(data,status){
                var api = pane.data('jsp');
                for(var i=0; i<data.length ; i++){
                    api.getContentPane().append("<div class = 'bu_element'><div class = 'bu_name' >"+ data[i].title + "</div><div class = 'bu_info'>"+data[i].content+"</div></div>");
                    api.reinitialise();
                }
            });
        }
    });
})();