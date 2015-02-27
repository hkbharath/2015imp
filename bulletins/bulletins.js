(function(){
	var height =$(window).height(),
	width = $(window).width(),
    cwidth = Math.min(height,width);

    $('.bu_container').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85});
    $('#st_bulletins').bind('visibleNow',function(){
        console.log(this);
        if(pagnav.isNewPage('st_bulletins')){
            var values = [45,45,45,45],
                data = [
                    {title:"bulletins",picpath:"images/news.png",target_div:"st_bulletins",active:0},
                    {title:"workshops",picpath:"images/workshops.png",target_div:"st_workshops",active:0},
                    {title:"contact us",picpath:"images/mail.png",target_div:"",active:1},
                    {title:"gallery",picpath:"images/gallery.png",target_div:"st_gallery",active:0}
                ];
            Raphael("st_bulletins", 0.5 * cwidth, height)
            .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);
            $('.bu_container').jScrollPane();
        }
    });

    $.get("src/getUpdates.php",function(data,status){
        var reqdiv = $('.cu_container');
        for(var i=0; i<data.length ; i++)
            reqdiv.append("");
    })
})();