(function(){
	var height =$(window).height(),
	width = $(window).width(),
    cwidth = Math.min(height,width),
    pane = $('.bu_container');
    $('.bu_container').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85});
    $('#st_bulletins').bind('visibleNow',function(){
        var cele = $(this);
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

            $.get("src/getUpdates.php",function(data,status){
                pane.jScrollPane();
                var api = pane.data('jsp');
                if(data.length == 0){
                    api.getContentPane().append("<p style='font-family:alienlang'> Latest news will be put up soon </p>");
                }
                for(var i=0; i<data.length ; i++){
                    console.log(data[i].new);
                    if(data[i].new == "1"){
                        api.getContentPane().append("<div class='ev_element' style = 'width:95%'><div class='ev_text'><img alt='new' src='images/new.png'>"+data[i].name+"</div></div>");    
                    }
                    else{
                        api.getContentPane().append("<div class='ev_element' style = 'width:95%'><div class='ev_text'>"+data[i].name+"</div></div>");
                    }
                    
                    api.reinitialise();
                }
                cele.find('.ev_element')
                .click(function(){
                    var nm = $(this).find('.ev_text').text().trim(),
                        sel = null;
                    for(var i=0;i<data.length;i++){
                        if(data[i].name == nm){
                            sel = data[i];
                            break;
                        }
                    }
                    $('#st_popup').fadeIn('fast');
                    $('.pp_content')
                    .append("<div class = 'bu_element' style='height:94%'><div class = 'bu_name' >"+ sel.name + "<div class='st_clear'></div><div class='bu_time'>posted on : "+sel.posted+"</div><a href='"+sel.fbpath+"' target='_blank'><div class='bu_fb'></div></a></div><div class = 'bu_info' style='height:"+$('.pp_content').height()*0.80+"px'>"+sel.topic+"</div></div>")
                    .show('fold',1000)
                    .find('.bu_info').jScrollPane();
                    
                    var papi = $('.pp_content').find('.bu_info').data('jsp');
                    var simg = new Image();
                    simg.onload = function(){
                        papi.getContentPane().prepend(simg);
                        papi.reinitialise();
                    }
                    simg.src = sel.picpath;
                });
            });

            
        }
    });
})();