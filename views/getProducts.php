<?php

include "connection.php";


$limit = 0;
$offset = 6;
if (isset($_POST['limit']))
    $limit = $_POST['limit'];
$limit = ((int) $limit) * $offset;

$querry = "SELECT * FROM products INNER JOIN pictures ON products.id_product = pictures.id_product
                INNER JOIN categories ON products.id_category = categories.id_category
                INNER JOIN brand ON products.id_brand = brand.id_brand ";

$querry = $querry .= "LIMIT ?, ?";

$prepare = $connection->prepare($querry);

$prepare->bindParam(1, $limit, PDO::PARAM_INT);
$prepare->bindParam(2, $offset, PDO::PARAM_INT);

$ressult = $prepare->execute();
$resFetch = $prepare->fetchAll();

$brojPaginacija = $connection->query("SELECT COUNT(*) as number FROM products INNER JOIN pictures ON products.id_product = pictures.id_product
INNER JOIN categories ON products.id_category = categories.id_category
INNER JOIN brand ON products.id_brand = brand.id_brand")->fetch();

http_response_code(200);
header('Content-Type: application/json');
echo json_encode(['data' => $resFetch, 'numb' => $brojPaginacija]);
