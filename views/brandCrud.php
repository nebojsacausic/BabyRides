<?php

include "connection.php";

    //--------------INSERT BRAND-------------------

    if(isset($_POST['sent'])){

        $brand = $_POST['brand'];

        //Regex back
        $regBrand = "/^[A-Z][a-z]{3,24}$/";

        $errBack = [];
        //Regex back test
        if(!preg_match($regBrand, $brand)){
            $errBack[] = "Invalid format of first name!";
        }

        //If there are no errors, entering in the database
        if(count($errBack) > 0){
            echo "Invalid entry";
        }
        else{

            $querry = "insert into brand values(null, :brand)";
            $statement = $connection -> prepare($querry);
            $statement -> bindParam(":brand", $brand);


            $result = $statement->execute() ? 201 : 500;
            $message = "Successfully added new brand!";

            //var_dump($result);

            if($result){
                http_response_code($result);
                header('Content-Type: application/json');
                echo json_encode(['message' => $message]);
            }

        }
        

        
    }

    //---------------------Delete brand----------------------------

    else if(isset($_POST['idDelete'])){
        $id_brand = $_POST['idDelete'];

        $querry = "delete from brand where id_brand = :id_brand";
        $statement = $connection -> prepare($querry);
        $statement -> bindParam(":id_brand", $id_brand);


        $result = $statement->execute() ? 201 : 500;

        //var_dump($result);

        if($result){
            http_response_code($result);
            header('Content-Type: application/json');
            echo "Brand deleted!";
        }
        else{
			echo "Brand not found in database";
		}
    }
    //-------------------Update brand---------------------
    else if(isset($_POST['sentUpdate'])){
        $brand = $_POST['brand'];
        $id_brand = $_POST['id_brand'];
        //var_dump($brand, $id_brand);

        $querry = "UPDATE brand SET brand_name=:brand WHERE id_brand = :id_brand";
        $statement = $connection -> prepare($querry);
        $statement -> bindParam(":id_brand", $id_brand);
        $statement -> bindParam(":brand", $brand);
        
        $result = $statement->execute() ? 201 : 500;
        $message = "Successfully update!";
        //var_dump($result);

        if($result){
            http_response_code($result);
            header('Content-Type: application/json');
            echo json_encode(['message' => $message]);
        }
        
    }

?>