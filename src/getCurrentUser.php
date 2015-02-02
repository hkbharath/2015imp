<?php
/*
 * return json format
 * {
 * 	user:username,
 * 	name:fullname,
 * 	privilage:userprivilage
 * }
 */

header("Content-Type:application/json");
session_start();
if(isset($_SESSION)){
	echo json_encode($_SESSION);
}
else{
	echo json_encode(array("user"=>"Guest","name"=>"Guest","privilage"=>"guest"));
}
?>
