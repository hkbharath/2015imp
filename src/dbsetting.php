<?php

class dbConnector{
	var $user = "root";
	var $password="";
	var $host="localhost";
	var $database = "impetus";
	var $link = null;
	function getAgent(){
		$this->link = mysqli_connect($this->host, $this->user, $this->password, $this->database);
		mysqli_set_charset($this->link, 'utf8mb4');
		return $this->link;
	}
}
?>
