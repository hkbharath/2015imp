(function(){
	var height =$(window).height(),
	width = $(window).width(),
    cwidth = Math.min(height,width),
    pane = $('.ws_container');
    $('.ws_container').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85});
    $('#st_workshops').bind('visibleNow',function(){
        console.log(this);
        if(pagnav.isNewPage('st_workshops')){
            var values = [45,45,45,45],
                data = [
                    {title:"about us",picpath:"images/aboutus.png",target_div:"st_about",active:0},
                    {title:"bulletins",picpath:"images/news.png",target_div:"st_bulletins",active:0},
                    {title:"workshops",picpath:"images/workshops.png",target_div:"st_workshops",active:1},
                    {title:"contact us",picpath:"images/mail.png",target_div:"st_contact",active:0}
                ];
            Raphael("st_workshops", 0.5 * cwidth, height)
            .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);
            

            $.get("src/getWorkshops.php",function(data){
                pane.jScrollPane();
                var api = pane.data('jsp');
                if(data.length == 0){
                    api.getContentPane().append("<p style='font-family:alienlang'> Stay tuned for updates !! </p>");
                    api.reinitialise();
                }
                for(var i=0; i<data.length ; i++){
                    if(data[i].type==0)
                        api.getContentPane().append("<div class='ev_element' style = 'width:95%'><div class='ev_text'><img alt='workshops' src='images/workshops.png'>"+data[i].name+"</div></div>");
                    else if(data[i].type==1)
                        api.getContentPane().append("<div class='ev_element' style = 'width:95%'><div class='ev_text'><img alt='workshops' src='images/exhibition.png'>"+data[i].name+"</div></div>");

                    api.reinitialise();
                }
                
                pane.find('.ev_element')
                .click(function(){
                    var nm = $(this).find('.ev_text').text().trim(),
                        sel = null;
                    console.log(nm);
                    for(var i=0;i<data.length;i++){
                        if(data[i].name == nm){
                            sel = data[i];
                        }
                    }

                    $('#st_popup').fadeIn('fast');
                    $('.pp_content')
                    .append("<div class = 'bu_element' style='height:94%'><div class = 'bu_name' >"+ sel.name + "<div class='st_clear'></div><div class='bu_time'>event on : "+sel.date+" "+sel.time+"</div><a href='"+sel.fbpath+"' target='_blank'><div class='bu_fb'></div></a></div><div class = 'bu_info' style='height:"+$('.pp_content').height()*0.80+"px'>"+sel.topic+"</div></div>")
                    .show('fold',1000)
                    .find('.bu_info').jScrollPane();
                    var fb = $('.pp_content').find('.bu_fb');
                    
                    fb.click(function(){
                        var win = window.open(sel.fbpath,'_blank');
                        if(win){
                            win.focus();
                        }
                        else{
                            alert('Please allow popups for this site !');
                        }
                    });
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