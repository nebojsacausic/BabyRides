<?php
	//ob_start();
    include "views/fixed/head.php";
	include "views/fixed/header.php";
	include "views/connection.php";

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
	<body>

		<div class="container">
			<div class="row">
				<div id="admin_panel">
					<div id="admin_sidebar">
						<a href="#" id="brand_btn" class="admin-btn" name="brand_nm">Brands</a>
						<a href="#" id="cat_btn" class="admin-btn" name="cat_nm">Categories</a>
						<a href="#" id="products_btn" class="admin-btn" name="sviProizvodi">Show all products</a>
						<a href="#" id="add_product" class="admin-btn" name="add_product_nm">Add new product</a>
					</div>

					<div id="admin_center">

					<!--
						<div class="brands_list">

						<table border="1px" cellpadding='2'>
							<tr>
								<th>Id</th>
								<th>Naziv</th>
								<th>Izmjeni</th>
								<th>Obrisi</th>						
							</tr>

							<tr>
								<th>1</th>
								<th>Neki brend</th>
								<th><a href="#">Izmjeni</a></th>
								<th><a href="#">Obrisi</a></th>		
							</tr>
						</table>

							?php
								
								$querry = "select * from brand";
								$ressult = $connection->query($querry);
								$resFetch = $ressult->fetchAll();
								//var_dump($resFetch[0]->brand_name);
								$ispis = "";

								foreach($resFetch as $red){
								$ispis.="<h2>".$red->brand_name."</h2>";
								}
								echo $ispis;
							?>
						</div>

							-->




						

						
					</div>

				</div>
			</div>
		</div>

		
	</body>
</html>

<?php
    include "views/fixed/footer.php";
?>