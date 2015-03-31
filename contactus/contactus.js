(function(){
	var height = Math.max(Math.round($(window).height()),600),
    	width = Math.max(Math.round($(window).width()),600),
        cwidth = Math.min(height,width),
        pane1 = $('.cu_container1'),
        pane2 = $('.cu_container2'),
        team = $('#team'),
        contacts = $('#contacts'),
        selected,
        hideT = 1000;
        

    $('.cu_container1').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85,'top':0,'left':0});
    $('.cu_container2').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85,'top':0,'left':0,'display':'none'});
    
    pane1.jScrollPane();
    pane2.jScrollPane();

    var api1 = pane1.data('jsp'),
        api2 = pane2.data('jsp'),
        selectTeam = function(){
            if(selected == team)
                return false;
            selected = team;
            contacts.css({'color':'#e1e1e1'});
            team.css({'color':'#000000'});
            pane1.hide('slide',{direction:"right"},hideT);
            pane2.show('slide',{direction:"left"},hideT);
            api2.reinitialise();
        },
        selectContacts = function(){
            if(selected == contacts)
                return false;
            selected = contacts;
            team.css({'color':'#e1e1e1'});
            contacts.css({'color':'#000000'});
            pane2.hide('slide',{direction:"left"},hideT);
            pane1.show('slide',{direction:"right"},hideT);
            api1.reinitialise();
        };
    $('#st_contact').bind('visibleNow',function(){
        //console.log(this);
        selectContacts();
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
            

            $.get("src/getContacts.php",function(data,status){

                if(data.length==0){
                    api1.getContentPane().append("<p style='font-family:alienlang'> Contacts will be put up soon </p>")
                }
                for(var i=0; i<data.length ; i++){
                    api1.getContentPane().append("<div class = 'cu_element'><img src='"+data[i].picpath+"' class = 'cu_image'><div class = 'cu_name'> "+data[i].name+" </div><div class = 'cu_info'><label class = 'cu_l'>designation:</label> <p class = 'cu_p'> "+data[i].designation+" </p><br><label class = 'cu_l'>email id:</label> <p class = 'cu_p'> "+data[i].email+" </p><br><label class = 'cu_l'>phone : </label> <p class = 'cu_p'> "+data[i].phone+" </p> <br></div><div class='st_clear'></div><a href='"+data[i].fbpath+"' target='_blank'><div class='bu_fb'></div></a><div class='st_clear'></div></div>");
                    api1.reinitialise();
                }
                var i=0,
                    ifun = setInterval(function(){
                        api1.reinitialise();
                        i = i+1;
                        if(i==20)
                            clearInterval(ifun);
                    },1000);
            });

            $.get("src/getTeam.php",function(data,status){
            
                if(data.length==0){
                    api2.getContentPane().append("<p style='font-family:alienlang'> Contacts will be put up soon </p>")
                }
                for(var i=0; i<data.length ; i++){
                    api2.getContentPane().append("<div class = 'cu_element'><img src='"+data[i].picpath+"' class = 'cu_image'><div class = 'cu_name'> "+data[i].name+" </div><div class = 'cu_info'><label class = 'cu_l'>designation:</label> <p class = 'cu_p'> "+data[i].designation+" </p><br><label class = 'cu_l'>email id:</label> <p class = 'cu_p'> "+data[i].email+" </p><br><label class = 'cu_l'></label> <br></div><div class='st_clear'></div><a href='"+data[i].fbpath+"' target='_blank'><div class='bu_fb'></div></a><div class='st_clear'></div></div>");
                    api2.reinitialise();
                }
                var i=0,
                    ifun = setInterval(function(){
                        api2.reinitialise();
                        i = i+1;
                        if(i==20)
                            clearInterval(ifun);
                        console.log('see this');
                    },1000);
            });
            
            team.click(selectTeam);
            contacts.click(selectContacts);
        }
    });
})();