<?php
/*
 * return list of catagories in the db
 */

include_once 'dbsetting.php';
include_once 'debugger.php';
header("Content-Type:application/json");

class category{
	var $name;
	var $topic;
	var $date;
	var $time;
	var $place;
	var $picpath;
	var $fbpath;
}
$result = array();

if($_SERVER['REQUEST_METHOD']=="GET"){
	$db = new dbConnector();
	$link = $db->getAgent();

	$query = "select name,topic,date,time,place,picpath,fbpath from imp_guest order by id desc;";

	$value = mysqli_query($link, $query);

	if(mysqli_errno($link)!=0){
		echo json_encode(array("error"=>"No Catagories to Display"));
		debug('could not connect to database : '.mysqli_errno(),'getImages');
		die("Problem !!");
	}

	while($newrow = mysqli_fetch_assoc($value)){
		$newcat = new category();
		$newcat->name = $newrow['name'];
		$newcat->picpath = $newrow['picpath'];
		$newcat->date = $newrow['date'];
		$newcat->time = $newrow['time'];
		$newcat->place = $newrow['place'];
		$newcat->topic = $newrow['topic'];
		$newcat->fbpath = $newrow['fbpath'];
		array_push($result, $newcat);
	}

	echo json_encode($result);
}
?>