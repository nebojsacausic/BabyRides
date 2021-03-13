$(document).ready(function () {
  $(".shop-sidebar .brands_list a").click(filterBrands);
  $(".shop-sidebar .catcat_list a").click(filterCategories);
  $("#myTab li .nav-link").click(filterCategories);
  $("#search-products").keyup(searchProducts);
  //$("#first_cat").trigger('click');
});

function searchProducts() {
  var search_content = $("#search-products").val();

  $.ajax({
    url: "views/filter.php",
    method: "POST",
    dateType: "json",
    data: {
      search_content: search_content,
      searchProd: true,
    },
    success: function (data, textStatus, xhr) {
      console.log(data);
      productsPrintFilter(data.data);
      paginationSearch(data.numb.number, search_content);
    },
    error: function (xhr, text, error) {
      console.log(error);
    },
  });
}

function paginationSearch(numb, value) {
  var offset = 6;
  var pagLength = Math.ceil(numb / offset);
  //   console.log("PagLength: " + pagLength);
  var html = "<ul>";

  for (let i = 0; i < pagLength; i++) {
    var zbir = i + 1;
    html += `<li><a href='#' class='paginacija' data-limit="${i}">${zbir}</a></li>`;
  }
  html += "</ul>";
  $("#pagination").html(html);

  let pagination = document.querySelectorAll(".paginacija");
  $(pagination).click(function (e) {
    e.preventDefault();
    // console.log($(this));
    console.log($(this).attr("data-limit"));
    let limit = $(this).attr("data-limit");

    $.ajax({
      type: "post",
      url: "views/filter.php",
      data: {
        limit: limit,
        search_content: value,
        searchProd: true,
      },
      dataType: "json",
      success: function (data) {
        console.log(data);
        productsPrint(data.data);
      },
    });
  });
}

function filterCategories(e) {
  e.preventDefault();
  var idCat = $(this).attr("data-id");
  //console.log(idCat);

  $.ajax({
    url: "views/filter.php",
    method: "post",
    dateType: "json",
    data: {
      idCat: idCat,
      postCat: true,
    },
    success: function (data, textStatus, xhr) {
      productsPrintFilter(data.data);
      filterIndexCategories(data.data);
      paginationCategories(data.numb.number, idCat);
    },
    error: function (xhr, text, error) {
      console.log(error);
    },
  });
}

function paginationCategories(numb, id) {
  var offset = 6;
  var pagLength = Math.ceil(numb / offset);
  //   console.log("PagLength: " + pagLength);
  var html = "<ul>";

  for (let i = 0; i < pagLength; i++) {
    var zbir = i + 1;
    html += `<li><a href='#' class='paginacija' data-limit="${i}">${zbir}</a></li>`;
  }
  html += "</ul>";
  $("#pagination").html(html);

  let pagination = document.querySelectorAll(".paginacija");
  $(pagination).click(function (e) {
    e.preventDefault();
    let limit = $(this).attr("data-limit");

    $.ajax({
      type: "post",
      url: "views/filter.php",
      data: {
        limit: limit,
        idCat: id,
        postCat: true,
      },
      dataType: "json",
      success: function (data) {
        productsPrint(data.data);
      },
    });
  });
}

function filterBrands(e) {
  e.preventDefault();
  var idBrand = $(this).attr("data-id");
  //console.log(idBrand);

  $.ajax({
    url: "views/filter.php",
    method: "post",
    dateType: "json",
    data: {
      idBrand: idBrand,
      postBrand: true,
    },
    success: function (data, textStatus, xhr) {
      console.log(data);
      productsPrintFilter(data.data);
      paginationBrand(data.numb.number, idBrand);
    },
    error: function (xhr, text, error) {
      console.log(error);
    },
  });
}

function paginationBrand(numb, id) {
  var offset = 6;
  var pagLength = Math.ceil(numb / offset);
  //   console.log("PagLength: " + pagLength);
  var html = "<ul>";

  for (let i = 0; i < pagLength; i++) {
    var zbir = i + 1;
    html += `<li><a href='#' class='paginacija' data-limit="${i}">${zbir}</a></li>`;
  }
  html += "</ul>";
  $("#pagination").html(html);

  let pagination = document.querySelectorAll(".paginacija");
  $(pagination).click(function (e) {
    e.preventDefault();
    // console.log($(this));
    console.log($(this).attr("data-limit"));
    let limit = $(this).attr("data-limit");

    $.ajax({
      type: "post",
      url: "views/filter.php",
      data: {
        limit: limit,
        idBrand: id,
        postBrand: true,
      },
      dataType: "json",
      success: function (data) {
        console.log(data);
        productsPrint(data.data);
      },
    });
  });
}

function productsPrintFilter(products) {
  if (products.length == 0) {
    var content = `<div class="col-lg-4 col-md-6 col-12">
                            <div class="single-product">
                                <h3>No items</h3>
                            </div>
                        </div>`;

    $("#products_area").html(content);
  } else {
    var content = "";

    products.forEach(function (p) {
      content += `<div class="col-lg-4 col-md-6 col-12">
                            <div class="single-product">
                                <div class="product-img">
                                    <a href="product_details.php?id=${p.id_product}">
                                        <img class="default-img" src="pictures/${p.href}" alt="${p.alt}">
                                    </a>
                                    <div class="button-head">
                                        <div class="product-action">
                                            <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><i class=" ti-eye"></i><span>Quick Shop</span></a>
                                            <a title="Wishlist" href="#"><i class=" ti-heart "></i><span>Add to Wishlist</span></a>
                                            <a title="Compare" href="#"><i class="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                                        </div>
                                        <div class="product-action-2">
                                            <a data-id="${p.id_product}" title="Add to cart" href="#">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-content">
                                    <h3><a href="product_details.php?id=${p.id_product}">${p.product_name}</a></h3>
                                    <div class="product-price">
                                        <span>$${p.price},00</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    });

    $("#products_area").html(content);
  }
}

function filterIndexCategories(products) {
  if (products.length == 0) {
    var content = `<div class="col-lg-4 col-md-6 col-12">
                            <div class="single-product">
                                <h3>No items</h3>
                            </div>
                        </div>`;

    $("#indexCategoriesFilter").html(content);
  } else {
    var content = "";

    products.forEach(function (p) {
      content += `<div class="col-xl-3 col-lg-4 col-md-4 col-12">
                            <div class="single-product">
                                <div class="product-img">
                                    <a href="product_details.php?id=${p.id_product}">
                                        <img class="default-img" src="pictures/${p.href}" alt="${p.alt}">
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
                                    <h3><a href="product_details.php?id=${p.id_product}">${p.product_name}</a></h3>
                                    <div class="product-price">
                                        <span>$${p.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    });

    $("#indexCategoriesFilter").html(content);
  }
}
