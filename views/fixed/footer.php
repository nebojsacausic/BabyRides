<!-- Start Footer Area -->
<footer class="footer">
		<!-- Footer Top -->
		<div class="footer-top section">
			<div class="container">
				<div class="row">
					<div class="col-lg-5 col-md-6 col-12">
						<!-- Single Widget -->
						<div class="single-footer about">
							<div class="logo">
								<a href="index.html"><img src="images/logo2.png" alt="#"></a>
							</div>
							<p class="text">What's more important than your baby's safety? A stroller is one of your most crucial purchases. Even if you try it out in the store, it’s hard to know how it will handle in real life. Consumer Reports buys and tests dozens of strollers, with you and your baby in mind. </p>
							<p class="call">Got Question? Call us 24/7<span><a href="tel:060 801-582">+060 801-582</a></span></p>
						</div>
						<!-- End Single Widget -->
					</div>
					<div class="col-lg-2 col-md-6 col-12">
						<!-- Single Widget -->
						<div class="single-footer links">
							<h4>Menu</h4>
							<ul>
								<?php

								$query = "select * from menu";
								$result = $connection->query($query);
								$resFetch = $result->fetchAll();
								//var_dump($resFetch[0]->brand_name);
								$content = "";

								$selfFull = ($_SERVER['PHP_SELF']);
								$selfArray = explode("/", $selfFull);
								$self = $selfArray[count($selfArray)-1];
								//echo($self);

								foreach($resFetch as $res){
									if($res->href == $self){
										$content.="<li class='active'><a href=".$res->href.">".$res->title."</a></li>";
									}
									else{
										$content.="<li><a href=".$res->href.">".$res->title."</a></li>";
									}
									
								}
								echo $content;


								$admNav = "";
								if(isset($_SESSION['users'])){
									if($_SESSION['users']->role_id == "1"){
										if($self == "admin.php"){
											$admNav.="<li class='active'><a href='admin.php'>Admin</a></li>";
										}
										else{
											$admNav.="<li><a href='admin.php'>Admin</a></li>";
										}
										echo $admNav;
										
									}
									else if($_SESSION['users']->role_id == "2"){
										$admNav.="<li><a href='questionnaire.php'>Questionnaire</a></li>";
										echo $admNav;
									}
								};
								?>
							</ul>
						</div>
						<!-- End Single Widget -->
					</div>
					
					<div class="col-lg-3 col-md-6 col-12">
						<!-- Single Widget -->
						<div class="single-footer social">
							<h4>Get In Tuch</h4>
							<!-- Single Widget -->
							<div class="contact">
								<ul>
									<li>NO. 342 - London Oxford Street.</li>
									<li>012 United Kingdom.</li>
									<li>info@eshop.com</li>
									<li>+032 3456 7890</li>
								</ul>
							</div>
							<!-- End Single Widget -->
							<ul>
								<li><a href="https://web.facebook.com/" target="_blank"><i class="ti-facebook"></i></a></li>
								<li><a href="https://twitter.com/" target="_blank"><i class="ti-twitter" target="_blank"></i></a></li>
								<li><a href="https://www.flickr.com/" target="_blank"><i class="ti-flickr" target="_blank"></i></a></li>
								<li><a href="https://www.instagram.com/" target="_blank"><i class="ti-instagram" target="_blank"></i></a></li>
							</ul>
						</div>
						<!-- End Single Widget -->
					</div>
				</div>
			</div>
		</div>
		<!-- End Footer Top -->
		<div class="copyright">
			<div class="container">
				<div class="inner">
					<div class="row">
						<div class="col-lg-6 col-12">
							<div class="left">
								<p>Copyright © 2020 <a href="http://www.wpthemesgrid.com" target="_blank">Wpthemesgrid</a>  -  All Rights Reserved.</p>
							</div>
						</div>
						<div class="col-lg-6 col-12">
							<div class="right">
								<img src="images/payments.png" alt="#">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
	<!-- /End Footer Area -->
 
	<!-- Jquery -->
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery-migrate-3.0.0.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<!-- Popper JS -->
	<!-- Bootstrap JS -->
	<script src="js/bootstrap.min.js"></script>
	<!-- Color JS -->
	<!-- Slicknav JS -->
	<script src="js/slicknav.min.js"></script>
	<!-- Owl Carousel JS -->
	<!-- Magnific Popup JS -->
	<!-- Waypoints JS -->
	<!-- Countdown JS -->
	<!-- Nice Select JS -->
	<script src="js/nicesellect.js"></script>
	<!-- Flex Slider JS -->
	<!-- ScrollUp JS -->
	<!-- Onepage Nav JS -->
	<!-- Easing JS -->
	<!-- Active JS -->
	<script src="js/active.js"></script>


	<!-- My JS -->
	<script src="js/register.js" type="text/javascript"></script>
	<script src="js/login.js" type="text/javascript"></script>
	<script src="js/brands.js" type="text/javascript"></script>
	<script src="js/admin.js" type="text/javascript"></script>
	<script src="js/show_products.js" type="text/javascript"></script>
	<script src="js/regexProducts.js" type="text/javascript"></script>
	<script src="js/main.js" type="text/javascript"></script>
	<script src="js/filter.js" type="text/javascript"></script>
	<script src="js/regexSlider.js" type="text/javascript"></script>
	<script src="js/regexProdUpdate.js" type="text/javascript"></script>
	<script src="js/cart.js" type="text/javascript"></script>
	<script src="js/contactCheck.js" type="text/javascript"></script>
</body>
</html>