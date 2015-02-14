<?php
	
	function debug($msg,$module){
		$logfile = 'debug/'.$module;
		// create if file i not there

		error_log($_SERVER['REMOTE_ADDR'].' '.date(DATE_RFC822).' '.$msg,3,$logfile); 
	}
?>