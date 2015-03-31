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
	var $posted;
	var $new;
	var $picpath;
	var $fbpath;
}

$result = array();

if($_SERVER['REQUEST_METHOD']=="GET"){
	$db = new dbConnector();
	$link = $db->getAgent();

	$query = "select name,topic,posted,new,picpath,fbpath from imp_updates order by id desc;";

	$value = mysqli_query($link, $query);

	if(mysqli_errno($link)!=0){
		echo json_encode(array("error"=>"No Catagories to Display"));
		debug('could not connect to database : '.mysqli_errno(),'getImages');
		die("Problem !!");
	}

	while($newrow = mysqli_fetch_assoc($value)){
		$newcat = new category();
		$newcat->name = $newrow['name'];
		$newcat->posted = $newrow['posted'];
		$newcat->topic = $newrow['topic'];
		$newcat->new = $newrow['new'];
		$newcat->picpath = $newrow['picpath'];
		$newcat->fbpath = $newrow['fbpath'];
		array_push($result, $newcat);
	}
	echo json_encode($result);
}
?>