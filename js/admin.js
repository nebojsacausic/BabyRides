$(document).ready(function() {
	
    $("#brand_btn").click(brandAjax);
    $("#cat_btn").click(categoryAjax);
    $("#add_product").click(addProduct);
});

//----------------------SENDING REQUESTS-------------------------
//Brands request
function brandAjax(){

    $.ajax({
		url: "brands.php",
		method: "post",
		dateType: "json",
		data: {
			brand: "brand"
		},
		success: function(data, textStatus, xhr){
			//console.log(data);
            //console.log(xhr.status)
            admin_brand(data);
		},
		error: function (err) {
			console.log(err);
		}
    });
}

//Categories request
function categoryAjax(){
    console.log("oooo")
    $.ajax({
		url: "/PHP1/BabyRides/views/categoriesCrud.php",
		method: "post",
		dateType: "json",
		data: {
			category: "category"
		},
		success: function(data, textStatus, xhr){
			console.log(data);
            console.log(xhr.status)
            admin_category(data);
		},
		error: function (err) {
			console.log(err);
		}
    });
}







function addProduct(){
    var content = "";

    content += 
    `<h3 style="text-align:center;">Add new item</h3></br>
    <form class="form" method="post" action="#">
		<div class='form_item'>
            <label>Title: <span>*</span></label></br>
		    <input type="text" id="add_item_title" name="add_item_nm" class="ele_forme_input">
        </div>
        <div class='form_item'>
            <label>Price: <span>*</span></label></br>
		    <input type="number" id="add_item_price" name="add_item_price" class="ele_forme_input">
        </div>

        <div class="add_item_dropdown" id="add_item_category">;
        </div>


        <div class="add_item_dropdown" id="add_item_brand">
        </div>

        <div class="add_item_active" id='add_active_id'>
            <table cellpadding='2'>
                <tr>
                    <td>Active:</td>
                    <td>Not active:</td>						
                </tr>
                <tr>
                    <td><input type="radio" value="1" name="add_item_nm" class="" checked="checked"></td>
                    <td><input type="radio" value="0" name="add_item_nm" class=""></td>						
                </tr>
            </table>
        </div>

        <div class='form_item'>
            <label>Description: <span>*</span></label></br>
		    <textarea name="add_item_nm" class="ele_forme_input" id="add_item_description"> </textarea>
        </div>

        <div class='form_item_pic'>
            <label>Picture:</label></br>
            <input type="file" name="pic_nm" id="add_pic" class="add_item_pic">
        </div>

        <div class='form_item'>
            <div class="btn_add_item">
                <input type="button" name="add_item_btn" id="add_item_button" class="btn" value="Confirm">
            </div>
        </div>

        
    
	</form>`;

    $("#admin_center").html(content);

    $("#add_item_button").click(productsCheck);


    //Ajax request for brands dropdown
    $.ajax({
		url: "brands.php",
		method: "post",
		dateType: "json",
		data: {
			brand: "brand"
		},
		success: function(data, textStatus, xhr){
			//console.log(data);
            console.log(xhr.status)
            dropdownBrands(data);
		},
		error: function (err) {
			console.log(err);
		}
    });
    
    //Ajax request for category dropdown
    $.ajax({
		url: "/PHP1/BabyRides/views/categoriesCrud.php",
		method: "post",
		dateType: "json",
		data: {
			category: "category"
		},
		success: function(data, textStatus, xhr){
			//console.log(data);
            console.log(xhr.status)
            dropdownCat(data);
		},
		error: function (err) {
			console.log(err);
		}
    });
    
}

function dropdownBrands(data){
    var content = `<label>Brands: <span>*</span></label></br>
    <select class="ele_forme_input"><option value='0'></option>`;

    data.forEach( function(p) {
    content += `<option value='${p.id_brand}'>${p.brand_name}</option>`;
    });
    content += `</select>`;

    $("#add_item_brand").html(content);
}


function dropdownCat(data){
    var content = `<label>Categories: <span>*</span></label></br>
    <select class="ele_forme_input"><option value='0'></option>`;

    data.forEach( function(p) {
    content += `<option value='${p.id_category}'>${p.category}</option>`;
    });
    content += `</select>`;

    $("#add_item_category").html(content);
}









//---------- CATEGORIES---------------

function admin_category(data){
    var content = "";
    content += `
    <h3 style="text-align:center;">Categories</h3></br>
    <div class="categories_list">

        <table cellpadding='2'>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Update</th>
                <th>Delete</th>						
            </tr>
    `;
    data.forEach(function(p) {
        content += `<tr>
                    <td>${p.id_category}</td>
                    <td class='naziv'>${p.category}</td>
                    <td><a href='#' class='update' data-id='${p.id_category}'>Update</a></td>
                    <td><a href='#' class='delete' data-id='${p.id_category}'>Delete</a></td>
                    </tr>`;
        });	

    content +=    
        ` </table>
            </div> 
                <form class="form" method="post" action="#">
					<div class="row">
						<div class="col-lg-6 col-md-6 col-12">
							<div class="form-group">
								<label>Brand name: </label>
								<input type="text" name="category_nm" id="category">
							</div>
					    </div>
							
						<div class="btn_register">
							<input type="button" name="category_btn_nm" id="category_add" class="btn" value="ADD">
						</div>
					</div>
				</form>`;

    $("#admin_center").html(content);
    $("#category_add").click(categoryCheck);

    
    //------------------DELETE CATEGORIES--------------------
    $(".delete").click(function () {
        var idDelete = $(this).data("id");
        console.log(idDelete)

        $.ajax({
            url: "/PHP1/BabyRides/views/categoriesCrud.php",
            method: "post",
            dateType: "json",
            data: {
                idDelete: idDelete		
            },
            success: function(data){
                // console.log(data)
                console.log(data);
            },
            error: function (x,z,y) {
                console.log(x,z,y);
            }
        })
    })

    //-------------------UPDATE CATEGORIES-----------------
    
    $(".update").click(function () {
        var idUpdate = $(this).data("id");
        var category = $(this).parent().parent().find("td.naziv").text();

        content += `<form class="form" method="post" action="#">
                        <div class="row">
                                <div class="col-lg-6 col-md-6 col-12">
                                    <div class="form-group">
                                        <label>New brand name: </label>
                                        <input type="text" name="update_category_nm" id="update_category">
                                    </div>
                                </div>
                                
                                <div class="btn_register">
                                    <input type="button" name="category_btn_nm" id="category_update_btn" class="btn" value="UPDATE">
                                </div>
                        </div>
                    </form>`;
        
    $("#admin_center").html(content);
    $("#update_category").val(category);

    $("#category_update_btn").click(function(){
        var entry_category = $("#update_category").val();
        console.log(entry_category);
        console.log(idUpdate);

        $.ajax({
            url : "/PHP1/BabyRides/views/categoriesCrud.php",
            method : "post",
            dataType: "json",
            data : {
                category : entry_category,
                id_category : idUpdate,
                sentUpdate : true
            },
            success : function(data){
                console.log("Sve ok sa serverom");
                console.log(data);
            },
            error : function(xhr, status, errorMsg){
                console.log("Nesto nije ok sa serverom");
            }
        });
    })
    })
};
//Regular expression on brands adding
function categoryCheck(){
    console.log("dodajj");
    var entry_category = $("#category").val();
    console.log(entry_category);

    //Regex
    var regCategory = /^[A-Z][a-z]{2,12}(\s[A-Z][a-z]{2,12})?$/;
    ///^[A-Z][a-z]{3,24}(\s[A-Z][a-z]{3,24})?$/;


    var arrayErr = [];
    //Regex front test
    if(!regCategory.test(entry_category)){
        $("#category").css({"border": "1px solid red"});
        arrayErr.push("Invalid format of brand name!");
        //$("#fName").parent().append("<span>Ne valja ti ime</span>");
    }
    else{
        $("#category").css({"border": "none"});
    }

    if(arrayErr.length == 0){
        console.log("nema gresaka")
        $.ajax({
            url : "/PHP1/BabyRides/views/categoriesCrud.php",
            method : "post",
            dataType: "json",
            data : {
                category : entry_category,
                sent : true
            },
            success : function(data){
                console.log("Sve ok sa serverom");
                console.log(data);
            },
            error : function(xhr, status, errorMsg){
                console.log("Nesto nije ok sa serverom");
            }
        });
    }
    else{
        for(var i=0; i<arrayErr.length;i++){
            console.log(arrayErr[i]);
        };
    }
}





//---------- BRANDS---------------

function admin_brand(data){
    var content = "";
    content += `
    <h3 style="text-align:center;">Brands</h3></br>
    <div class="brands_list">

        <table cellpadding='2'>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Update</th>
                <th>Delete</th>						
            </tr>
    `;
    data.forEach(function(p) {
        content += `<tr>
                    <td>${p.id_brand}</td>
                    <td class='naziv'>${p.brand_name}</td>
                    <td><a href='#' class='update' data-id='${p.id_brand}'>Update</a></td>
                    <td><a href='#' class='delete' data-id='${p.id_brand}'>Delete</a></td>
                    </tr>`;
        });	

    content +=    
        ` </table>
            </div> 
                <form class="form" method="post" action="#">
					<div class="row">
						<div class="col-lg-6 col-md-6 col-12">
							<div class="form-group">
								<label>Brand name: </label>
								<input type="text" name="brand_nm" id="brand">
							</div>
					    </div>
							
						<div class="btn_register">
							<input type="button" name="brand_btn_nm" id="brand_add" class="btn" value="ADD">
						</div>
					</div>
				</form>`;

    $("#admin_center").html(content);
    $("#brand_add").click(brandCheck);


    //------------------DELETE BRAND--------------------
    $(".delete").click(function () {
        var idDelete = $(this).data("id");
        console.log(idDelete)

        $.ajax({
            url: "/PHP1/BabyRides/views/brandCrud.php",
            method: "post",
            dateType: "json",
            data: {
                idDelete: idDelete		
            },
            success: function(data){
                // console.log(data)
                console.log(data);
            },
            error: function (x,z,y) {
                console.log(x,z,y);
            }
        })
    })

    //-------------------UPDATE BRAND-----------------
    
    $(".update").click(function () {
        var idUpdate = $(this).data("id");
        var brand = $(this).parent().parent().find("td.naziv").text();

        content += `<form class="form" method="post" action="#">
                        <div class="row">
                                <div class="col-lg-6 col-md-6 col-12">
                                    <div class="form-group">
                                        <label>New brand name: </label>
                                        <input type="text" name="update_brand_nm" id="update_brand">
                                    </div>
                                </div>
                                
                                <div class="btn_register">
                                    <input type="button" name="brand_btn_nm" id="brand_update_btn" class="btn" value="UPDATE">
                                </div>
                        </div>
                    </form>`;
        
    $("#admin_center").html(content);
    $("#update_brand").val(brand);

    $("#brand_update_btn").click(function(){
        var entry_brand = $("#update_brand").val();
        console.log(entry_brand);
        console.log(idUpdate);

        $.ajax({
            url : "/PHP1/BabyRides/views/brandCrud.php",
            method : "post",
            dataType: "json",
            data : {
                brand : entry_brand,
                id_brand : idUpdate,
                sentUpdate : true
            },
            success : function(data){
                console.log("Sve ok sa serverom");
                console.log(data);
            },
            error : function(xhr, status, errorMsg){
                console.log("Nesto nije ok sa serverom");
            }
        });
    })
    })

    
};
//Regular expression on brands adding
function brandCheck(){
    console.log("dodajj");
    var entry_brand = $("#brand").val();
    console.log(entry_brand);

    //Regex
    var regBrand = /^[A-Z][a-z]{2,12}(\s[A-Z][a-z]{2,12})?$/;


    var arrayErr = [];
    //Regex front test
    if(!regBrand.test(entry_brand)){
        $("#brand").css({"border": "1px solid red"});
        arrayErr.push("Invalid format of brand name!");
        //$("#fName").parent().append("<span>Ne valja ti ime</span>");
    }
    else{
        $("#brand").css({"border": "none"});
    }

    if(arrayErr.length == 0){
        console.log("nema gresaka")
        $.ajax({
            url : "/PHP1/BabyRides/views/brandCrud.php",
            method : "post",
            dataType: "json",
            data : {
                brand : entry_brand,
                sent : true
            },
            success : function(data){
                console.log("Sve ok sa serverom");
                console.log(data);
            },
            error : function(xhr, status, errorMsg){
                console.log("Nesto nije ok sa serverom");
            }
        });
    }
    else{
        for(var i=0; i<arrayErr.length;i++){
            console.log(arrayErr[i]);
        };
    }
}


//----------PRODUCTS-------------

function productsCheck(){
    //regex new product
    var entry_title = $("#add_item_title").val();
    var entry_price = $("#add_item_price").val();
    var entry_category = $("#add_item_category > select > option:checked").val();
    var entry_brand = $("#add_item_brand > select > option:checked").val();
    var entry_active = $("#add_active_id input[name=add_item_nm]:checked").val();
    var entry_description = $("#add_item_description").val();
    var entry_picture = $(".form_item_pic input:file").val();
    //entry_pictures.push($(".add_item_pic").val())
    var splitPic = entry_picture.split("\\");
    var picture = splitPic[splitPic.length - 1];
    
    //var pic_nm = $("#add_pic");
    //console.log(pic_nm);


    var regTitle = /^([A-Z][a-z]{2,24})+$/;
    var regPrice = /^[1-9][0-9]*$/;


    var arrayErr = [];
    //Regex front test
    if(!regTitle.test(entry_title)){
        //console.log("ne valja");
        $("#add_item_title").css({"border": "1px solid red"});
        arrayErr.push("Invalid format of title!");
    }
    else{
        //console.log("valja");
        $("#add_item_title").css({"border": "none"});
    }

    if(!regPrice.test(entry_price)){
        //console.log("ne valja");
        $("#add_item_price").css({"border": "1px solid red"});
        arrayErr.push("Invalid price format!");
    }
    else{
        //console.log("valja");
        $("#add_item_price").css({"border": "none"});
    }

    if(entry_category == ""){
        //console.log("ne valja kat");
        $("#add_item_category select").css({"border": "1px solid red"});
        arrayErr.push("Invalid category!");
    }
    else{
        //console.log("valja kat");
        $("#add_item_category select").css({"border": "none"});
    }

    if(entry_brand == ""){
        //console.log("ne valja brend");
        $("#add_item_brand select").css({"border": "1px solid red"});
        arrayErr.push("Invalid brand!");
    }
    else{
        //console.log("valja kat");
        $("#add_item_brand select").css({"border": "none"});
    }

    if(entry_description == " "){
        //console.log("ne valja brend");
        $("#add_item_description").css({"border": "1px solid red"});
        arrayErr.push("Invalid description!");
    }
    else{
        //console.log("valja kat");
        $("#add_item_description").css({"border": "none"});
    }

    if(picture == ""){
        //console.log("ne valja brend");
        $("#add_pic").css({"border": "1px solid red"});
        arrayErr.push("Invalid brand!");
    }
    else{
        //console.log("valja kat");
        $("#add_pic").css({"border": "none"});
    }







    
    if(arrayErr.length == 0){
        console.log("nema gresaka")
        $.ajax({
            url : "/PHP1/BabyRides/views/productsCrud.php",
            method : "post",
            dataType: "json",
            data : {
                title : entry_title,
                price : entry_price,
                category : entry_category,
                brand : entry_brand,
                active : entry_active,
                description : entry_description,
                picture : picture,
                sent : true
            },
            success : function(data){
                console.log("Sve ok sa serverom");
                console.log(data);
            },
            error : function(xhr, status, errorMsg){
                console.log("Nesto nije ok sa serverom");
            }
        });
    }
    else{
        for(var i=0; i<arrayErr.length;i++){
            console.log(arrayErr[i]);
        };
    }
}