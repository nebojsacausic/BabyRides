<?php

    try{
        $connection = new PDO("mysql:host=localhost;dbname=baby_rides_db", "root", "");
        $connection -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $connection -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }

?>