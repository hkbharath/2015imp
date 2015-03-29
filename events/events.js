(function(){
    
    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function notifyError(error) {
        var sel = $('.ev_form_container #ev_notify');
        sel.empty();
        sel.append('<p>'+error+'</p>')
        .fadeIn(400);
    }

	var height = $(window).height(),
	width = $(window).width(),
    cwidth = Math.min(height,width);

    $('.ev_wrapper').css({'height':height*0.75,'width':(width-cwidth*0.5)*0.85,
        top:height*0.07,left:cwidth*0.5+10});
    $('.ev_subwrapper').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.3825});

    $('#st_events').bind('visibleNow',function(){

        if(pagnav.isNewPage('st_events')){
            var cele = $(this),
                values = [45,45,45,45],
                data = [
                    {title:"guest speakers",picpath:"images/guestspeakers.png",target_div:'st_guest',active:0},
                    {title:"sponsors",picpath:"images/sponsors.png",target_div:"st_sponsors",active:0},
                    {title:"events",picpath:"images/events.png",target_div:"",active:1},
                    {title:"about us",picpath:"images/aboutus.png",target_div:"st_about",active:0}
                ];
            Raphael("st_events", 0.5 * cwidth, height)
            .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);
            
            $.get('src/getEvents.php',function(data,status){
                var api1 = $('.ev_container1').jScrollPane().data('jsp'),
                    api2 = $('.ev_container2').jScrollPane().data('jsp'),
                    o=0,t=0;
                for(var i=0 ;i < data.length;i++){
                    if(data[i].day == 1){
                        api1.getContentPane().append("<div class='ev_element'\
                            style = \"\">\
                            <div class='ev_text' >"+data[i].name+"</div>\
                            </div>");
                        api1.reinitialise();
                        o=1;
                    }
                    else{
                        api2.getContentPane().append("<div class='ev_element'\
                            style = \"\">\
                            <div class='ev_text' >"+data[i].name+"</div>\
                            </div>");
                        api2.reinitialise();
                        t=1;
                    }
                }

                if(o==0){
                    api1.getContentPane().append("<div class='ev_text' > Comming Up..</div>")
                }
                if(t==0){
                    api2.getContentPane().append("<div class='ev_text' > Comming Up..</div>")
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
                    .append("<div class = 'bu_element' style='height:94%'><div class = 'bu_name' >"+ sel.name + "<div class='st_clear'></div><div class='bu_time'>event on : "+sel.date+" "+sel.time+"</div><a href='"+sel.fbpath+"' target='_blank'><div class='bu_fb'></div></a></div><div class = 'bu_info' style='height:"+$('.pp_content').height()*0.80+"px'>"+sel.description+"<div class='st_clear'></div><div id = 'show_register' class='ev_button'>Register</div></div>\
                        <div class = 'ev_form_container'>    <div id = 'ev_notify'></div>    <form id = 'ev_form' action = 'src/regsiterUser.php'>        <input type='hidden' name = 'event' value='"+sel.name +"'>        <input type='text' name = 'name' placeholder = 'Your Sweet Name' >        <input type = 'text' name = 'college' placeholder = 'Your Great College Name' >        <input type = 'email' name ='user_email' placeholder = 'Give Us Your Proper Email' >        <input type = 'text' name = 'user_phone' placeholder = 'Your Phone Number? Trust Us we Don`t Spam :)' ><input type = 'reset' id = 'form_reset' class = 'ev_button' value = 'Cancel'><input type = 'submit' id = 'form_submit' class = 'ev_button' value = 'Register'></form></div></div>")
                    .show('fold',1000)
                    .find('.bu_info').jScrollPane()
                    .find('#show_register').click(function(){
                        $('.pp_content .bu_info').fadeOut('fast',function(){
                            $('.ev_form_container').show('fold',1000);    
                        });
                    });
                    $('.ev_form_container #form_reset').click(function(){
                        //preventDefault();
                        $('.ev_form_container').fadeOut('fast',function(){
                            $('.pp_content .bu_info').show('fold',1000);
                        });
                    });
                    $('.ev_form_container #ev_form').submit(function(e){
                        if( $('input[name = "name"').val() === ""){
                            e.preventDefault();
                            notifyError('Please Give us Valid Name');
                            return false;
                        }
                        if( $('input[name = "college"').val() === ""){
                            e.preventDefault();
                            notifyError('Please Give us Valid College Name');
                            return false;
                        }
                        var chk = $('input[name = "user_email"').val();
                        if( chk === "" || validateEmail(chk) ){
                            e.preventDefault();
                            notifyError('Please Give us Valid Email-Id');
                            return false;
                        }
                        chk = $('input[name = "user_phone"').val();
                        if( chk === "" || isNaN(chk) || chk.length != 10){
                            e.preventDefault();
                            notifyError('Please Give us Valid Phone Number');
                            return false;
                        }
                    })
                });
            });
        }
    });
})();