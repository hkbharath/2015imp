(function(){
	var height =$(window).height(),
	width = $(window).width(),
    cwidth = Math.min(height,width),
    pane = $('.sp_container');
    $('.sp_container').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85});
    $('#st_sponsors').bind('visibleNow',function(){
        console.log(this);
        if(pagnav.isNewPage('st_sponsors')){
            var values = [45,45,45,45],
                data = [
                    {title:"gallery",picpath:"images/gallery.png",target_div:"st_gallery",active:0},
                    {title:"guest speakers",picpath:"images/guestspeakers.png",target_div:'st_guest',active:0},
                    {title:"sponsors",picpath:"images/sponsors.png",target_div:"st_sponsors",active:1},
                    {title:"events",picpath:"images/events.png",target_div:"st_events",active:0}
                ];
            Raphael("st_sponsors", 0.5 * cwidth, height)
            .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);
            pane.jScrollPane();

            $.get("src/getUpdates.php",function(data,status){
                var api = pane.data('jsp');
                for(var i=0; i<data.length ; i++){
                   ;// api.getContentPane().append("<div class = 'bu_element'><div class = 'bu_name' >"+ data[i].title + "</div><div class = 'bu_info'>"+data[i].content+"</div></div>");
                   // api.reinitialise();
                }
            });
        }
    });
})();