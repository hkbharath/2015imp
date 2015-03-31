//add required css,js and put it is php script
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
//append the proper design
        $('.nev_content')
       // .append("<div class = 'bu_element' style='height:94%'><div class = 'bu_name' >"+ sel.name + "<div class='st_clear'></div><div class='bu_time'>event on : "+sel.date+" "+sel.time+"</div><a href='"+sel.fbpath+"' target='_blank'><div class='bu_fb'></div></a></div><div class = 'bu_info' style='height:"+$('.pp_content').height()*0.80+"px'>"+sel.description+"<div class='st_clear'></div><div id = 'show_register' class='ev_button'>Register</div></div>\
       //     <div class = 'ev_form_container'>    <div id = 'ev_notify'></div>    <form id = 'ev_form' action = 'src/regsiterUser.php'>        <input type='hidden' name = 'event' value='"+sel.name +"'>        <input type='text' name = 'name' placeholder = 'Your Sweet Name' >        <input type = 'text' name = 'college' placeholder = 'Your Great College Name' >        <input type = 'email' name ='user_email' placeholder = 'Give Us Your Proper Email' >        <input type = 'text' name = 'user_phone' placeholder = 'Your Phone Number? Trust Us we Don`t Spam :)' ><input type = 'reset' id = 'form_reset' class = 'ev_button' value = 'Cancel'><input type = 'submit' id = 'form_submit' class = 'ev_button' value = 'Register'></form></div></div>")
        .find('.bu_info').jScrollPane()

        //dont change this prt and css related to it
        .find('#show_register').click(function(){
            $('.nev_content .nev_info').fadeOut('fast',function(){
                $('.ev_form_container').show('fold',1000);    
            });
        });
        $('.ev_form_container #form_reset').click(function(){
            //preventDefault();
            $('.ev_form_container').fadeOut('fast',function(){
                $('.nev_content .nev_info').show('fold',1000);
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
})();