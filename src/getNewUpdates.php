<?php
/*
 * return list of catagories in the db
 */

include_once 'dbsetting.php';
include_once 'debugger.php';
header("Content-Type:application/json");

if($_SERVER['REQUEST_METHOD']=="GET"){
	$db = new dbConnector();
	$link = $db->getAgent();

	$query = "select count(*) as cu from imp_updates where new = 1";

	$value = mysqli_query($link, $query);

	if(mysqli_errno($link)!=0){
		echo json_encode(array("error"=>"No Catagories to Display"));
		debug('could not connect to database : '.mysqli_errno($link),'getCatagory');
		die("Problem !!");
	}

	echo json_encode( mysqli_fetch_assoc($value)['cu'] > 0 );
}
?>