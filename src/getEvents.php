<?php
/*
 * return list of catagories in the db
 */

include_once 'dbsetting.php';
include_once 'debugger.php';
header("Content-Type:application/json");

class category{
	var $title;
	var $picpath;
	var $contents;
	var $postby;
	var $day;
}
$result = array();

if($_SERVER['REQUEST_METHOD']=="GET"){
	$db = new dbConnector();
	$link = $db->getAgent();

	$query = "select event_name,pic_path,content,postby,day from imp_events order by eid;";

	$value = mysqli_query($link, $query);

	if(mysqli_errno($link)!=0){
		echo json_encode(array("error"=>"No Catagories to Display"));
		debug('could not connect to database : '.mysqli_errno(),'getImages');
		die("Problem !!");
	}

	while($newrow = mysqli_fetch_assoc($value)){
		$newcat = new category();
		$newcat->event_name = $newrow['event_name'];
		$newcat->picpath = $newrow['pic_path'];
		$newcat->day = $newrow['day'];
		$newcat->postby = $newrow['postby'];
		$newcat->content = $newrow['content'];
		array_push($result, $newcat);
	}

	echo json_encode($result);
}
?>