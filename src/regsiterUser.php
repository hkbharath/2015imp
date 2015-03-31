<?php
	include_once 'dbsetting.php';
	include_once 'debugger.php';

	header("Content-Type:application/json");

	if($_SERVER['REQUEST_METHOD']=="POST"){
		$db = new dbConnector();
		$link = $db->getAgent();

		if($_POST['name'] == "" || $_POST['college'] == "" || $_POST['user_phone'] == "" || $_POST['user_email'] == ""){
			echo "{\"reply\":\"error\"}";
			die("");
		}

		$query = "INSERT INTO imp_event_register(name,college,phone,email,event) values ('".$_POST['name']."','".$_POST['college']."','".$_POST['user_phone']."','".$_POST['user_email']."','".$_POST['event']."');";

		//echo $query;
		$value = mysqli_query($link, $query);

		if(mysqli_errno($link)!=0){
			echo json_encode(array("error"=>"No Catagories to Display"));
			debug("Q : ".$q."\ncould not connect to database : ".mysqli_errno()."\ngetCatagory.php");
			die("Problem after executing : ".$query);
		}

		echo "{\"reply\":\"okey\"}";
	}
	else{
		echo "{\"reply\":\"error\"}";
	}
?>