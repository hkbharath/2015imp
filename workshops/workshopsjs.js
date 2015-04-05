<?php 
		$id = $_GET['id'];
?>
<html>
<body>
<script type="text/javascript" src="common/jquery.js"></script>
<script type="text/javascript" src="js/perfect-scrollbar.jquery.js"></script>
<div class = 'ga_wrapper'>
</div>

<script type = "text/javascript">
(function(){
	        var ga_wrapper = $('.ga_wrapper');

            $.get("src/getWorkshops.php",function(data){
                
                if(data.length == 0){
                  ga_wrapper.append("<p style='font-family:alienlang'> Stay tuned for updates !! </p>");
                    
                }
                for(var i=0; i<data.length ; i++){
                    ga_wrapper.append("<div style='clear:both'></div><a href='t2.php?id="+data[i].id+"'>"+data[i].name+"</a>");
					if(data[	i].id == "<?php echo $id ?>")
						ga_wrapper.append(data[i].topic);
					
                }		
                
             
			});
})();
</script>
</body>
</html>