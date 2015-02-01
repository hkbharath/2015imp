<?php
header("Content-Type:application/json");
session_start();
if(isset($_SESSION)){
	echo json_encode($_SESSION);
}
else{
	echo json_encode(array("user"=>"Guest","name"=>"Guest"));
}
?>
