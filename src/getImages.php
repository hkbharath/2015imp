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
}
$result = array();

if($_SERVER['REQUEST_METHOD']=="GET"){
	$db = new dbConnector();
	$link = $db->getAgent();  
	if(isset($_GET['page']))
		$query = "select name,pic_path from imp_images where page='".$_GET['page']."' order by id;";
	else
		$query = "select name,pic_path from imp_images order by id";

	$value = mysqli_query($link, $query);

	if(mysqli_errno($link)!=0){
		echo json_encode(array("error"=>"No Catagories to Display"));
		debug('database link not found : '.mysqli_errno(),'getCatagory');
		die("Problem after executing : "+$query);
	}

	while($newrow = mysqli_fetch_assoc($value)){
		$newcat = new category();
		$newcat->title = $newrow['name'];
		$newcat->picpath = $newrow['pic_path'];
		array_push($result, $newcat);
	}

	echo json_encode($result);
}
?>