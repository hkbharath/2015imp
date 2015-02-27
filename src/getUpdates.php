<?php
/*
 * return list of catagories in the db
 */

include_once 'dbsetting.php';
include_once 'debugger.php';
header("Content-Type:application/json");

class category{
	var $title;
	var $content;
	var $posted;
}
$result = array();

if($_SERVER['REQUEST_METHOD']=="GET"){
	$db = new dbConnector();
	$link = $db->getAgent();

	$query = "select title,content,posted from imp_updates order by id;";

	$value = mysqli_query($link, $query);

	if(mysqli_errno($link)!=0){
		echo json_encode(array("error"=>"No Catagories to Display"));
		debug('could not connect to database : '.mysqli_errno(),'getImages');
		die("Problem !!");
	}

	while($newrow = mysqli_fetch_assoc($value)){
		$newcat = new category();
		$newcat->title = $newrow['title'];
		$newcat->posted = $newrow['posted'];
		$newcat->content = $newrow['content'];
		array_push($result, $newcat);
	}

	echo json_encode($result);
}
?>