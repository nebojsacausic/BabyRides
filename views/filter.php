<?php

include "connection.php";
$limit = 0;
$offset = 6;
$brojPaginacija = 0;

if (isset($_POST['limit']))
    $limit = $_POST['limit'];
$limit = ((int) $limit) * $offset;

if (isset($_POST['postBrand'])) {

    $id = $_POST['idBrand'];
    //echo $id;


    try {
        $query = 'SELECT * FROM `products` INNER JOIN pictures ON products.id_product = pictures.id_product WHERE id_brand = ? ';

        $query = $query .= "LIMIT ?, ?";
        $prepare = $connection->prepare($query);

        $prepare->bindParam(1, $id);
        $prepare->bindParam(2, $limit, PDO::PARAM_INT);
        $prepare->bindParam(3, $offset, PDO::PARAM_INT);

        $result = $prepare->execute();
        $res = $prepare->fetchAll();
        //var_dump($res);

        $brojPaginacijaQuery = "SELECT COUNT(*) as number FROM `products` INNER JOIN pictures ON products.id_product = pictures.id_product WHERE id_brand = ?";
        $prepare = $connection->prepare($brojPaginacijaQuery);

        $prepare->bindParam(1, $id);
        $prepare->execute();
        $brojPaginacija = $prepare->fetch();

        $status = 201;
        $items = $res;
    } catch (PDOException $ex) {
        echo $ex->getMessage();
        $items = "Error";
        $status = 500;
    }
} else if (isset($_POST['postCat'])) {

    $id = $_POST['idCat'];
    //echo $id;


    try {
        $query = 'SELECT * FROM `products` INNER JOIN pictures ON products.id_product = pictures.id_product WHERE id_category = ? ';



        $query = $query .= "LIMIT ?, ?";
        // var_dump($query);

        $prepare = $connection->prepare($query);
        $prepare->bindParam(1, $id);

        $prepare->bindParam(2, $limit, PDO::PARAM_INT);

        $prepare->bindParam(3, $offset, PDO::PARAM_INT);

        $result = $prepare->execute();
        $res = $prepare->fetchAll();
        // var_dump($res);

        //DA SE ODRADI DA BINDPARAM
        $brojPaginacijaQuery = "SELECT COUNT(*) as number FROM `products` INNER JOIN pictures ON products.id_product = pictures.id_product WHERE id_category = ?";
        $prepare = $connection->prepare($brojPaginacijaQuery);

        $prepare->bindParam(1, $id);
        $prepare->execute();
        $brojPaginacija = $prepare->fetch();


        $status = 201;
        $items = $res;
    } catch (PDOException $ex) {
        $items = "Error";
        $status = 500;
    }
} else if (isset($_POST['searchProd'])) {

    $search = $_POST['search_content'];
    $search_content = "%" . $search . "%";


    try {
        $query = 'SELECT * FROM `products` INNER JOIN pictures ON products.id_product = pictures.id_product WHERE product_name like ? ';

        $query = $query .= "LIMIT ?, ?";

        $prepare = $connection->prepare($query);
        $prepare->bindParam(1, $search_content);

        $prepare->bindParam(2, $limit, PDO::PARAM_INT);
        $prepare->bindParam(3, $offset, PDO::PARAM_INT);

        $result = $prepare->execute();
        $items = $prepare->fetchAll();



        //BINDPARAM TREBA DA SE ODRADI
        $brojPaginacijaQuery = "SELECT COUNT(*) as number FROM `products` INNER JOIN pictures ON products.id_product = pictures.id_product WHERE product_name like ?";

        $prepare = $connection->prepare($brojPaginacijaQuery);
        $prepare->bindParam(1, $search_content);
        $prepare->execute();
        $brojPaginacija = $prepare->fetch();

        // var_dump($brojPaginacija);
        $status = 201;
    } catch (PDOException $ex) {
        $res = "Error";
        $status = 500;
    }
}


http_response_code($status);
header('Content-Type: application/json');
// echo json_encode($items);
echo json_encode(['data' => $items, 'numb' => $brojPaginacija]);
