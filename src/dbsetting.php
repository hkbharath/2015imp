<?php

class dbConnector{
	var $user = "root";
	var $password="";
	var $host="localhost";
	var $database = "impetus";
	var $link = null;
	/*
	var $user = "u477083082_udb";
	var $password="mypass@udb";
	var $host="localhost";
	var $database = "u477083082_udb";
	var $link = null;
	*/
	function getAgent(){
		$this->link = mysqli_connect($this->host, $this->user, $this->password, $this->database);
		return $this->link;
	}
	
	function destroyAgent(){
		mysqli_close($this->link);
		$this->link = null;
	}
}
?>