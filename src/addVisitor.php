<?php
	include_once 'dbsetting.php';
	include_once 'debugger.php';

	if($_SERVER['REQUEST_METHOD']=="POST"){
		$db = new dbConnector();
		$link = $db->getAgent();

		$query = "INSERT INTO visitor(address) values ('".$_SERVER['REMOTE_ADDR']."');";

		echo $query;
		$value = mysqli_query($link, $query);

		if(mysqli_errno($link)!=0){
			echo json_encode(array("error"=>"No Catagories to Display"));
			debug("Q : ".$q."\ncould not connect to database : ".mysqli_errno()."\ngetCatagory.php");
			die("Problem after executing : "+$query);
		}
	}
?>