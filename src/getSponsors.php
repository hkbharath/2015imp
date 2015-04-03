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
	var $id;
}
$result = array();

if($_SERVER['REQUEST_METHOD']=="GET" && isset($_GET['type'])){
	$db = new dbConnector();
	$link = $db->getAgent();

	$query = "select id,name,pic_path from imp_images where page='".$_GET['type']."' order by id;";

	$value = mysqli_query($link, $query);

	if(mysqli_errno($link)!=0){
		echo json_encode(array("error"=>"No Catagories to Display"));
		debug(mysqli_error($link),'getSppponsors',$link);
	}

	while($newrow = mysqli_fetch_assoc($value)){
		$newcat = new category();
		$newcat->title = $newrow['name'];
		$newcat->picpath = $newrow['pic_path'];
		$newcat->id = $newrow['id'];
		array_push($result, $newcat);
	}

	$db->close($link);
	echo json_encode($result);
}
?>