
<?php 
$id=1;
	if(isset($_GET['id']))
		$id = $_GET['id'];
		
		?>



<html>
<head>

</head>

<body>

 
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js">
</script>
<script src='js/perfect-scrollbar.jquery.js'></script>

<link rel="stylesheet" type="text/stylesheet" href="work.css" />

<link rel="stylesheet" type="text/stylesheet" href="css/perfect-scrollbar.css" />
 
<div class="header">IMPETUS 2015
</div>
<div class = 's_wrap'>
<div class='s_head'>
<h1>WORKSHOPS</h1>
<hr size="1">
</div>
<div class='s_content'>
</div>
</div>

<div class= 'm_wrap'>
<div class='m_head'>
</div>
<div id="scrollbox">
<div class='m_content' id="p">
</div>
</div>
</div>


<script type = "text/javascript">


	
(function(){
	        var s_content = $('.s_content');
			var m_content = $('.m_content');
			var m_head =$('.m_head');
			var id;
			
		
 
$.get("../src/getWorkshops.php",function(data){
                
                if(data.length == 0){
                  s_content.append("<p style='font-family:alienlang'> Stay tuned for updates !! </p>");
                    
                }
               
				
				for(var i=0; i<data.length ; i++){
                    s_content.append(("<div id='d1'><a href='workshopsjs.php?id="+data[i].id+"'>"+(data[i].name).toUpperCase()+"</a></div>"));
					if(data[i].id == "<?php echo $id ?>")
					{		m_head.append("<h1>"+data[i].name+"</h1>"+"<br>"+"<h3>"+data[i].date+" At "+data[i].time+"</h3>");
						m_content.append("<hr>"+'<img style="width:66%;margin-left:18%" src="'+data[i].picpath+'"/>');
						m_content.append("<p>"+data[i].topic+"</p>");
						
				}
                }		
				
				
			
			
				
				
	});
                  
             
				
		
})();

$('#scrollbox').perfectScrollbar();

/*
(function(){
	        var s_content = $('.s_content');

            $.get("../src/getWorkshops.php",function(data){
                
                if(data.length == 0){
                  s_content.append("<p style='font-family:alienlang'> Stay tuned for updates !! </p>");
                    
                }
                for(var i=0; i<data.length ; i++){
                    s_content.append("<div style='clear:both'></div><a href='#.php?id="+data[i].id+"'>"+data[i].name+"</a>");
		
					
                }		
                
             
			});
})();*/
</script>


</body>
</html>