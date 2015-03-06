(function(){
	var height =$(window).height(),
	width = $(window).width(),
    cwidth = Math.min(height,width),
    pane = $('.gs_container');
    $('.gs_container').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85});

    $('#st_guest').bind('visibleNow',function(){
        //console.log(this);
        if(pagnav.isNewPage('st_guest')){
            var values = [45,45,45,45],
                data = [
                    {title:"contact us",picpath:"images/mail.png",target_div:"st_contact",active:0},
                    {title:"gallery",picpath:"images/gallery.png",target_div:"st_gallery",active:0},
                    {title:"guest speakers",picpath:"images/guestspeakers.png",target_div:"st_guest",active:1},
                    {title:"sponsors",picpath:"images/sponsors.png",target_div:"st_sponsors",active:0}
                ];
            Raphael("st_guest", 0.5 * cwidth, height)
            .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);
            pane.jScrollPane();

            $.get("src/getGuestspeakers.php",function(data,status){
                var api = pane.data('jsp');
                if(data.length == 0){
                    api.getContentPane().append("<p> Information will be updated soon !! </p>");
                    api.reinitialise();
                }
                for(var i=0; i<data.length ; i++){
                    api.getContentPane().append("<div class = 'gs_element'><div class='gs_show'><div class='gs_name'> "+data[i].name+" </div></div><img src='"+data[i].picpath+"' alt='"+data[i].name+"'></div>");
                    api.reinitialise();
                }
                

                pane.find('.gs_element').hover(function(){
                    $(this).find('.gs_show').show();
                },function(){
                    $(this).find('.gs_show').hide();
                })
                .click(function(){
                    var nm = $(this).find('.gs_name').text().trim(),
                        sel = null;
                    //console.log(nm);
                    for(var i=0;i<data.length;i++){
                        if(data[i].name = nm){
                            sel = data[i];
                        }
                    }

                    $('#st_popup').fadeIn('fast');
                    $('.pp_content')
                    .append('<div>'+ sel.time +'</div>')
                    .show('fold',1000);
                });
                
            });
        }
    });
})();