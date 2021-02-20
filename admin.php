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
						<a href="#" id="products_btn" class="admin-btn" name="sviProizvodi">Products</a>
						<a href="#" id="add_product" class="admin-btn" name="add_product_nm">Add new product</a>
						<a href="#" id="slider_pic_btn" class="admin-btn" name="slider_pic_nm">Slider picture</a>
					</div>

					<div id="admin_center"></div>
					

				</div>
			</div>
		</div>

		
	</body>
</html>

<?php
    include "views/fixed/footer.php";
?>