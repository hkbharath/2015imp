var pagnav = {
	pageQ : ["st_space"],
	opened : [],
	maxSize : 3,
	open : 5,
	getPrevPage : function(){
		pq = this.pageQ;
		if(pq.length>1)
			return pq[pq.length-2];
		else
			return "";
	},
	getCurrPage : function(){
		return this.pageQ[this.pageQ.length-1];
	},
	openNewPage : function(p){
		this.open = this.open - 1;
		if(this.open == 0){
			$.post('src/addVisitor.php',{});
			this.open = 100;
		}
		this.pageQ.push(p);
		if(this.pageQ.length == this.maxSize)
			this.pageQ.shift();
		if(this.opened.indexOf(p) == -1)
			this.opened.push(p);
	},
	isNewPage : function(p){
		return this.opened.indexOf(p) == -1;
	},
	openBackPage : function(){
		this.openNewPage(this.getPrevPage());
	}
}

$(window).keydown(function(e){
	if(e.keyCode == 8){
		e.preventDefault();
		$('#'+pagnav.getCurrPage()).hide('slide',{direction:"left"},500);
    	// console.log($('#st_'+name.split(' ')[0]));
    	$('#'+pagnav.getPrevPage()).fadeIn(1000,function(){
       		$(this).trigger('visibleNow');
    	});
    	pagnav.openBackPage();
    }
});