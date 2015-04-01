<?php
/*
 * return list of catagories in the db
 */

include_once 'dbsetting.php';
include_once 'debugger.php';
header("Content-Type:application/json");

class category{
	var $name;
	var $designation;
	var $email;
	var $fbpath;
	var $picpath;
}
$result = [];

if($_SERVER['REQUEST_METHOD']=="GET"){
	$db = new dbConnector();
	$link = $db->getAgent();

	$query = "select * from imp_webteam order by uid DESC";

	$value = mysqli_query($link, $query);

	if(mysqli_errno($link)!=0){
		echo json_encode(array("error"=>"No Catagories to Display"));
		debug('could not connect to database : '.mysqli_errno($link),'getCatagory');
		die("Problem !!");
	}

	while($newrow = mysqli_fetch_assoc($value)){
		$newcat = new category();
		$newcat->name = $newrow['name'];
		$newcat->designation = $newrow['designation'];
		$newcat->email = $newrow['email'];
		$newcat->fbpath = $newrow['fbpath'];
		$newcat->picpath = $newrow['picpath'];
		array_push($result, $newcat);
	}

	echo json_encode($result);
}
?>