<?php
	header("Content-Type:application/json");
	include("dbsetting.php");
	$result = array("type"=>false);
	$user = json_decode(file_get_contents('php://input'))->user;
	$db = new dbConnector;
	$link = $db->getAgent();
	$q = "select username from imp_users where username = '".$user."';";
	#echo "{'user':'".$_POST['user']."'}";
	$res = mysqli_query($link, $q);
	
	if(mysqli_num_rows($res)>0){
		$result["type"] = false;
	}
	else if(mysqli_errno($link)==0){
		$result["type"] = true;
	}
	echo json_encode($result);
	$db->destroyAgent();
	$db = null;
?>