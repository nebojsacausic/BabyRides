<?php

include "connection.php";

    $querry = "SELECT * FROM products INNER JOIN pictures ON products.id_product = pictures.id_picture";
    $ressult = $connection->query($querry);
    $resFetch = $ressult->fetchAll();

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($resFetch);


    //-----------INSERT PRODUCT--------------------
    if(isset($_POST['sent'])){


        $title = $_POST['title'];
        $price = $_POST['price'];
        $category = $_POST['category'];
        $brand = $_POST['brand'];
        $active = $_POST['active'];
        $description = $_POST['description'];
        $picture = $_POST['picture'];

        //Regex back
        $regTitle = "/^([A-Z][a-z]{2,24})+$/";
        $regPrice = "/^[1-9][0-9]*$/";


        //Regex back test
        $errBack = [];
        if(!preg_match($regTitle, $title)){
            $errBack[] = "Invalid title format!";
        }
        if(!preg_match($regPrice, $price)){
            $errBack[] = "Invalid price!";
        }
        if($category == ""){
            $errBack[] = "Please choose category!";
        }
        if($brand == ""){
            $errBack[] = "Please choose brand!";
        }
        if($description == ""){
            $errBack[] = "Write description!";
        }
        if($picture == ""){
            $errBack[] = "Please choose picture!";
        }








        //If there are no errors, entering in the database
        if(count($errBack) > 0){
            echo "Invalid entry";
        }
        else{

            $querry = "insert into products values(null, :title, :description, :price, :active, :brand, :category, 0)";
            $statement = $connection -> prepare($querry);
            $statement -> bindParam(":title", $title);
            $statement -> bindParam(":description", $description);
            $statement -> bindParam(":price", $price);
            $statement -> bindParam(":active", $active);
            $statement -> bindParam(":brand", $brand);
            $statement -> bindParam(":category", $category);
            
            //$statement -> bindParam(":picture", $picture);


            $result = $statement->execute() ? 201 : 500;
            $message = "Successfully added new product!";

            //var_dump($result);

            if($result){
                http_response_code($result);
                header('Content-Type: application/json');
                echo json_encode(['message' => $message]);
            }
        }
        
    }
















?>