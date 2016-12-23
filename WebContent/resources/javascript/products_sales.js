

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
	
	if(products.length === 0){
		
		$("#display_products_block .products_displayed").html("<div class='no_results'>No Results...</div>");
                                                                  // 'no_results' css in 'display_members.css'
		return;
	}
	
	$("#display_products_block .products_displayed").append("<button class='confirm_remove_button'>Remove</button>");
	
	$.each(products, function(key, value){
		
		$("#display_products_block .products_displayed").append(
				
				"<div class='product_block'>"
				   + "<input type='hidden' id='product_id' value='" + value.id + "' />"
				   + "<input type='hidden' id='category' value='" + value.category + "' />"
				   + "<input type='hidden' id='description' value='" + value.description + "' />"

				   + "<div class='image'>"                                                     // prevent browser from caching the picture
					  + "<img src='resources/images/productsImages/" + value.imagePath + "?" + parseInt(Math.random() * 1000000) + "' />"
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
						    + "<span class='manufacturer'>" + value.manufacturer + "</span>"
					   + "</div>"
					
					   + "<div class='product_info'>"
						    + "<div>Units in Stock:</div>"
						    + "<span id='available'>" + value.units + "</span>"
					   + "</div>"
					
				       + "<div class='product_info'>"
						    + "<div>Status:</div>"
						    + "<span class='status'>" + value.status + "</span>"
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
// get current product details on click of 'Update', 'Remove' in 'Display Products'
function getProductDetails(thisProduct){
	
	var product = "";
	
	product = {
			
			id           : $(thisProduct).parent().parent().find("#product_id").val(),
			imagePath    : $(thisProduct).parent().parent().find(".image img").attr("src"),
			category     : $(thisProduct).parent().parent().find("#category").val(),
			price        : $(thisProduct).parent().parent().find("#price").text(),
			name         : $(thisProduct).parent().parent().find(".name").text(),
			manufacturer : $(thisProduct).parent().parent().find(".manufacturer").text(),
			units        : $(thisProduct).parent().parent().find("#available").text(),
			status       : $(thisProduct).parent().parent().find(".status").text(),
			description  : $(thisProduct).parent().parent().find("#description").val()
	}
	
	return product;
}

/*===============================================================================================*/
// display product you want to update 'UPDATE PRODUCT BLOCK'
function displayProduct(product){
	
	// remove 'highlighted' in the 'left_products_block' buttons
	$("#left_products_block div").removeClass("highlighted_settings_row");
	
	// set data to the fields
	$("#update_product_fields .image img").attr("src", product.imagePath + "?" + parseInt(Math.random() * 1000000));
	$("#update_product_fields #product_id").val(product.id);
	$("#update_product_fields #productCategory option[value='" + product.category.toLowerCase() + "']").prop("selected", true);
	$("#update_product_fields #product_name").val(product.name);
	$("#update_product_fields #manufacturer").val(product.manufacturer);
	$("#update_product_fields #price").val(product.price);
	$("#update_product_fields #stock").val(product.units);
	(product.status.localeCompare("active") === 0) ? ($("#update_product_fields #active").prop("checked", true)) 
			: ($("#update_product_fields #inactive").prop("checked", true));
	$("#update_product_fields #product_description_block textarea").val(product.description);
	
	// hide 'add_new_product_block', 'display_products_block', etc.
	$("#update_product_block, #add_new_product_block, #display_products_block, #sold_products_block").hide();
	
	$("#update_product_block").slideDown(250);
}

/*===============================================================================================*/
// display sold / reserved products along with the customer details
function displaySoldReservedProducts(products, action){  // receive type of action, 'sold' or 'reserved'
	
	var block = action.localeCompare("sold") === 0 ? "#sold_products_block" : "#reserved_products_block";
	
    $(block + " .products_displayed").empty();
	
	$.each(products, function(key, value){
		
		$(block + " .products_displayed").append(
				
				"<div class='product_block'>"
				   + "<input type='hidden' id='product_id' value='" + value.id + "' />"

				   + "<div class='image'>"
					  + "<img src='resources/images/productsImages/" + value.imagePath + "?" + parseInt(Math.random() * 1000000) + "' />"
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
				        		"<button class='sell_reserved_button'>Sell</button>" +
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
	$("#add_new_product_block").delegate("#add_new_product_submit_button", "click", function(event){
		
		var error_message = "";
		
		var productName = $(this).parent().find("#product_name").val();
		var manufacturer = $(this).parent().find("#manufacturer").val();
		var price = $(this).parent().find("#price").val();
		var unitsStock = $(this).parent().find("#stock").val();
		var status = $(this).parent().find("input[name=status]:checked").val()	;
		var description = $(this).parent().find("#product_description_block textarea").val();
		console.log("name: " + productName + " manufacturer: " + manufacturer + " price: " + price + " unitsStock: " + unitsStock
				 + " status: " + status + " description: " + description);
		// clear the pop-up 'error' window
        $(".error_window").empty();
        
        if(productName.length === 0){
            
            $(this).parent().find("#product_name").addClass("error");
            //$(":focus").blur();   /* unfocus this field */
            
            // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
            error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> The <span class='fault_reason'>'Product Name'</span>" +
            		" field cannot be empty!<br> <span style='margin-left: 20px;'>Please enter The Product Name.</span><br><br></div>";
            
        }
        if(manufacturer.length === 0){
            
            $(this).parent().find("#manufacturer").addClass("error");
            //$(":focus").blur();  /* unfocus this field */
            
            // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
            error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> The <span class='fault_reason'>'Manufacturer'</span>" +
            		" field cannot be empty!<br> <span style='margin-left: 20px;'>Please enter The Manufacturer.</span><br><br></div>";
           
        }
        
        // if the 'Date of Birth' field is not empty and the value is not 'N / A', then validate the date
        if(isNaN(price) || price < 0 || price.length === 0){
        	
            $(this).parent().find("#price").addClass("error"); // get the property of '#date_of_birth' and assign to the variable (then you can add an 'error' class)
                                                             // in the case of input invalidation 
            
            
            	
                
        
            // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
            error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> Invalid <span class='fault_reason'>'Price'</span> value:" +
                		" <span class='faulty_format'>'" + price + "'</span>.<br> <span style='margin-left: 20px;'>Please re-enter.</span><br><br></div>";
                
            
        }
        
        // validate if 'Email' field is not empty
        if(isNaN(unitsStock) || unitsStock < 0 || unitsStock.length === 0){
            
        	$(this).parent().find("#stock").addClass("error");
            //$(":focus").blur();   /* unfocus this field */
            
        	// error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
            error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> Invalid <span class='fault_reason'>'Units in Stock'</span> value:" +
                		" <span class='faulty_format'>'" + unitsStock + "'</span>.<br> <span style='margin-left: 20px;'>Please re-enter.</span><br><br></div>";
            
           
        }
        
        // validate if 'Programme' field is not empty
        if(description.length === 0){
        	
        	$(this).parent().find("#product_description_block textarea").addClass("error");
            //$(":focus").blur();   /* unfocus this field */
                 
            // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
            error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> The <span class='fault_reason'>'Product Description'</span>" +
        		" field cannot be empty!<br> <span style='margin-left: 20px;'>Please describe the Product.</span><br><br></div>";
            
        }
        
        // if we got some issues in validation, then pop-up the 'error_window' and display error messages
        if(error_message.length !== 0){
        	
            $(".error_window").append(error_message + "<hr><img src='resources/images/error.jpg' alt='error' />");
            $(".error_background_overlay").fadeIn(200);
            $(".error_window").fadeIn(200);
        
        // if 'action' variable equals 'new_member', add new member to the database
        }else{
        	
        	// set the value in '.confirm_window #trigger_submit' (index.jsp) for '#add_new_product_block form' to be clicked
    		// if confirmation 'Yes' selected to remove the product from the database
    		$(".confirm_settings_window #trigger_submit").val("#add_new_product_block form");
    		
    		// display product picture in the pop-up confirmation window
    		$(".confirm_settings_window .top_image img").attr("src", $(this).parent().parent().find(".image img").attr("src"));
    		
    		
    		// clear pop-up window before showing new confirmation
            $(".confirm_settings_window .details_message").empty();
    		
            // top message at the top pop-up confirmation window
    		$(".confirm_settings_window #top_message").text(" - Are you sure to add the Product?:");
            
    		// the whole body message at the pop-up confirmation window
            $(".confirm_settings_window .details_message")
                .html("<div>Category:<label>" + $(this).parent().parent().find("#productCategory option:selected").text() + "</label></div>" +
                		
                	  "<div>Product Name:<label>" + $(this).parent().parent().find("#product_name").val() + "</label></div>" +
                		
                	  "<div>Manufacturer:<label>" + $(this).parent().parent().find("#manufacturer").val() + "</label></div>" +
                		
                	  "<div>Product Price:<label>" + $(this).parent().parent().find("#price").val() + "</label></div>" +
                      
                      "<div>Units in Stock:<label>" + $(this).parent().parent().find("#stock").val() + "</label></div>" +
                      
                      "<div>Status:<label>" + $(this).parent().parent().find("input[name=status]:checked").val() + "</label></div>");
          
            // show up the background overlay and confirmation window
            $(".confirm_window_background_overlay").slideDown(250);
            $(".confirm_settings_window").delay(100).slideDown(250);
        }
	});
	
/*------- CONFIRM 'Add New Product' action triggered from 'popup_cofirmation_windows.js' ----------------------------------------------*/
	$("#add_new_product_block").delegate("form", "submit", function(event){
		
		
		// get the updated details in 'FormData' object
		var formData = new FormData($(this)[0]);
		
		$.ajax({
            
			type        : "POST",
            url         : "/Degree_Project/products/addProduct",
            data        :  formData,
            //contentType : "application/json; charset=utf-8",
            dataType    : "json",
            processData : false,  // these has to be done in order upload image to work
            contentType : false,
            //cache       : false,
            async       : false,
            success     : function (data, status, jqXHR) {
            	
            	
    			
                
        		// display successfully message about updated product
            	$(".popup_window #check_in_image").attr("src", $("#add_new_product_block .image img").attr("src"));
                $(".popup_window .messages").html("<div id='popup_window_text'><strong>" + formData.get("productName") + "</strong><br>" +
    					               "has been successfully added to the database!</div>");
    			$(".popup_window").fadeIn().delay(3000).fadeOut(500);         	
    			
            },
            error: function (xhr) {
                alert("Failed to update the Product!");
            }
            
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
		
		if(settingType === 0){  // 'add_new_product_block'
			
			// hide 'display_products_block', 'update_product_block', etc.
			$("#update_product_block, #display_products_block, #sold_products_block, #reserved_products_block").hide();
			
			// set image to 'no_image.jpg'
			$("#add_new_product_block .image img").attr("src", "resources/images/productsImages/no_image.jpg");
			
			// display 'add_new_product_block'
            $("#add_new_product_block").slideDown(250);
			
		}else if(settingType === 1){  // 'display_products_block'
			
			// hide 'add_new_product_block', 'update_product_block', etc.
			$("#update_product_block, #add_new_product_block, #sold_products_block, #reserved_products_block").hide();
			
			// display 'All Categories' in the top drop-down menu
			$("#display_products_block #product_category").val("All Categories");
			
			var products = getProducts("/Degree_Project/products/getAllProducts");  // get all products from the database available (function at the top file)
			
			displayProducts(products);
			
			// display 'display_products_block'
			$("#display_products_block").slideDown(250);
			
			
		}else if(settingType === 2){  // 'sold_products_block'
			
			// hide 'add_new_product_block', 'display_products_block', etc.
			$("#update_product_block, #add_new_product_block, #display_products_block, #reserved_products_block").hide();
			
			var soldProducts = getProducts("/Degree_Project/products/soldProducts");
			
			displaySoldReservedProducts(soldProducts, "sold");  // pass type of action, 'sold' in this case
			
			// display 'sold_products_block'
			$("#sold_products_block").slideDown(250);
			
		}else if(settingType === 3){  // 'reserved_products_block'
			
			// hide 'add_new_product_block', 'display_products_block', etc.
			$("#update_product_block, #add_new_product_block, #display_products_block, #sold_products_block").hide();
			
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
		
		var products = "";
		
		// get the category of products selected in menu
		var category = $(this).find("p").text();
		
		// show product category selected (in drop-down menu)
		$("#products_types #product_category").val(category);
		
		if(category.localeCompare("All Categories") === 0){
			
			products = getProducts("/Degree_Project/products/getAllProducts");  // get all products from the database available (function at the top file)
		
		}else{
			
			// get and display products by category (functions at the top file)
			products = getByCategoryProducts(category.toLowerCase());
		}
		
		// display products in the table in 'DISPLAY PROCUTS BLOCK' ('div' products_displayed)
		displayProducts(products);
	});
	
	
	
/*=====================================================================================================================================*/
/*------- UPLOAD PICTURE --------------------------------------------------------------------------------------------------------------*/
	$(".products_content").delegate("#add_new_product_block .upload_picture_button", "click", function(){
		
		$("#add_new_product_block #add_new_product_upload").trigger("click");
	});
	
    $(".products_content").delegate("#update_product_block .upload_picture_button", "click", function(){
		
		$("#update_product_block #update_product_upload").trigger("click");
	});
	
    // detect if file has been selected in the 'add_new_product_block' file input
	$("#add_new_product_block #add_new_product_upload").change(function(){
		
		readPictureURL(this, $(this).attr("name")); // method in 'file_upload.js' file
	});
	
	// detect if file has been selected in the 'add_new_product_block' file input
	$("#update_product_block #update_product_upload").change(function(){
		
		readPictureURL(this, $(this).attr("name")); // method in 'file_upload.js' file
	});
	
	
	
/*=====================================================================================================================================*/
/*------- 'Update' PRODUCT BUTTON IN 'Display Products' -------------------------------------------------------------------------------*/
	$(".products_content").delegate("#display_products_block .product_block_bottom .update_button", "click", function(){
		
		
		var product = getProductDetails(this);
		
		// pass 'product' object to display in 'UPDATE PRODUCT BLOCK' before update
		displayProduct(product);
	});
	
/*------- 'Update Product' BUTTON IN 'UPDATE PRODUCT BLOCK' --------------------------------------------------------------------------*/
	$(".products_content").delegate("#update_product_block #update_product_submit_button", "click", function(){
		
		// set the value in '.confirm_window #trigger_submit' (index.jsp) for '#update_product_block form' to be clicked
		// if confirmation 'Yes' selected to remove the product from the database
		$(".confirm_settings_window #trigger_submit").val("#update_product_block form");
		
		// display product picture in the pop-up confirmation window
		$(".confirm_settings_window .top_image img").attr("src", $(this).parent().parent().find(".image img").attr("src"));
		
		// clear before showing new confirmation
		$(".confirm_settings_window #top_message").text(" - Are you sure you want to update the following:");
        $(".confirm_settings_window .details_message").empty();
        
        $(".confirm_settings_window .details_message")
              .html("<div>Category:<label><span class='update_value'>" + $(this).parent().parent().find("#productCategory option:selected").text() + "</span></label></div>" +
        		
        	  "<div>Product Name:<label><span class='update_value'>"  + $(this).parent().parent().find("#product_name").val() + "</span></label></div>" +
        	  
              "<div>Manufacturer:<label><span class='update_value'>"  + $(this).parent().parent().find("#manufacturer").val() + "</span></label></div>" +
              
              "<div>Price €:<label><span class='update_value'>"  + $(this).parent().parent().find("#price").val() + "</span></label></div>" +
              
              "<div>Units in Stock:<label><span class='update_value'>"  + $(this).parent().parent().find("#stock").val() + "</span></label></div>" +
              
              "<div>Status:<label><span class='update_value'>"  + $(this).parent().parent().find("input[name=status]:checked").val() + "</span></label></div>");
        
        // show up the 'delete_member_confirm_window' and background overlay also
        $(".confirm_window_background_overlay").slideDown(250);
        $(".confirm_settings_window").delay(100).slideDown(250);
	 });
		
	
/*------- CONFIRM 'Update Product' action triggered from 'popup_cofirmation_windows.js' ----------------------------------------------*/
	$(".products_content").delegate("#update_product_block form", "submit", function(event){
		
		// get the updated details in 'FormData' object
		var formData = new FormData($(this)[0]);
		
		$.ajax({
            
			type        : "POST",
            url         : "/Degree_Project/products/updateProduct",
            data        :  formData,
            //contentType : "application/json; charset=utf-8",
            dataType    : "text",
            processData : false,  // these has to be done in order upload image to work
            contentType : false,
            //cache       : false,
            async       : false,
            success     : function (data, status, jqXHR) {
            	
            	
    			
                
        		// display successfully message about updated product
            	$(".popup_window #check_in_image").attr("src", $("#update_product_block .image img").attr("src"));
                $(".popup_window .messages").html("<div id='popup_window_text'><strong>" + formData.get("productName") + "</strong><br>" +
    					               "has been successfully updated in the database!</div>");
    			$(".popup_window").fadeIn().delay(3000).fadeOut(500);         	
    			
            },
            error: function (xhr) {
                alert("Failed to update the Product!");
            }
            
        });
		
		event.preventDefault();
	});

	
	
/*=====================================================================================================================================*/
/*------- DELETE PRODUCT FROM THE DATABASE OR 'Sold Products', 'Reserved Products' ----------------------------------------------------*/
	var deleteProduct = "";
	$(".products_content").delegate(".product_block .product_block_bottom .remove_button", "click", function(){
		
		deleteProduct = getProductDetails(this);
		
		// set the value in '.confirm_window #trigger_submit' (index.jsp) for '.confirm_remove_button' to be clicked
		// if confirmation 'Yes' selected to remove the product from the database
		$(".confirm_window #trigger_submit").val("#display_products_block .products_displayed .confirm_remove_button");
		
		// clear pop-up window content after closed
        $(".confirm_window #confirm_message").empty();
        
        // display the picture of the product you intend to remove
		$(".confirm_window .top_image").attr("src", deleteProduct.imagePath);
        
		$(".confirm_window #confirm_message").
        		html("<div> - Are you sure want to remove the <strong style=\'font-size: 22px;\'>'" + 
        		deleteProduct.name + "'</strong> product?</div>");
		
		// show up the 'delete_member_confirm_window' and background overlay also
        $(".confirm_window_background_overlay, .confirm_window").fadeIn(200);
	});
	
/*------- CONFIRM 'Remove' action triggered from 'popup_cofirmation_windows.js' --------------------------------------------------------*/
	$(".products_content").delegate("#display_products_block .products_displayed .confirm_remove_button", "click", function(){
			
		$.ajax({
            type        : "POST",
            url         : "/Degree_Project/products/deleteProduct",
            data        :  {productId : deleteProduct.id},
            //contentType : "application/json; charset=utf-8",
            dataType    : "text",
            //processData : false,  // these has to be done in order upload image to work
            //contentType : false,
            //cache       : false,
            async       : false,
            success     : function (data, status, jqXHR) {
            	
            	// get product category currently selected from drop-down menu
            	var category = $("#display_products_block #product_category").val();
            	
            	// get products available after just removed product
    			var products = "";
    			
    			
    			if(category.localeCompare("All Categories") === 0){
    				
    				products = getProducts("/Degree_Project/products/getAllProducts");  // get all products from the database available (function at the top file)
    			
    			}else{
    				
    				// get and display products by category (functions at the top file)
    				products = getByCategoryProducts(category.toLowerCase());
    			}
    			
    			// display products in the table in 'DISPLAY PROCUTS BLOCK' ('div' products_displayed)
    			displayProducts(products);
                
        		// display successfully message about deleted product
            	$(".popup_window #check_in_image").attr("src", deleteProduct.imagePath);
                $(".popup_window .messages").html("<div id='popup_window_text'><strong>" + deleteProduct.name + "</strong><br>" +
    					               "has been successfully deleted from the database!</div>");
    			$(".popup_window").fadeIn().delay(3000).fadeOut(500);         	
    			
            },
            error: function (xhr) {
                alert("Failed to remove the Product!");
            }
            
        });
	});
/*========================================================================================================================================*/
	
	
});