$(document).ready(function() {
    
    $.ajax({
		url: "/PHP1/BabyRoller/views/getProducts.php",
		method: "post",
		dateType: "json",
		data: {
			//category: "category"
		},
		success: function(data, textStatus, xhr){
			console.log(data);
            console.log(xhr.status)
            productsPrint(data);
		},
		error: function (err) {
			console.log(err);
		}
    });


    //productsPrint();
});

function productsPrint(products){
    var content = "";

    products.forEach(function(p) {
        content += `<div class="col-lg-4 col-md-6 col-12">
                        <div class="single-product">
                            <div class="product-img">
                                <a href="product-details.html">
                                    <img class="default-img" src="/PHP1/BabyRoller/pictures/${p.href}" alt="${p.alt}">
                                </a>
                                <div class="button-head">
                                    <div class="product-action">
                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><i class=" ti-eye"></i><span>Quick Shop</span></a>
                                        <a title="Wishlist" href="#"><i class=" ti-heart "></i><span>Add to Wishlist</span></a>
                                        <a title="Compare" href="#"><i class="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                                    </div>
                                    <div class="product-action-2">
                                        <a title="Add to cart" href="#">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div class="product-content">
                                <h3><a href="product-details.html">${p.product_name}</a></h3>
                                <div class="product-price">
                                    <span>$${p.price},00</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });	
  

    $("#products_area").html(content);
}
