
<?php 
$id=1;
	if(isset($_GET['id']))
		$id = $_GET['id'];
		
		?>



<html>
<head>
<link rel="shortcut icon" href="../images/logo.png">
<title>EVENTS | Impetus15.0</title>
</head>
<body>
 <script type="text/javascript" src="jquery.min.js"></script>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js">
</script>

<link rel="stylesheet" type="text/stylesheet" href="newevents.css" />  
<div class="header">IMPETUS
</div>

<div class = 'ls_wrap'>
<div class='ls_head'>
<h1>EVENTS (DAY 1)</h1>
<hr size="1">
</div>
<div class='ls_content'>
</div>
</div>

<div class= 'm_wrap'>
<div class='m_head'>
</div>
<div class='m_content' id="p">
</div>
</div>

<div class = 'rs_wrap'>
<div class='rs_head'>
<h1>EVENTS (DAY 2)</h1>
<hr size="1">
</div>
<div class='rs_content'>
</div>
</div>


<script type = "text/javascript">
	
(function(){
	        var ls_content = $('.ls_content');
			var rs_content = $('.rs_content');
			var m_content = $('.m_content');
			var m_head =$('.m_head');
			var id;
			
		
 
$.get("../src/getEvents.php",function(data){
                
                if(data.length == 0){
                  s_content.append("<p style='font-family:alienlang'> Stay tuned for updates !! </p>");
                    
                }
               
				
				for(var i=0; i<data.length ; i++){
					if(data[i].day==1)
                    {ls_content.append(("<div id='d1'><a href='newevents.php?id="+data[i].id+"'>"+(data[i].name).toUpperCase()+"</a></div>"));}
					else
					if(data[i].day==2)
                    {rs_content.append(("<div id='d1'><a href='newevents.php?id="+data[i].id+"'>"+(data[i].name).toUpperCase()+"</a></div>"));}
					
					if(data[i].id == "<?php echo $id ?>")
					{		m_head.append("<h1>"+data[i].name+"</h1>"+"<br>"+"<h3>"+data[i].date+" At "+data[i].time+"</h3>");
						m_content.append("<hr>"+"<p>"+data[i].description+"</p>");
						
				}
                }		
				
				
			
			
				
				
	});
                  
             
				
		
})();
</script>
</body>
</html>