$(document).ready(function() {
	
    $("#brand_btn").click(brandAjax);
    //$("cat_btn").click(categoryAjax);
});

//----------------------SENDING REQUESTS-------------------------

function brandAjax(){

    $.ajax({
		url: "brands.php",
		method: "post",
		dateType: "json",
		data: {
			brand: "brand"
		},
		success: function(data, textStatus, xhr){
			console.log(data);
            console.log(xhr.status)
            admin_brand(data);
		},
		error: function (err) {
			console.log(err);
		}
    });
}




//---------- BRANDS---------------

function admin_brand(data){
    var content = "";
    content += `
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
                    <td><a href='#' class='update_brand' data-id='${p.id_brand}'>Update</a></td>
                    <td><a href='#' class='delete_brand' data-id='${p.id_brand}'>Delete</a></td>
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
    $(".delete_brand").click(function () {
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
    
    $(".update_brand").click(function () {
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
    var regBrand = /^[A-Z][a-z]{3,24}$/;


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