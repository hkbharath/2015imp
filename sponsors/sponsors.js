(function(){
	var height =$(window).height(),
	width = $(window).width(),
    cwidth = Math.min(height,width),
    pane1 = $('.sp_container1');
    pane2 = $('.sp_container2');
    $('.sp_container1').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85});
    $('.sp_container2').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85,'display':'none'});

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
            
            /*
            var r = Raphael('sp_draw',(width-cwidth*0.5)*0.85,height*0.70);
            // Custom Attribute
            r.customAttributes.arc = function (cx, cy, value, total, R, colval) {
                var alpha = 360 / total * value,
                    a = (90 - alpha) * Math.PI / 180,
                    x = cx + R * Math.cos(a),
                    y = cy - R * Math.sin(a),
                    color = "hsb(".concat(colval, ",", value / total, ", .75)"),
                    path;
                if (total == value) {
                    path = [["M", cx, cy - R], ["A", R, R, 0, 1, 1, cx - 0.01, cy - R]];
                } else {
                    path = [["M", cx, cy - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
                }
                return {path: path, stroke: color};
            };
            var cx = height*0.70*0.25,
                cy = height*0.70*0.25;
            var thing = r.path().attr({stroke: "#fff", "stroke-width": 5}).attr({arc: [cx, cy, 0, 60, 100, 0.1]});
            thing.animate({arc: [cx, cy, 60, 60, 100, 0.1]}, 1000, "<");

            cx = 2*cx+10+cx;
            var thing1 = r.path().attr({stroke: "#fff", "stroke-width": 5}).attr({arc: [cx, cy, 0, 60, 100, 0.1]});
            thing1.animate({arc: [cx, cy, 60, 60, 100, 0.1]}, 1000, "<");
            */

            pane1.jScrollPane();
            pane2.jScrollPane();

            var api1 = pane1.data('jsp'),
                api2 = pane2.data('jsp'),
                oldSponsors = $('#2014sponsors'),
                newSponsors = $('#2015sponsors'), 
                selected,
                hideT = 700,
                isOldSponsorsLoaded = false,
                isNewSponsorsLoaded = false,
                
                loadSponsorSet = function(url,divId,divHead,chooseBig){
                    if(chooseBig === undefined)
                        chooseBig = 0;
		    api1.getContentPane().append("<div class='sp_element' id = '"+divId+"'><p>"+divHead+"</p></div>");

                    var 
                        imgList = [],
                        loadImgList = [];
                    $.get(url,function(data,status){
                        if(data.length == 0){
                            return false;                                
                        }


                        var arena = api1.getContentPane().find("#"+divId),
                            divwidth = arena.width()/data.length;

                        for(var i=0; i < data.length ; i++){
                            loadImgList[i] = new Image();
                            $(loadImgList[i]).attr({'class':'sp_load'});
                            loadImgList[i].src = 'images/ajax-loader.gif';
							if( data[i].id=="49" || data[i].id=="52")
								arena.append("<div id='sp_image"+data[i].id+"' class='sp_image_container_wide'></div>");
                            if(chooseBig)
								arena.append("<div id='sp_image"+data[i].id+"' class='sp_image_container_big'></div>");
                            else
                                arena.append("<div id='sp_image"+data[i].id+"' class='sp_image_container'></div>");

                            arena.find('#sp_image'+data[i].id).append(loadImgList[i]);
                            api1.reinitialise();
                            
                            imgList[i] = new Image();
                            imgList[i].alt = data[i].title+'_'+data[i].id;

                            imgList[i].onload = function(){
                                $(this).on('click',function(){
                                    //$('#ga_popup').fadeIn('fast');
                                    console.log(this.src);
                                })
                                .attr('class','sp_image');
                                var ser = (this.alt).split('_')[1];
                                $('#sp_image'+ser+' .sp_load').hide();
                                arena.find('#sp_image'+ser).append(this);
                                api1.reinitialise();
                                
                                //console.log(this);
                            }
                            imgList[i].src = data[i].picpath;
                        }
                    });
                },
                selectOld = function(){
                    if(selected == oldSponsors)
                        return false;
                    selected = oldSponsors;
                    newSponsors.css({'color':'#e1e1e1'});
                    oldSponsors.css({'color':'#000000'});
                    pane1.fadeOut(hideT,function(){
                        pane2.fadeIn(hideT);
                        api2.getContentPane().empty();
                        api2.getContentPane().append('<img src="images/ajax-loader.gif" width="100px" style="margin-top:15%">');
                        var old = new Image();
                        old.onload = function(){
                            api2.getContentPane().empty();
                            api2.getContentPane().append(this);
                            api2.reinitialise();
                        };
                        old.src = 'images/oldSponsors.png';
                        old.alt = 'Previous Sponsors';
                        old.className = 'fullImage';
                    });
                },
                selectNew = function(){
                    if(selected == newSponsors)
                        return false;
                    selected = newSponsors;
                    oldSponsors.css({'color':'#e1e1e1'});
                    newSponsors.css({'color':'#000000'});
                    pane2.fadeOut(hideT,function(){
                        api1.getContentPane().empty();
                        pane1.fadeIn(hideT);

                        //loadSponsorSet("src/getPlatinumSponsors.php","sp_platinum","Sponsors",1);
                        
                        loadSponsorSet("src/getPlatinumSponsors.php","sp_platinum","Platinum Sponsors",1);
                        loadSponsorSet("src/getGoldSponsors.php","sp_gold","Gold Sponsors",1);
                        loadSponsorSet("src/getSupportSponsors.php","sp_support","Supported By");
                        loadSponsorSet("src/getEventSponsors.php","sp_event","Event Sponsors");
                        loadSponsorSet("src/getStyleSponsors.php","sp_style","Style Sponsors");
                        loadSponsorSet("src/getWorkshopSponsors.php","sp_workshop","Workshop Sponsors");
                        loadSponsorSet("src/getPrintSponsors.php","sp_print","Print Sponsors");
                        

                    });
                    api1.reinitialise();
                };


            //api1.getContentPane().append("<p style='font-family:alienlang'> Sponsors details will be put up soon </p>");
            
            selectNew();

            newSponsors.click(selectNew);
            oldSponsors.click(selectOld);            
        }
    });
})();
