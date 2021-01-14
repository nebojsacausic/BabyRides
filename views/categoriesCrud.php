<?php
    include "connection.php";

    $querry = "select * from categories";
	$ressult = $connection->query($querry);
    $resFetch = $ressult->fetchAll();

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($resFetch);
       



    if(isset($_POST['sent'])){

        $category = $_POST['category'];

        //Regex back
        $regCategory = "/^[A-Z][a-z]{2,12}(\s[A-Z][a-z]{2,12})?$/";

        $errBack = [];
        //Regex back test
        if(!preg_match($regCategory, $category)){
            $errBack[] = "Invalid category format!";
        }

        //If there are no errors, entering in the database
        if(count($errBack) > 0){
            echo "Invalid entry";
        }
        else{

            $querry = "insert into categories values(null, :category)";
            $statement = $connection -> prepare($querry);
            $statement -> bindParam(":category", $category);


            $result = $statement->execute() ? 201 : 500;
            $message = "Successfully added new category!";

            //var_dump($result);

            if($result){
                http_response_code($result);
                header('Content-Type: application/json');
                echo json_encode(['message' => $message]);
            }
        }
    }

    //---------------------Delete categories----------------------------

    else if(isset($_POST['idDelete'])){
        $id_category = $_POST['idDelete'];

        $querry = "delete from categories where id_category = :id_category";
        $statement = $connection -> prepare($querry);
        $statement -> bindParam(":id_category", $id_category);


        $result = $statement->execute() ? 201 : 500;

        //var_dump($result);

        if($result){
            http_response_code($result);
            header('Content-Type: application/json');
            echo "Category deleted!";
        }
        else{
			echo "Category not found in database";
		}
    }

    else if(isset($_POST['sentUpdate'])){
        $category = $_POST['category'];
        $id_category = $_POST['id_category'];
        //var_dump($brand, $id_brand);

        $querry = "UPDATE categories SET category=:category WHERE id_category = :id_category";
        $statement = $connection -> prepare($querry);
        $statement -> bindParam(":id_category", $id_category);
        $statement -> bindParam(":category", $category);
        
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