
var productId = "";
var imagePath = "";
var price = "";
var available = "";
		


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




$(document).ready(function(){
	
	// 'Reserve' button clicked in 'product_block'
	$(".loading_content").delegate(".order_button", "click", function(){
		
		// find the values of selected product
		productId = $(this).parent().parent().find("#product_id").val();
		imagePath = $(this).parent().parent().find(".image img").attr("src");
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
					   "<td class='first'><input type='checkbox'/></td>" +
					   "<td class='second'>" + value.id + "</td>" +
					   "<td class='third'>" + value.firstName + " " + value.lastName + "</td>" +
					"</tr>"
			); // end of 'append'
		}); // end of 'each'
	});
	
/*=================================================================================================================================*/
/*------ GET PRODUCT QUANTITY SELECTED AND CALCULATE TOTAL VALUE ------------------------------------------------------------------*/
	$(".window .second_top #qty").keyup(function(){
		
		var quantity = $(this).val();
		
		// display this value in '.second_bottom' 'Total Price' span
		$(".window .second_bottom span").text(parseInt(quantity) * parseInt(price));
	});
	
	
/*------ HIDE 'window' WHEN 'Cancel' button is clicked ----------------------------------------------------------------------------*/
	$(".window .cancel_button").click(function(){
		
		$(".window, .background_overlay").slideUp(250);
	});
	
	
/*==================================================================================================================================*/
/*------ SUBMIT THE 'SELL' OR 'RESERVE' THE PRODUCT --------------------------------------------------------------------------------*/
	$(".window form input[type=submit]").click(function(event){
		
		// determine what submit button was clicked: 'Reserve' or 'Sell'
		var submitValue = $(this).val();
		
		// get quantity
		var quantity = $(".window .second_top #qty").val();
		var totalPrice = $(".window .second_bottom span").text();
		
		if(submitValue.localeCompare("Reserve") === 0){ // 'Reserve' button clicked
			
			// iterate through every table row and select only 'checkbox' checked
			$(".window .table_body table input[type=checkbox]").each(function(){
				
				if($(this).prop("checked")){
					
					// get the ID's of 'checked' customers
					var memberId = $(this).parent().parent().find(".second").text();
					
					var submitData = {
							
							memberId   : memberId,
							productId  : productId,
							quantity   : quantity
					}
					// submit 'Reserve' product
					submitProductTransaction("POST", "/Degree_Project/products/reserveProduct", submitData);
					
					$(".window, .background_overlay").slideUp(350);
				}	
			});
            
			
		}else{  // 'Sell' button clicked
			
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
					submitProductTransaction("POST", "/Degree_Project/products/sellProduct", submitData);
					
					$(".window, .background_overlay").slideUp(350);
				}	
			});
		}
		
		
		
		event.preventDefault();
	});
});