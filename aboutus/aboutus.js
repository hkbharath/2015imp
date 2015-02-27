(function(){
	var height = $(window).height(),
	width = $(window).width(),
    cwidth = Math.min(height,width);

    $('.au_container').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85});
    $('#st_about').bind('visibleNow',function(){
        console.log(this);
        if(pagnav.isNewPage('st_about')){
            var values = [45,45,45,45],
                data = [
                    {title:"sponsors",picpath:"images/sponsors.png",target_div:"st_sponsors",active:0},
                    {title:"events",picpath:"images/events.png",target_div:"st_events",active:0},
                    {title:"about us",picpath:"images/aboutus.png",target_div:"",active:1},
                    {title:"bulletin",picpath:"images/news.png",target_div:"st_bulletin",active:0}
                ];
            Raphael("st_about", 0.5 * cwidth, height)
            .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);
            $('.au_container').jScrollPane();
        }
    });
})();