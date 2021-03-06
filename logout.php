<?php 
	session_start();
	if(isset($_SESSION['users'])){
		unset($_SESSION['users']);
		session_destroy();

		unset($_SESSION['users']);
		session_destroy();
		header("Location: index.php");
	}
	else{
		header("Location: index.php");		
	}
 ?>
