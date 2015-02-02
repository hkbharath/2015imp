<?php
/*
 * return list of catagories in the db
 */

include_once 'dbsetting.php';
header("Content-Type:application/json");
class category{
	var $title;
	var $pic_path;
}
$result = array();

$db = new dbConnector();
$link = $db->getAgent();

$query = "select * from imp_catagories";

$value = mysqli_query($link, $query);

if(mysqli_errno($link)!=0){
	echo json_encode(array("error"=>"No Catagories to Display"));
	die("Problem after executing : "+$query);	
}

while($newrow = mysqli_fetch_assoc($value)){
	$newcat = new category();
	$newcat->title = $newrow['name'];
	$newcat->pic_path = $newrow['pic_path'];
	array_push($result, $newcat);
}

echo json_encode($result);

?>

