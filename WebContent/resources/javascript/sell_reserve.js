
// get values when 'Reserve' or 'Sell' button is clicked
var actualPrice = ""; // product's actual price without discount
var productId = "";
var imagePath = "";
var quantity = 1;   // how many products currently selected (initial value = 1)
var price = "";     // price could be changing (with discount of not, when selecting 'radio' buttons in the pop-up window)
var available = ""; // how many products are available to sell / reserve
		


// submit customer and product details to the database
// to 'reserved_products' or 'products_sales'
function submitProductTransaction(type, path, data){
	
	$.ajax({
		
		type: type,
		url : path,
		data : data,
		dataType : "text",
		success: function(data, success, e){
			
			// display successfully added member name in the 'popup_window'
            $(".popup_window").html("<img id='check_in_image' src='" + imagePath + "' />" +
			                       "<div id='popup_window_text'><strong>" + data + "</strong><br></div>")
					               .fadeIn().delay(4000).fadeOut(500);
		},
		error: function(e){
			
			alert("Error in selling/reserving product transaction!");
		}
	});
}

// show the price in the 'Sell / Reserve' window when selecting member for whom to sell product (selecting 'radio' button)
// the price could be with the offer or not
function calculateDiscountPrice(actualPrice, offerPercentage){
	
	return (parseFloat(actualPrice) - (parseFloat(offerPercentage) / 100 * parseFloat(actualPrice))).toFixed(2);
}

// calculate the total price for the quantity of products selected
function calculateTotalPrice(quantity, price){
	
	return (parseInt(quantity) * parseFloat(price)).toFixed(2);
}


/*================================================================================================================================*/
/*-------- JQUERY READY ----------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
	// 'Reserve' button clicked in 'product_block'
	$(".loading_content").delegate(".order_button", "click", function(){
		
		// find the values of selected product
		productId = $(this).parent().parent().find("#product_id").val();
		imagePath = $(this).parent().parent().find(".image img").attr("src");
		actualPrice = $(this).parent().parent().find("#price").text();
		price = $(this).parent().parent().find("#price").text();
		available = $(this).parent().parent().find("#available").text();
		
		// display value in the '.window .bottom_panel'
		$(".window .middle_panel #product_id").val(productId);
		$(".window .image img").attr("src", imagePath);
		$(".window .first_top span").text(available);  // available in stock
		$(".window .first_bottom span").text(price);   // unit price
		$(".window .second_bottom span").text(price);  // total price
		
		
		// clear text field 'search_customer' 
		$(".window .search_customer").val("");
		
		// get table empty before append new data
		$(".window .table_body table").empty();
		
		// show 'Reserve' button, hide 'Sell' button
		$(".window .reserve_button").show();
		$(".window .sell_button").hide();
		
		// show the picture of the product and details in 'window'
		//$(".window .image img").attr("src", )
		
		$(".window, .background_overlay").fadeIn(250);
		
		// focus text field 'search customer'
		$(".window .search_customer").focus();
	});
	
	// 'Sell' button clicked in 'product_block'
    $(".loading_content").delegate(".sell_button", "click", function(){
    	
    	// find the values of selected product
		productId = $(this).parent().parent().find("#product_id").val();
		imagePath = $(this).parent().parent().find(".image img").attr("src");
		actualPrice = $(this).parent().parent().find("#price").text();
		price = $(this).parent().parent().find("#price").text();
		available = $(this).parent().parent().find("#available").text();
		
		// display value in the '.window .bottom_panel'
		$(".window .middle_panel #product_id").val(productId);
		$(".window .image img").attr("src", imagePath);
		$(".window .first_top span").text(available);  // available in stock
		$(".window .first_bottom span").text(price);   // unit price
		$(".window .second_bottom span").text(price);  // total price
    	
    	// clear text field 'search_customer' 
		$(".window .search_customer").val("");
		
		// get table empty before append new data
		$(".window .table_body table").empty();
    	
		// show 'Sell' button, hide 'Reserve' button
		$(".window .reserve_button").hide();
		$(".window .sell_button").show();
		
		$(".window, .background_overlay").fadeIn(250);
		
		// focus text field 'search customer'
		$(".window .search_customer").focus();
	});
    
    $(".loading_content").delegate(".update_button", "click", function(){
    	
	});

	$(".loading_content").delegate(".remove_button", "click", function(){
	
	});
	
/*=================================================================================================================================*/
/*------ SEARCH CUSTOMERS (MEMBERS) BY NAME OR ID ---------------------------------------------------------------------------------*/
	$(".window .search_customer").keyup(function(){
		
		// get ID or name for searched customer
		var idOrName = $(this).val();
		
		// call function in 'search_member.js' to get result
		var customers = searchDisplayMembers("POST", "/Degree_Project/contr/searchByNameOrId", idOrName);
		
		// get table empty before append new data
		$(".window .table_body table").empty();
		
		// display result in '.window .table_body' table (index.jsp)
		$.each(customers, function(key, value){
			
			$(".window .table_body table").append(
					
					"<tr>" +
					   "<td class='first'><input type='radio' name='product'/></td>" +
					   "<td class='second'>" + value.id + "</td>" +
					   "<td class='third'>" + value.firstName + " " + value.lastName + 
					              "<span>" + (value.offerPercentage == 0 ? "" : "(" + value.offerPercentage + "% offer)") + 
					              "</span><input type='hidden' value='" + value.offerPercentage + "' /></td>" +
					"</tr>"
			); // end of 'append'
		}); // end of 'each'
	});
	
/*=================================================================================================================================*/
/*------ SELECT THE MEMBER TO SELL / RESERVE PRODUCT ('radio' button) AND CALCULATE PRICE WITH AN OFFER
 * ---- IF AN OFFER IS AVAILABLE --------------------------------------------------------------------------------------------------*/
 
	$(".window").delegate(" .table_body input", "click", function(){  // input = radion button
		
		// offer '%'
		var offerPercentage = $(this).parent().parent().find(".third input").val();
		
		// if an offer is available, calculate new price with the discount
		// and show it in the 'Price' field
		if(parseFloat(offerPercentage) > 0){
			
			price = calculateDiscountPrice(price, offerPercentage);
			
			$(".window .first_bottom span").text(price);
			
			// display this value in '.second_bottom' 'Total Price' span
			$(".window .second_bottom span").text(calculateTotalPrice(quantity, price));
			
		}
		else{ // show the price with no discount
			
			price = actualPrice; // assign the price without discount
			
			$(".window .first_bottom span").text(price);
			
			// display this value in '.second_bottom' 'Total Price' span
			$(".window .second_bottom span").text(calculateTotalPrice(quantity, price));
		}
	});
	
/*=================================================================================================================================*/
/*------ GET PRODUCT QUANTITY SELECTED AND CALCULATE TOTAL VALUE ------------------------------------------------------------------*/
	$(".window .second_top #qty").keyup(function(){
		
		quantity = $(this).val() == "" ? 0 : $(this).val();  // if empty value in the field, assign = 0
		
		if(parseInt(quantity) > parseInt(available)){
			
			var errorMessage = "<div class='fault'><span style='color: red;'>&#9654;</span>Product quantity available: <span class='fault_reason'> " + available + "</span></div>" +
			                   "<div class='fault'><span style='color: red;'>&#9654;</span>You selected: <span class='fault_reason'>" + quantity + "</span></div>" +
			                   "<div class='fault'><span style='color: red;'>&#9654;</span>Plese re-select.</div>";
			
			// clear the pop-up 'error' window
	        $(".error_window").empty();
	        
			// pop-up error window if selected products quantity higher than available
			$(".error_window").append(errorMessage + "<hr><img src='resources/images/error.jpg' alt='error' />");
			$(".error_background_overlay").fadeIn(200);
            $(".error_window").fadeIn(200);
			
		}
		else{
			
			// display this value in '.second_bottom' 'Total Price' span
			$(".window .second_bottom span").text(calculateTotalPrice(quantity, price));
		}
	});
	
	
/*================================================================================================================================*/
/*------ HIDE THE ERROR WINDOW OVERLAY AND THE ERROR WINDOW ON CLICK -------------------------------------------------------------*/
	$(".error_window, .error_background_overlay").click(function(){
		
		$(".error_window, .error_background_overlay").fadeOut(200);
		
		// set quantity to 1 again
		quantity = 1;
		$(".window .second_top #qty").val(1);
		
		// display this value in '.second_bottom' 'Total Price' span
		$(".window .second_bottom span").text(calculateTotalPrice(quantity, price));
	});
	
/*------ HIDE 'window' WHEN 'Cancel' button is clicked ----------------------------------------------------------------------------*/
	$(".window .cancel_button").click(function(){
		
		$(".window, .background_overlay").slideUp(250);
		
		// set quantity to 1 again
		quantity = 1;
		$(".window .second_top #qty").val(1);
	});
	
	
/*==================================================================================================================================*/
/*------ SUBMIT THE 'SELL' OR 'RESERVE' THE PRODUCT --------------------------------------------------------------------------------*/
	$(".window form input[type=submit]").click(function(event){
		
		// determine what submit button was clicked: 'Reserve' or 'Sell'
		var submitValue = $(this).val();
		
		// get quantity
		var quantity = $(".window .second_top #qty").val();
		var totalPrice = $(".window .second_bottom span").text();
		
		if(submitValue.localeCompare("Reserve") === 0){ // 'Reserve' button is clicked
			
			// iterate through every table row and select only 'checkbox' checked
			$(".window .table_body table input[type=checkbox]").each(function(){
				
				if($(this).prop("checked")){
					
					// get the ID's of 'checked' customers
					var memberId = $(this).parent().parent().find(".second").text();
					
					var submitData = {
							
							memberId   : memberId,
							productId  : productId,
							quantity   : quantity,
							totalPrice : totalPrice
					}
					// submit 'Reserve' product
					submitProductTransaction("POST", "/Degree_Project/products/reserveProduct", submitData);
					
					$(".window, .background_overlay").slideUp(350);
				}	
			});
            
			
		}else{  // 'Sell' button is clicked
			
			// iterate through every table row and select only 'checkbox' checked
			$(".window .table_body table input[type=radio]").each(function(){
				
				if($(this).prop("checked")){
					
					// get the ID's of 'checked' customers
					var memberId = $(this).parent().parent().find(".second").text();
					// get an offer percentage if available, otherwise equals 0
					var offerPercentage = $(this).parent().parent().find(".third input").val();
					
					var submitData = {
							
							memberId        : memberId,
							productId       : productId,
							quantity        : quantity,
							actualPrice     : actualPrice,
							totalPrice      : totalPrice,
							offerPercentage : offerPercentage
					}
					// submit 'Sell' product
					submitProductTransaction("POST", "/Degree_Project/products/sellProduct", submitData);
					
					$(".window, .background_overlay").slideUp(350);
				}	
			});
		}
		
		
		
		event.preventDefault();
	});
});