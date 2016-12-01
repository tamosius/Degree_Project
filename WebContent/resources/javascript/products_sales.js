
// display all products available
function getProducts(path){
	
	var products = "";
	
	$.ajax({
		
		type: "GET",
		url  : path,
		dataType : "json",
		async    : false,
		success: function(data, status, e){
			
			products = data;
		},
		error: function(e){
			
			alert("Failed get All Products!");
		}
	});
	return products;
}

// get products by category
function getByCategoryProducts(category){
	
	var products = "";
	
    $.ajax({
		
		type: "POST",
		url  : "/Degree_Project/products/getByCategoryProducts",
		data : {category : category},
		dataType : "json",
		async    : false,
		success: function(data, status, e){
			
			products = data;
		},
		error: function(e){
			
			alert("Failed get Products by Category!");
		}
	});
    return products;
}

// display products retrieved (all products or by category)
function displayProducts(products){
	
	$("#display_products_block .products_displayed").empty();
	
	$.each(products, function(key, value){
		
		$("#display_products_block .products_displayed").append(
				
				"<div class='product_block'>"
				   + "<input type='hidden' id='product_id' value='" + value.id + "' />"

				   + "<div class='image'>"
					  + "<img src='resources/images/productsImages/" + value.imagePath +"' />"
				   + "</div>"
				   
				   + "<div class='product_info_block'>"

					   + "<div class='product_info'>"
						    + "<div>Price €:</div>"
						    + "<span id='price'>" + value.price + "</span>"
					   + "</div>"
					   
					   + "<div class='product_info'>"
						    + "<div>Product:</div>"
						    + "<span class='name'>" + value.name + "</span>"
					   + "</div>"
					
					   + "<div class='product_info'>"
						    + "<div>Manufacturer:</div>"
						    + "<span>" + value.manufacturer + "</span>"
					   + "</div>"
					
					   + "<div class='product_info'>"
						    + "<div>Units in Stock:</div>"
						    + "<span id='available'>" + value.units + "</span>"
					   + "</div>"
					
				       + "<div class='product_info'>"
						    + "<div>Status:</div>"
						    + "<span>" + value.status + "</span>"
					   + "</div>"
				   + "</div>"
				   
				   + "<div class='product_block_bottom'>"
				        + "<button class='order_button'>Reserve</button>"
				        + "<button class='sell_button'>Sell</button>"
				        + "<button class='remove_button'>Remove</button>"
				        + "<button class='update_button'>Update</button>"
				   + "</div>"

			    + "</div>"
				); // end of 'append'
		
	}); // end of 'each' method
}

/*===============================================================================================*/
// display sold / reserved products along with the customer details
function displaySoldReservedProducts(products, action){  // receive type of action, 'sold' or 'reserved'
	
	var block = action.localeCompare("sold") === 0 ? "#sold_products_block" : "#reserved_products_block";
	
    $(block + " .products_displayed").empty();
	console.log(JSON.stringify(products));
	$.each(products, function(key, value){
		
		$(block + " .products_displayed").append(
				
				"<div class='product_block'>"
				   + "<input type='hidden' id='product_id' value='" + value.id + "' />"

				   + "<div class='image'>"
					  + "<img src='resources/images/productsImages/" + value.imagePath +"' />"
				   + "</div>"
				   
				   + "<div class='product_info_block'>"

					   + "<div class='product_info'>"
						    + "<div>Price €:</div>"
						    + "<span id='price'>" + value.price + "</span>"
					   + "</div>"
					   
					   + "<div class='product_info'>"
						    + "<div>Quantity:</div>"
						    + "<span>" + value.quantity + "</span>"
					   + "</div>"
					
					   + "<div class='product_info'>"
						    + "<div>Total Price €:</div>"
						    + "<span>" + value.totalPrice + "</span>"
					   + "</div>"
					
					   + "<div class='product_info'>"
						    + "<div>Product Name:</div>"
						    + "<span id='available'>" + value.name + "</span>"
					   + "</div>"
					
				   + "</div>" // end of 'product_info_block'
				   
				   + "<div class='bottom_table'>"
				   
				        + "<table>"
				           + (action.localeCompare("sold") === 0 ? 
				        		"<tr class='bottom_table_header'><td>Customer Name</td><td>Purchased Date</td></tr>" :
				        		"<tr class='bottom_table_header'><td>Customer Name</td><td>Reserved Date</td><td>Valid Until</td></tr>")
				           + (action.localeCompare("sold") === 0 ? 
				        		"<tr class='bottom_table_body'><input type='hidden' id='member_id' value='" + value.memberId + "' /><td>" + value.firstName + " " + value.lastName + "</td><td>" + value.purchasedDate + "</td></tr>" :
					        	"<tr class='bottom_table_body'><input type='hidden' id='member_id' value='" + value.memberId + "' /><td>" + value.firstName + " " + value.lastName + "</td><td>" + value.reservedDate + "</td><td>" + value.expireDate + "</td></tr>")
				        + "</table>"
				        
				   + "</div>" // end of 'bottom_table'

			    + "</div>"  // end of 'product_block'
				); // end of 'append'
	}); // end of 'each' method
}

// clear all fields in 'Add New Product' section
function clearAddNewProductFields(){
	
	$("#add_new_product_block #add_new_product_upload").val("");
	$("#add_new_product_block .image img").attr("src", "resources/images/productsImages/no_image.jpg");
	$("#add_new_product_block #product_name").val("");
	$("#add_new_product_block #manufacturer").val("");
	$("#add_new_product_block #price").val("");
	$("#add_new_product_block #stock").val("");
	$("#add_new_product_block #product_description_block textarea").val("");
}


/*====================================================================================================================================*/
/*-------- JQUERY READY --------------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){
		
/*===================================================================================================================================*/
/*--------- ADD NEW PRODUCT TO THE DATABASE -----------------------------------------------------------------------------------------*/
	$("#add_new_product_block").delegate("form", "submit", function(event){
		
		// get the values from the fields and tags of the form
		var formData = new FormData($(this)[0]);
		
		// clear 'delete_member_confirm_window' before showing new confirmation
        $(".confirm_settings_window .details_message").empty();
		
		$(".confirm_settings_window #top_message").text(" - Are you sure to add the Product?:");
        
        $(".confirm_settings_window .details_message")
            .html("<div>Category:<label>" + $(this).find("#productCategory option:selected").text() + "</label></div>" +
            		
            	  "<div>Product Name:<label>" + $(this).find("#product_name").val() + "</label></div>" +
            		
            	  "<div>Manufacturer:<label>" + $(this).find("#manufacturer").val() + "</label></div>" +
            		
            	  "<div>Product Price:<label>" + $(this).find("#price").val() + "</label></div>" +
                  
                  "<div>Units in Stock:<label>" + $(this).find("#stock").val() + "</label></div>" +
                  
                  "<div>Status:<label>" + $("input[name=status]:checked").val() + "</label></div>");
      
        // show up the 'delete_member_confirm_window' and background overlay also
        $(".confirm_window_background_overlay, .confirm_settings_window").slideDown(250);
        
        $(".confirm_settings_window .confirm_button").click(function(){
            
            // remove a previously-attached event handler from the button
            $(".confirm_settings_window .confirm_button").unbind("click");
            
            $(".confirm_window_background_overlay, .confirm_settings_window").slideUp(250);
            
        	$.ajax({
                type        : "POST",
                url         : "/Degree_Project/products/addProduct",
                data        :  formData,
                //contentType : "application/json; charset=utf-8",
                //dataType    : "json",
                processData : false,  // these has to be done in order upload image to work
                contentType : false,
                //cache       : false,
                async       : false,
                success     : function (data, status, jqXHR) {
                    
            		// display successfully added product name in the 'popup_window'
                    $(".popup_window").html("<img id='check_in_image' src='resources/images/loading1.jpg' />" +
        			                       "<div id='popup_window_text'><strong>" + $(this).find("#product_name").val() + "</strong><br>" +
        					               "has been successfully added to the database!</div>")
        					               .fadeIn().delay(3000).fadeOut(500);         	
                },
                error: function (xhr) {
                    alert("Failed to add New Product!");
                }
                
            });
        	$(".confirm_settings_window .confirm_button").unbind("click");
        	
        	clearAddNewProductFields();  // clear all fields after new product added
         });
        
    	
        /*------------------- CANCEL ADD NEW PRODUCT, 'No' BUTTON ------------------*/
        $(".confirm_settings_window .cancel_button").click(function(){
        	
            $(".confirm_window_background_overlay, .confirm_settings_window").slideUp(250);
        });
		
		event.preventDefault();
	});
	
	
    
/*===================================================================================================================================*/
/*-------- CLICK BUTTON IN THE LEFT PRODUCTS BLOCK ('Add New Product', 'Display Products', etc.) ------------------------------------*/
	$(".products_content").delegate("#left_products_block div", "click", function(){
		
		// get button clicked by value, 0 = Add New Product, 1 = Display Products, 2 = Update Product
		var settingType = parseInt($(this).find(":input").val());
		
		$("#left_products_block div").removeClass("highlighted_settings_row");
		
		$(this).addClass("highlighted_settings_row");
		
		if(settingType === 0){
			
			// hide 'display_products_block', 'update_product_block', etc.
			$("#display_products_block, #sold_products_block, #reserved_products_block").hide();
			
			// display 'add_new_product_block'
            $("#add_new_product_block").slideDown(250);
			
		}else if(settingType === 1){
			
			// hide 'add_new_product_block', 'update_product_block', etc.
			$("#add_new_product_block, #sold_products_block, #reserved_products_block").hide();
			
			var products = getProducts("/Degree_Project/products/getAllProducts");  // get all products from the database available (function at the top file)
			
			displayProducts(products);
			
			// display 'display_products_block'
			$("#display_products_block").slideDown(250);
			
			
		}else if(settingType === 2){
			
			// hide 'add_new_product_block', 'display_products_block', etc.
			$("#add_new_product_block, #display_products_block, #reserved_products_block").hide();
			
			var soldProducts = getProducts("/Degree_Project/products/soldProducts");
			
			displaySoldReservedProducts(soldProducts, "sold");  // pass type of action, 'sold' in this case
			
			// display 'sold_products_block'
			$("#sold_products_block").slideDown(250);
			
		}else if(settingType === 3){
			
			// hide 'add_new_product_block', 'display_products_block', etc.
			$("#add_new_product_block, #display_products_block, #sold_products_block").hide();
			
			var soldProducts = getProducts("/Degree_Project/products/reservedProducts");
			
			displaySoldReservedProducts(soldProducts, "reserved");  // pass type of action, 'reserved' in this case
			
			// display 'reserved_products_block'
			$("#reserved_products_block").slideDown(250);
			
		}
		
	});
/*=====================================================================================================================================*/
	
	
/*-------- DISPLAY DROP-DOWN MENU WHEN CLICKED (products categories) ------------------------------------------------------------------*/
	$(".products_content").delegate("#right_products_block #products_types", "click", function(){
		
		$("#right_products_block #products_dropdown").animate({
			
			height: "toggle"
		});
	});
	
/*-------- SELECT PRODUCT CATEGORY FROM DROP-DOWN MENU ('Protein', 'Accessories', etc.) -------------------------------------------*/
	$("#display_products_block").delegate("#products_dropdown div", "click", function(){
		
		// get the category of products selected in menu
		var category = $(this).find("p").text();
		
		// show product category selected (in drop-down menu)
		$("#products_types #product_category").val(category);
		
		// get and display products by category (functions at the top file)
		var products = getByCategoryProducts(category.toLowerCase());
		
		displayProducts(products);
	});
	
	
	
/*=====================================================================================================================================*/
/*------- UPLOAD PICTURE --------------------------------------------------------------------------------------------------------------*/
	$(".products_content").delegate("#add_new_product_block .upload_picture_button", "click", function(){
		
		$("#add_new_product_block #add_new_product_upload").trigger("click");
	});
	
    // detect if file has been selected in the 'add_new_product_block' file input
	$("#add_new_product_block #add_new_product_upload").change(function(){
		
		readPictureURL(this, $(this).attr("name")); // method in 'file_upload.js' file
	});
	
	
	
/*=====================================================================================================================================*/
/*------- DELETE PRODUCT FROM THE DATABASE OR 'Sold Products', 'Reserved Products' ----------------------------------------------------*/
	$(".products_content").delegate(".product_block .product_block_bottom .remove_button", "click", function(){
		
		// clear 'delete_member_confirm_window' before showing new confirmation
        $(".confirm_window #confirm_message").empty();
        
        // show up the 'delete_member_confirm_window' and background overlay also
        $(".confirm_window_background_overlay, .confirm_window").fadeIn(200);
        
        
        
        $(".confirm_window #confirm_message").
                html("<div> - Are you sure want to delete <strong style=\'font-size: 22px;\'>'" + 
        		 $(this).parent().parent().find(".name").text() + "'</strong> profile?</div>");
	});
});