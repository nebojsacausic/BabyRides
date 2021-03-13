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


	<!-- Breadcrumbs -->
	<div class="breadcrumbs">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="bread-inner">
						<ul class="bread-list">
							<li><a href="index.php">Home<i class="ti-arrow-right"></i></a></li>
							<li class="active"><a href="products.php">Shop Grid</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- End Breadcrumbs -->

	<!-- Product Style -->
	<section class="product-area shop-sidebar shop section">
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-md-4 col-12 products_sidebar">
					<div class="shop-sidebar">
						<!-- Single Widget -->
						<div class="single-widget category">
							<h3 class="title">Search</h3>
							<ul class="categor-list brands_list">

								<form class="search-products-form">
									<input type="text" placeholder="Search here..." name="search" id="search-products">
								</form>

							</ul>
						</div>
						<!-- Single Widget -->
						<div class="single-widget category">
							<h3 class="title">Brands</h3>
							<ul class="categor-list brands_list">

								<?php

								$querry = "select * from brand";
								$ressult = $connection->query($querry);
								$resFetch = $ressult->fetchAll();
								//var_dump($resFetch[0]->brand_name);
								$ispis = "";

								foreach ($resFetch as $red) {
									$ispis .= "<li><a href='#' data-id=" . $red->id_brand . ">" . $red->brand_name . "</a></li>";
								}
								echo $ispis;
								?>

							</ul>
						</div>
						<!--/ End Single Widget -->
						<!-- Single Widget -->
						<div class="single-widget category">
							<h3 class="title">Categories</h3>
							<ul class="categor-list catcat_list">

								<?php

								$querry = "select * from categories";
								$ressult = $connection->query($querry);
								$resFetch = $ressult->fetchAll();
								//var_dump($resFetch[0]->brand_name);
								$ispis = "";

								foreach ($resFetch as $red) {
									$ispis .= "<li><a href='#' data-id=" . $red->id_category . ">" . $red->category . "</a></li>";
								}
								echo $ispis;
								?>

							</ul>
						</div>
						<!--/ End Single Widget -->


					</div>
				</div>
				<div class="col-lg-9 col-md-8 col-12" style="margin: 0px">
					
					
					<div class="row" id="products_area">






					</div>
					<div id="pagination">

					</div>
				</div>
			</div>
		</div>
	</section>
	<!--/ End Product Style 1  -->



</body>

</html>

<?php
include "views/fixed/footer.php";
?>