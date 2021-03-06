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

    $(".del-from-cart").click(deleteFromCart);
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
                                        <a data-id="${p.id_product}" class="add_to_cart" title="Add to cart" href="#">Add to cart</a>
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
    $(".add_to_cart").click(addToCart);
    
}


function addToCart(e){
    e.preventDefault();
    let idProductCart = $(this).data('id');


    $.ajax({
        type: "post",
        url: "/PHP1/BabyRoller/views/cart.php",
        data: {
          idProduct: idProductCart,
          setCartSession : true
        },
        dataType: "json",
        success: function (data, text, xhr) {
          console.log(xhr);
        },
        error: function (xhr, status, err) {
          console.log(xhr);
        },
      });
}


function deleteFromCart(e){
    e.preventDefault();
    let idDelete = $(this).data('id');

    
    $.ajax({
        type: "post",
        url: "/PHP1/BabyRoller/views/cart.php",
        data: {
          idDelete: idDelete,
          setIdeDelete : true
        },
        dataType: "json",
        success: function (data, text, xhr) {
          console.log(xhr);
          currentOnCart(data)
        },
        error: function (xhr, status, err) {
          console.log(xhr);
        },
      });
}

function currentOnCart(data){
    if(data.length > 0){
        var cont = "";

        data.forEach(function(p) {
            cont += `<tr>
                            <td class="image" data-title="No"><img src="/PHP1/BabyRoller/pictures/${p.href}" alt="'.$red->href.'"></td>
                            <td class="product-des" data-title="Description">
                                <p class="product-name"><a href="#">'.$red->product_name.'</a></p>
                            </td>
                            <td class="price" data-title="Price"><span>$'.$red->price.'</span></td>
                            <td class="qty" data-title="Qty"><!-- Input Order -->
                            <div class="input-group">
                                <div class="button minus">
                                    <button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                                        <i class="ti-minus"></i>
                                    </button>
                                </div>
                                <input type="text" name="quant[1]" class="input-number"  data-min="1" data-max="100" value="'.$kol.'">
                                <div class="button plus">
                                    <button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
                                        <i class="ti-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <!--/ End Input Order -->
                            <td class="total-amount" data-title="Total"><span>$'.$totalPerProduct.'</span></td>
                            <td class="action" data-title="Remove"><a href="#" class="del-from-cart" data-id='.$red->id_product.'><i class="ti-trash remove-icon"></i></a></td>
                        </tr>`;
        });
        
        //$("#prod-on-cart").html(cont);
    }
    else{
        $("#prod-on-cart").html("<h2>No products on cart</h2>");
    }
}