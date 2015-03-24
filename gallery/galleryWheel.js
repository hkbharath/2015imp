var test  = null;

Raphael.fn.sideWheel = function (cx, cy, r, values, labels, stroke,dist) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params, dist) {
        var cy = cy + dist * Math.sin(-(startAngle+(endAngle-startAngle)/2) * rad),
            cx = cx + dist * Math.cos(-(startAngle+(endAngle-startAngle)/2) * rad),
            x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }

    var radiuss = [-15,30,50,-15],
        angle = [-90,0,0,0],
        center = paper.circle(cx,cy,r*0.45).attr({fill:"black"}),
        iwidth = r*0.4/3,
        imargin = r*0.15/3,
        xmargin = r*0.10,
        ms = 500,
        hideT = 500,
        height = $(window).height(),
        fbIcon = paper.image('images/fb-icon.png', 
                cx  + xmargin, cy - 1.5 * iwidth - imargin,
                iwidth, iwidth).attr({cursor:'pointer'}),
        twIcon = paper.image('images/twitter-icon.png', 
                cx + xmargin, cy - 0.5 * iwidth,
                iwidth, iwidth).attr({cursor:'pointer'}),
        gpIcon = paper.image('images/google-plus-icon.png', 
                cx + xmargin, cy + 0.5 * iwidth + imargin,
                iwidth, iwidth).attr({cursor:'pointer'}),
        home = sector(0, 0, r*0.45, -90, 0, 
                    {opacity:0.3,fill: '#007F88', cursor:'pointer'}, 0),
        back = sector(0, height, r*0.45, 0, 90, 
                    {opacity:0.3,fill: '#007F88', cursor:'pointer'}, 0),
        homeIcon = paper.image('images/home.png', 
                xmargin, xmargin,
                iwidth, iwidth).attr({cursor:'pointer'}),
        backIcon = paper.image('images/back.png', 
                xmargin, height-xmargin-iwidth,
                iwidth, iwidth).attr({cursor:'pointer'}),
        homeText = paper.text(1.5*iwidth,1.5*iwidth,"home")
                    .attr({fill: 'white', stroke: "none", opacity: 0, "font-size": 22, 
                    "font-family":"alienlang",cursor:'pointer'}),
        putfront = function(){
            center.toFront();
            fbIcon.toFront();
            twIcon.toFront();
            gpIcon.toFront();
        },
        getWidth = function(rt){
            if(rt>1.3)
                return r * .125;
            else
                return r * .16666;
        },
        process = function (j) {
            var img = new Image();
            img.onload = function(){
                var value = values[j],
                    popangle = angle[j] + (angle[j+1]-angle[j])/ 2,
                    ms = 300,
                    iconRatio = img.height/img.width,
                    width = getWidth(iconRatio),
                    height = width * iconRatio,
                    name = labels[j].title,
                    p = sector(cx, cy, r+radiuss[j], angle[j], angle[j+1], 
                        {opacity:0.9,fill: "#007F88", stroke: stroke, "stroke-width": 10, cursor:'pointer'}, dist),
                
                    txt = paper.text(cx + (r+radiuss[j]) * 0.75 * Math.cos(-popangle * rad), 
                        cy + (r+radiuss[j]) * 0.75 * Math.sin(-popangle * rad), name.split(' ').join('\n'))
                        .attr({fill: 'white', stroke: "none", opacity: 0, "font-size": 22, 
                            "font-family":"alienlang",cursor:'pointer'}),
                    
                    icon = paper.image(labels[j].picpath, 
                        cx + (r+radiuss[j]) * 0.75 * Math.cos(-popangle * rad) - width * 0.5, 
                        cy + (r+radiuss[j]) * 0.75 * Math.sin(-popangle * rad) - height * 0.5, 
                        width,height).attr({cursor:'pointer'});

                if(labels[j].active==1){
                    p.stop().animate({transform: "s1.02 1.02 " + cx + " " + cy}, ms, "elastic");
                    p.attr({fill:'#049296'});
                    txt.stop().animate({opacity: 1}, ms, "elastic");
                    icon.stop().animate({opacity:0}, ms, "elastic");
                }
                else if (labels[j].active==0) {
                    p.mouseover(function () {
                        p.stop().animate({transform: "s1.02 1.02 " + cx + " " + cy}, ms, "elastic");
                        p.attr({fill:'#049296'});
                        txt.stop().animate({opacity: 1}, ms, "elastic");
                        icon.stop().animate({opacity:0}, ms, "elastic");
                    }).mouseout(function () {
                        p.stop().animate({transform: ""}, ms, "elastic");
                        p.attr({fill:'#007F88'});
                        txt.stop().animate({opacity: 0}, ms);
                        icon.stop().animate({opacity:1}, ms, "elastic");
                    }).click(function(){
                        $('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},hideT);
                        // console.log($('#st_'+name.split(' ')[0])
                        $('#'+labels[j].target_div).fadeIn(2*hideT,function(){
                            $(this).trigger('visibleNow');
                            pagnav.openNewPage(labels[j].target_div);
                        });
                    });

                    icon.mouseover(function(){
                        p.stop().animate({transform: "s1.02 1.02 " + cx + " " + cy}, ms, "elastic");
                        p.attr({fill:'#049296'});
                        txt.stop().animate({opacity: 1}, ms, "elastic");
                        icon.stop().animate({opacity:0}, ms, "elastic");
                    }).mouseout(function(){
                        p.stop().animate({transform: ""}, 0, "elastic");
                        p.attr({fill:'#007F88'});
                        txt.stop().animate({opacity: 0}, 0);
                        icon.stop().animate({opacity:1}, 0, "elastic");
                    }).click(function(){
                        $('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},hideT);
                        //console.log(name.split(' ')[0])
                        $('#'+labels[j].target_div).fadeIn(2*hideT,function(){
                            $(this).trigger('visibleNow');
                            pagnav.openNewPage(labels[j].target_div);
                        });
                    });

                    txt.mouseover(function(){
                        p.stop().animate({transform: "s1.02 1.02 " + cx + " " + cy}, ms, "elastic");
                        p.attr({fill:'#049296'});
                        txt.stop().animate({opacity: 1}, ms, "elastic");
                        icon.stop().animate({opacity:0}, ms, "elastic");
                    }).mouseout(function(){
                        p.stop().animate({transform: ""}, 0, "elastic");
                        p.attr({fill:'#007F88'});
                        txt.stop().animate({opacity: 0}, 0);
                        icon.stop().animate({opacity:1}, 0, "elastic");
                    }).click(function(){
                        $('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},hideT);
                        // console.log($('#st_'+name.split(' ')[0]));
                        $('#'+labels[j].target_div).fadeIn(2*hideT,function(){
                            $(this).trigger('visibleNow');
                            pagnav.openNewPage(labels[j].target_div);
                        });
                    });
                }
                else if(labels[j].active==-1){
                    p.mouseover(function () {
                        p.stop().animate({transform: "s1.02 1.02 " + cx + " " + cy}, ms, "elastic");
                        p.attr({fill:'#049296'});
                    }).mouseout(function () {
                        p.stop().animate({transform: ""}, ms, "elastic");
                        p.attr({fill:'#007F88'});
                    }).click(function(){
                        $('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},hideT);
                        // console.log($('#st_'+name.split(' ')[0]));
                        //console.log(labels[j].target_div);
                        $('#'+labels[j].target_div).fadeIn(2*hideT,function(){
                            $(this).trigger('visibleNow');
                            pagnav.openNewPage(labels[j].target_div);
                        });
                    });

                    icon.mouseover(function(){
                        p.stop().animate({transform: "s1.02 1.02 " + cx + " " + cy}, ms, "elastic");
                        p.attr({fill:'#049296'});
                    }).mouseout(function(){
                        p.stop().animate({transform: ""}, 0, "elastic");
                        p.attr({fill:'#007F88'});
                    }).click(function(){
                        $('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},hideT);
                        // console.log($('#st_'+name.split(' ')[0]));
                        //console.log(labels[j].target_div);
                        $('#'+labels[j].target_div).fadeIn(2*hideT,function(){
                            $(this).trigger('visibleNow');
                            pagnav.openNewPage(labels[j].target_div);
                        });
                    });
                }
                putfront();
            }
            img.src = labels[j].picpath;
        };
    fbIcon.click(function(){
        var win = window.open('https://www.facebook.com/pages/Impetus-2015/561834380517734','_blank');
        if(win){
            win.focus();
        }
        else{
            alert('Please allow popups for this site !');
        }
    });

    gpIcon.click(function(){
        var win = window.open('https://plus.google.com','_blank');
        if(win){
            win.focus();
        }
        else{
            alert('Please allow popups for this site !');
        }
    });

    twIcon.click(function(){
        var win = window.open('https://twitter.com','_blank');
        if(win){
            win.focus();
        }
        else{
            alert('Please allow popups for this site !');
        }
    });

    home.mouseover(function () {
        home.stop().animate({transform: "s1.02 1.02 " + 0 + " " + 0}, ms, "elastic");
        homeText.stop().animate({opacity: 1}, ms, "elastic");
        homeIcon.stop().animate({opacity:0}, ms, "elastic");
    }).mouseout(function () {
        home.stop().animate({transform: ""}, ms, "elastic");
        homeText.stop().animate({opacity: 0}, ms);
        homeIcon.stop().animate({opacity:1}, ms, "elastic");
    }).click(function(){
        $('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},hideT);
        // console.log($('#st_'+name.split(' ')[0]));
        $('#'+'st_space').fadeIn(2*hideT,function(){
            $(this).trigger('visibleNow');
            pagnav.openNewPage('st_space');
        });
    });

    homeIcon.mouseover(function () {
        home.animate({transform: "s1.02 1.02 " + 0 + " " + 0}, ms, "elastic");
        
        homeText.animate({opacity: 1}, ms, "elastic");
        homeIcon.animate({opacity:0}, ms, "elastic");
    }).mouseout(function () {
        home.animate({transform: ""}, ms, "elastic");
        homeText.animate({opacity: 0}, ms);
        homeIcon.animate({opacity:1}, ms, "elastic");
    }).click(function(){
        $('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},hideT);
        // console.log($('#st_'+name.split(' ')[0]));
        $('#'+'st_space').fadeIn(2*hideT,function(){
            $(this).trigger('visibleNow');
            pagnav.openNewPage('st_space');
        });
    });

    homeText.mouseover(function () {
        home.animate({transform: "s1.02 1.02 " + 0 + " " + 0}, ms, "elastic");
        homeText.animate({opacity: 1}, ms, "elastic");
        homeIcon.animate({opacity:0}, ms, "elastic");
    }).mouseout(function () {
        home.animate({transform: ""}, ms, "elastic");
        homeText.animate({opacity: 0}, ms);
        homeIcon.animate({opacity:1}, ms, "elastic");
    }).click(function(){
        $('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},hideT);
        // console.log($('#st_'+name.split(' ')[0]));
        $('#'+'st_space').fadeIn(2*hideT,function(){
            $(this).trigger('visibleNow');
            pagnav.openNewPage('st_space');
        });
    });

    back.mouseover(function () {
        back.stop().animate({transform: "s1.02 1.02 " + 0 + " " + height}, ms, "elastic");
    }).mouseout(function () {
        back.stop().animate({transform: ""}, ms, "elastic");
    }).click(function(){
        $('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},hideT);
        // console.log($('#st_'+name.split(' ')[0]));
        $('#'+pagnav.getPrevPage()).fadeIn(2*hideT,function(){
            $(this).trigger('visibleNow');
            pagnav.openBackPage();
        });
        
    });

    backIcon.mouseover(function () {
        back.animate({transform: "s1.02 1.02 " + 0 + " " + height}, ms, "elastic");
    }).mouseout(function () {
        back.animate({transform: ""}, ms, "elastic");
    }).click(function(){
        $('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},hideT);
        // console.log($('#st_'+name.split(' ')[0]));
        $('#'+pagnav.getPrevPage()).fadeIn(2*hideT,function(){
            $(this).trigger('visibleNow');
            pagnav.openBackPage();
        });
        
    });

    for (var i = 0, ii = values.length; i < ii; i++) {
        angle[i+1] = angle[i]+values[i];
    }

    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};

(function(){
	var height = $(window).height(),
		width = $(window).width(),
	   cwidth = Math.min(height,width);
	var	mu = window.innerHeight*0.5-cwidth*0.5,
		ms = window.innerWidth*0.5-cwidth*0.5,
        pane1 = $('.ga_container1'),
        pane2 = $('.ga_container2'),
        g2014 = $('#2014gallery'),
        g2015 = $('#2015gallery'),
        imgList = [];
    $('.ga_wrapper').css({'height':height*0.75,'width':(width-cwidth*0.5)*0.85,
        top:height*0.07,left:cwidth*0.5+10});
    $('.ga_container1').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85});
    $('.ga_container2').css({'height':height*0.70,'width':(width-cwidth*0.5)*0.85,'display':'none'});
    
    $('#st_gallery').bind('visibleNow',function(){
        //console.log(this);
        if(pagnav.isNewPage('st_gallery')){
            var values = [45,45,45,45],
                data = [
                    {title:"workshops",picpath:"images/workshops.png",target_div:"st_workshops",active:0},
                    {title:"contact us",picpath:"images/mail.png",target_div:"st_contact",active:0},
                    {title:"gallery",picpath:"images/gallery.png",target_div:"",active:1},
                    {title:"guest speakers",picpath:"images/guestspeakers.png",target_div:"st_guest",active:0}
                ];
            Raphael("st_gallery", 0.5 * cwidth, height)
            .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);

            var selected = null,
                hideT = 1000,
                isFirstTime2014 = false,
                isFirstTime2015 = false,
                selectg2015 = function(){
                    if(selected == g2015)
                        return false;
                    selected = g2015;
                    pane2.fadeOut(hideT,function(){
                        pane1.fadeIn(hideT);
                    });
                    
                    g2015.css({'color':'#000000'});
                    g2014.css({'color':'#e1e1e1'});
                    if(!isFirstTime2015){
                        $.get('src/getImages.php',{page:'gallery'})
                        .done(function(data,status){
                            pane1.jScrollPane();
                            var api1 = pane1.data('jsp');
                            if(data.length==0){
                                api1.getContentPane().append("<p style='font-family:alienlang'> Photoes will be put up soon </p>");
                            }
                            for(var i=0; i < data.length ; i++){
                                imgList[i] = new Image();
                                imgList[i].alt = "Images From UVCE Its Really Fun";

                                imgList[i].onload = function(){
                                    $(this).on('click',function(){
                                        //$('#ga_popup').fadeIn('fast');
                                        console.log(this.src);
                                    })
                                    .attr('class','ga_image');
                                    api1.getContentPane().append($(this));
                                    api1.reinitialise();
                                    
                                    console.log(this);
                                }
                                imgList[i].src = data[i].picpath;
                            }
                        });
                        isFirstTime2015 = true;
                    }
                },
                selectg2014 = function(){
                    if(selected == g2014)
                        return false;
                    selected = g2014;
                    pane1.fadeOut(hideT,function(){
                        pane2.fadeIn(hideT);
                    });
                    g2014.css({'color':'#000000'});
                    g2015.css({'color':'#e1e1e1'});
                    if(!isFirstTime2014){
                        $.get('src/getImages.php',{page:'old'})
                        .done(function(data,status){
                            pane2.jScrollPane();
                            var api2 = pane2.data('jsp');
                            if(data.length==0){
                                api2.getContentPane().append("<p style='font-family:alienlang'> Photoes will be put up soon </p>");
                            }
                            for(var i=0; i < data.length ; i++){
                                imgList[i] = new Image();
                                imgList[i].alt = "Images From UVCE Its Really Fun";

                                imgList[i].onload = function(){
                                    $(this).on('click',function(){
                                        //$('#ga_popup').fadeIn('fast');
                                        console.log(this.src);
                                    })
                                    .attr('class','ga_image');
                                    api2.getContentPane().append($(this));
                                    api2.reinitialise();
                                    
                                    console.log(this);
                                }
                                imgList[i].src = data[i].picpath;
                            }
                        });
                        isFirstTime2014 = true;
                    }
                };

                selectg2015();

                g2015.click(selectg2015);
                g2014.click(selectg2014);
        }
    });
    /*
    .customScrollbar({
          skin: "default-skin", 
          hScroll: false,
          updateOnWindowResize: true
    })*/
})();


/* should produse trigger
and should be compatable for current page prev page transactions */