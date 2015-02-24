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

    var radiuss = [-10,30,80,40],
        angle = [-90,0,0,0],
        center = paper.circle(cx,cy,r*0.45).attr({fill:"black"}),
        iwidth = r*0.4/3,
        imargin = r*0.15/3,
        xmargin = r*0.10,
        fbIcon = paper.image('images/fb-icon.png', 
                cx  + xmargin, cy - 1.5 * iwidth - imargin,
                iwidth, iwidth).attr({cursor:'pointer'}),
        twIcon = paper.image('images/twitter-icon.png', 
                cx + xmargin, cy - 0.5 * iwidth,
                iwidth, iwidth).attr({cursor:'pointer'}),
        gpIcon = paper.image('images/google-plus-icon.png', 
                cx + xmargin, cy + 0.5 * iwidth + imargin,
                iwidth, iwidth).attr({cursor:'pointer'}),
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
                    hideT = 1000,
                    p = sector(cx, cy, r+radiuss[j], angle[j], angle[j+1], 
                        {opacity:0.8,fill: "#007F88", stroke: stroke, "stroke-width": 10, cursor:'pointer'}, dist),
                
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
                        $('#st_gallery').hide('slide',{direction:"left"},hideT);
                        // console.log($('#st_'+name.split(' ')[0]));
                        $('#'+labels[j].target_div).fadeIn(2*hideT);
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
                        $('#st_gallery').hide('slide',{direction:"left"},hideT);
                        //console.log(name.split(' ')[0]);
                        $('#'+labels[j].target_div).fadeIn(2*hideT);
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
                        $('#st_gallery').hide('slide',{direction:"left"},hideT);
                        //console.log(name.split(' ')[0]);
                        $('#'+labels[j].target_div).fadeIn(2*hideT);
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
                        $('#st_gallery').hide('slide',{direction:"left"},hideT);
                         console.log($('#st_'+name.split(' ')[0]));
                        $('#'+labels[j].target_div).fadeIn(2*hideT);
                    });

                    icon.mouseover(function(){
                        p.stop().animate({transform: "s1.02 1.02 " + cx + " " + cy}, ms, "elastic");
                        p.attr({fill:'#049296'});
                    }).mouseout(function(){
                        p.stop().animate({transform: ""}, 0, "elastic");
                        p.attr({fill:'#007F88'});
                    }).click(function(){
                        $('#st_gallery').hide('slide',{direction:"left"},hideT);
                        $('#'+labels[j].target_div).fadeIn(2*hideT);
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

    for (var i = 0, ii = values.length; i < ii; i++) {
        angle[i+1] = angle[i]+values[i];
    }

    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};

(function(){
	var height = Math.max(Math.round($(window).height()*0.95),600),
		width = Math.max(Math.round($(window).width()*0.95),600),
	   cwidth = Math.min(height,width);
	var	mu = window.innerHeight*0.5-cwidth*0.5,
		ms = window.innerWidth*0.5-cwidth*0.5;
	$("#st_space").css('margin',mu+'px '+ms+'px');

    var values = [45,45,45,45],
        data = [
            {title:"",picpath:"images/back.png",target_div:"st_space",active:-1},
            {title:"contac us",picpath:"images/mail.png",target_div:"st_contact",active:0},
            {title:"gallery",picpath:"images/gallery.png",target_div:"",active:1},
            {title:"Home",picpath:"images/home.png",target_div:"st_space",active:0}
        ];
	Raphael("st_gallery", 0.5 * cwidth, cwidth)
    .sideWheel(0, cwidth*0.5, cwidth*0.34, values, data, "rgba(0,0,0,0)",10);
    
    $('#ga_wrapper').css({'height':height*0.7,'width':(width-cwidth*0.5)*0.92,left:0.5*cwidth});
    $('.ga_container').css({'height':height*0.66,'width':(width-cwidth*0.5)*0.92});
    $('#st_gallery').bind('visibleNow',function(){
        console.log(this);
        $('.ga_container').jScrollPane();
    })
    /*
    .customScrollbar({
          skin: "default-skin", 
          hScroll: false,
          updateOnWindowResize: true
    })*/
    ;

    var imgList = [];
    $.get('src/getImages.php',{page:'gallery'})
        .done(function(data,status){
            console.log(data);
            for(var i=0; i < data.length ; i++){
                imgList[i] = new Image();
                imgList[i].alt = "Images From UVCE Its Really Fun"
                imgList[i].onload = function(){
                    $(this).addClass('ga_image')
                    .on('click',function(){
                        $('#ga_popup').fadeIn('fast');
                        console.log(this.src);
                    });
                    $('.ga_container').append(this);
                    console.log(this);  
                }
                imgList[i].src = data[i].picpath;
            }
        });
})();