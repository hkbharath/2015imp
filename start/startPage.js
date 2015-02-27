Raphael.fn.impWheel = function (cx, cy, r, values, labels, stroke,dist) {
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

    var total = 0,
        radiuss = [80,40,20,0,20,45,-10,30],
        angle = [0,0,0,0,0,0,0,0,0],
        center = paper.circle(cx,cy,r*0.45).attr({fill:"black"}),
        centerText = paper.text(cx,cy-r*0.05,'impetus 2015')
                    .attr({fill: 'white', stroke: "none", "font-size": 24, "font-family":"alienlang",cursor:'pointer'}),
        iwidth = r*0.4/3,
        imargin = r*0.15/3,
        iy = cy + r*0.08,
        fbIcon = paper.image('images/fb-icon.png', 
                cx - 1.5 * iwidth - imargin, iy,
                iwidth, iwidth).attr({cursor:'pointer'}),
        twIcon = paper.image('images/twitter-icon.png', 
                cx + 0.5 * iwidth + imargin, iy,
                iwidth, iwidth).attr({cursor:'pointer'}),
        gpIcon = paper.image('images/google-plus-icon.png', 
                cx - 0.5 * iwidth, iy,
                iwidth, iwidth).attr({cursor:'pointer'}),
        putfront = function(){
            center.toFront();
            centerText.toFront();
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
                total = total+1;
                var value = values[j],
                    popangle = angle[j] + (angle[j+1]-angle[j])/ 2,
                    ms = 300,
                    iconRatio = img.height/img.width,
                    width = getWidth(iconRatio),
                    height = width * iconRatio,
                    name = labels[j].title,
                    hideT = 500,
                    p = sector(cx, cy, r+radiuss[j], angle[j], angle[j+1], 
                        {opacity:0.9,fill: "#007F88", stroke: stroke, "stroke-width": 10, cursor:'pointer'}, dist),
                
                    txt = paper.text(cx + (r+radiuss[j]) * 0.75 * Math.cos(-popangle * rad), 
                        cy + (r+radiuss[j]) * 0.75 * Math.sin(-popangle * rad), name.split(' ').join('\n'))
                        .attr({fill: 'white', stroke: "none", opacity: 0, "font-size": 22, 
                            "font-family":"alienlang",width:"50px",cursor:'pointer'}),
                    
                    icon = paper.image(labels[j].picpath, 
                        cx + (r+radiuss[j]) * 0.75 * Math.cos(-popangle * rad) - width * 0.5, 
                        cy + (r+radiuss[j]) * 0.75 * Math.sin(-popangle * rad) - height * 0.5, 
                        width,height).attr({cursor:'pointer'});

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
                    $('#st_space').hide('slide',{direction:"left"},hideT);
                    //console.log($('#st_'+name.split(' ')[0]));
                    $('#st_'+name.split(' ')[0]).fadeIn(2*hideT,function(){
                        $(this).trigger('visibleNow');
                        pagnav.openNewPage('st_'+name.split(' ')[0]);
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
                    $('#st_space').hide('slide',{direction:"left"},hideT);
                    //console.log(name.split(' ')
                    $('#st_'+name.split(' ')[0]).fadeIn(2*hideT,function(){
                        $(this).trigger('visibleNow');
                        pagnav.openNewPage('st_'+name.split(' ')[0]);
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
                    $('#st_space').hide('slide',{direction:"left"},hideT);
                    $('#st_'+name.split(' ')[0]).fadeIn(2*hideT,function(){
                        $(this).trigger('visibleNow');
                        pagnav.openNewPage('st_'+name.split(' ')[0]);
                    });
                });
                putfront();
            }
            img.src = labels[j].picpath;
        };
    fbIcon.click(function(){
        var win = window.open('https://https://www.facebook.com/pages/Impetus-2015/561834380517734','_blank');
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

    centerText.click(function(){
        var win = window.open('http://impetus15.in','_self');
        if(win){
            win.focus();
        }
        else{
            alert('Please allow popups for this site !');
        }
    });

    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
        angle[i+1] = total;
    }
    total = 0;
    
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};

var wheelData = [];

(function(){
	var height = Math.max(Math.round($(window).height()),600),
		width = Math.max(Math.round($(window).width()),600);
	width = Math.min(height,width);
	var	mu = window.innerHeight*0.5-width*0.5,
		ms = window.innerWidth*0.5-width*0.5;
	$("#st_space").css('margin',mu+'px '+ms+'px');

	$.get("src/getImages.php",{page:'start'})
    .done(function(data,status){
        wheelData = data;
        var values = [45,45,45,45,45,45,45,45];
		Raphael("st_space", width, height).impWheel(width*0.5, width*0.5, width*0.34, values, data, "rgba(0,0,0,0)",10);
	});
})();