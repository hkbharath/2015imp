var pagnav = {
	pageQ : ["st_space"],
	maxSize : 100,
	open : 10,
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
		if(this.pageQ.length == 100)
			this.pageQ.shift();
	},
	isNewPage : function(p){
		return this.pageQ.indexOf(p) == this.pageQ.length-1;
	}
}