(function(){
	var height = Math.max(Math.round($(window).height()),600),
	width = Math.max(Math.round($(window).width()),600),
    cwidth = Math.min(height,width);

    $('.cu_container').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85});
    $('#st_contact').bind('visibleNow',function(){
        console.log(this);
        if(pagnav.isNewPage('st_contact')){
            var values = [45,45,45,45],
                data = [
                    {title:"bulletins",picpath:"images/news.png",target_div:"st_bulletins",active:0},
                    {title:"workshops",picpath:"images/workshops.png",target_div:"st_workshops",active:0},
                    {title:"contact us",picpath:"images/mail.png",target_div:"",active:1},
                    {title:"gallery",picpath:"images/gallery.png",target_div:"st_gallery",active:0}
                ];
            Raphael("st_contact", 0.5 * cwidth, height)
            .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);
            $('.cu_container').jScrollPane();
        }
    });

    $.get("src/getContacts.php",function(data,status){
        var reqdiv = $('.cu_container');
        for(var i=0; i<data.length ; i++)
            reqdiv.append("<div class = 'cu_element'><img src='"+data[i].picpath+"' class = 'cu_image'><div class = 'cu_info'><label class = 'cu_l'>designation:</label> <p class = 'cu_p'> "+data[i].designation+" </p><br><label class = 'cu_l'>email id:</label> <p class = 'cu_p'> "+data[i].email+" </p><br><label class = 'cu_l'>phone number:</label> <p class = 'cu_p'> "+data[i].phone+" </p><br></div><div style='width:100%;height:0px'></div><div class = 'cu_name'> "+data[i].name+" </div></div>");
    })
})();