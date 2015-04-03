<?php
	
	function debug($msg,$module,$link){
		
		$query = "insert into imp_logs(session_user,error_desc,script) values('".$_SERVER['REMOTE_ADDR']."',$msg','$module');";

		mysqli_query($link,$query);


		exit(0);
		// create if file i not there
	}
?>