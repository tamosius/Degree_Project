


/*====================================================================================================================================*/
/*-------- JQUERY READY --------------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
/*-------- DATE PICKERS FOR THE DATES IN THE SETTINGS PAGE ---------------------------------------------------------------------------*/
	// start date
	$(".settings_content").delegate("#add_programme_block #promotion_start_date, #programmes_settings_block #promotion_start_date", "focusin", function(){
		
		$(this).datepicker({
			
			showAnim : "slide",
			dateFormat : "dd-mm-yy",
			firstDay : 1,
			changeYear : true,
			yearRange  : "2012:2020",
			
			beforeShow: function (textbox, instance) {
	            instance.dpDiv.css({
	                    marginTop: 0 + 'px',
	                    marginLeft: -30 + 'px'
	            });
	        },
			
			onSelect : function(date){
				
				startDate = date;
			}
		});
	});
	
	// end date
	$(".settings_content").delegate("#add_programme_block #promotion_end_date, #programmes_settings_block #promotion_end_date", "focusin", function(){
		
        $(this).datepicker({
			
			showAnim : "slide",
			dateFormat : "dd-mm-yy",
			firstDay : 1,
			changeYear : true,
			yearRange  : "2012:2020",
			
			beforeShow: function (textbox, instance) {
	            instance.dpDiv.css({
	                    marginTop: 0 + 'px',
	                    marginLeft: -30 + 'px'
	            });
	        },
			
			onSelect : function(date){
				
				startDate = date;
			}
		});
	});
	

	
/*===================================================================================================================================*/
/*--------- ADD NEW PRODUCT TO THE DATABASE -----------------------------------------------------------------------------------------*/
	$("#add_new_product_block").delegate("form", "submit", function(event){
		
		// get the values from the fields and tags of the form
		var formData = new FormData();
		
		formData.append("imageFor", "products");  // indicate in what folder image to be saved ('membersImages', 'productsImages', etc)
		formData.append("image", $("input[type=file]")[2].files[0]); // 'input[type=file][2]' in 'add_new_product_block'
    	formData.append("category", $("input[name=category]:checked").val());
    	formData.append("name", $(this).find("#product_name").val());
    	formData.append("manufacturer", $(this).find("#manufacturer").val());
    	formData.append("price", $(this).find("#price").val());
    	formData.append("units", $(this).find("#stock").val());
    	formData.append("status", $("input[name=status]:checked").val());
    	formData.append("description", $(this).find("#product_description_block textarea").val());
		
		// clear 'delete_member_confirm_window' before showing new confirmation
        $(".confirm_settings_window .details_message").empty();
		
		$(".confirm_settings_window #top_message").text(" - Are you sure to add the Product?:");
        
        $(".confirm_settings_window .details_message")
            .html("<div>Category:<label>" + $("input[name=category]:checked").val() + "</label></div>" +
            		
            	  "<div>Product Name:<label>" + $(this).find("#product_name").val() + "</label></div>" +
            		
            	  "<div>Manufacturer:<label>" + $(this).find("#manufacturer").val() + "</label></div>" +
            		
            	  "<div>Product Price:<label>" + $(this).find("#price").val() + "</label></div>" +
                  
                  "<div>Units in Stock:<label>" + $(this).find("#stock").val() + "</label></div>" +
                  
                  "<div>Status:<label>" + $("input[name=status]:checked").val() + "</label></div>");
      
        // show up the 'delete_member_confirm_window' and background overlay also
        $(".confirm_window_background_overlay, .confirm_settings_window").slideDown(250);
        
        $(".confirm_settings_window .confirm_button").click(function(){
            
        	$.ajax({
                type        : "POST",
                url         : "/Degree_Project/products/addProduct",
                data        :  formData,
                //contentType : "application/json; charset=utf-8",
                //dataType    : "json",
                processData : false,  // these has to be done in order upload image to work
                contentType : false,
                //cache       : false,
                //async       : false,
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
        	$(".confirm_window_background_overlay, .confirm_settings_window").slideUp(250);
         });
        
    	
        /*------------------- CANCEL ADD NEW PRODUCT, 'No' BUTTON ------------------*/
        $(".confirm_settings_window .cancel_button").click(function(){
        	
            $(".confirm_window_background_overlay, .confirm_settings_window").slideUp(250);
        });
		
		event.preventDefault();
	});
	
	
/*==========================================================================================================================================*/
/*-------- UPDATE PROGRAMMES PRICES IN 'Programmes_settings_block' --------------------------------------------------------------------------*/
	$("#right_settings_block").delegate("#programmes_settings_block form", "submit", function(event){
		
		// get the values from the fields and tags of the form
		submitSettingsData = {
				
				settingsType                  : settings.programmes[1], 
				programmeId                   : $(this).find("#programme_id").text(),
				programmeName                 : $("#right_settings_block #programmes_settings_types input").val(),
				programmePrice                : $(this).find("#programme_price").val(),
				programmePreviousPrice        : initialSettingsData.programmePrice,
				programmeDiscount             : $(this).find("#programme_discount").val(),
				programmeDiscountPercentage   : $(this).find("#programme_discount_percentage").val(),
				finalPrice                    : $(this).find("#programme_final_price span").text(),
				programmePromotionStart       : assignNA($(this).find("#promotion_start_date").val()), // assign 'N / A' if the field is empty
				programmePromotionEnd         : assignNA($(this).find("#promotion_end_date").val()),   // function 'assignNA' in 'add_update_member.js'
				programmePromotionDescription : assignNA($(this).find("#programme_promotion_description_block textarea").val()),
				programmeDescription          : assignNA($(this).find("#programme_description_block textarea").val())
		}
		
		// clear 'delete_member_confirm_window' before showing new confirmation
        $(".confirm_settings_window .details_message").empty();
		
		$(".confirm_settings_window #top_message").text(" - Are you sure you want to update the following:");
        
        $(".confirm_settings_window .details_message")
            .html("<div>Programme Name:<label>" + submitSettingsData.programmeName + "</label></div>" +
            		
            	  "<div>Programme Price:<label><span>from: </span><span class='update_value'>€" + initialSettingsData.programmePrice + "</span>" +
            	  "<span> to: </span><span class='update_value'>€" + submitSettingsData.programmePrice + "</span></label></div>" +
            	  
                  "<div>Programme Discount:<label><span>Set to: </span><span class='update_value'>€" + submitSettingsData.programmeDiscount + 
                  "</span></label></div>" +
                  
                  "<div>Final Price:<label><span class='update_value'>€" + submitSettingsData.finalPrice + "</span>" +
            	  "</label></div>");
        
        // show up the 'delete_member_confirm_window' and background overlay also
        $(".confirm_window_background_overlay").animate({
            
        	height: "toggle"
        });
        $(".confirm_settings_window").delay(300).animate({
            
        	height: "toggle"
        });
		
		event.preventDefault();
	});

	
    
/*===================================================================================================================================*/
/*-------- SELECT CLICK BUTTON IN THE LEFT PRODUCTS BLOCK ('Add New Product', 'Display Products', etc.) -----------------------------*/
	$(".products_content").delegate("#left_products_block div", "click", function(){
		
		// get settings type, 0 = Add New Product, 1 = Display Products, 2 = Update Product
		var settingType = parseInt($(this).find(":input").val());
		
		$("#left_products_block div").removeClass("highlighted_settings_row");
		
		$(this).addClass("highlighted_settings_row");
		
		if(settingType === 0){
			
			// hide 'display_products_block', 'update_product_block', etc.
			$("#display_products_block, #update_product_block").hide();
			
            $("#add_new_product_block").slideDown(250);
			
		}else if(settingType === 1){
			
			// hide 'add_new_product_block', 'update_product_block', etc.
			$("#add_new_product_block, #update_product_block").hide();
			
			$("#display_products_block").slideDown(250);
			
			
		}else if(settingType === 2){
			
			// hide 'add_new_product_block', 'display_products_block', etc.
			$("#add_new_product_block, #display_products_block").hide();
			
			$("#programmes_settings_block").slideDown(250);
			
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
		
		// get the programme_id to use in the database
		//var programmeId = $(this).find("span").text();
		
		//$("#programmes_settings_types #programme_id").text(programmeId);
		
		// display programme type selected from drop-down menu
		//$("#right_settings_block #programmes_settings_types input").val($(this).find("p").text() );
		
		// retrieve data from the database and display it in the fields
		//var data = retrieveSettingsData(settings.programmes[0], programmeId);
		
		//$("#programmes_settings_block #programme_final_price span").text(data.finalPrice);
		//$("#programmes_settings_block #programme_price").val(data.programmePrice);
		//$("#programmes_settings_block #programme_discount").val(data.programmeDiscount);
		//$("#programmes_settings_block #programme_discount_percentage").val(data.programmeDiscountPercentage);
		//$("#programmes_settings_block #promotion_start_date").val(data.programmePromotionStart);
		//$("#programmes_settings_block #promotion_end_date").val(data.programmePromotionEnd);
		//$("#programmes_settings_block #programme_description_block textarea").val(data.programmeDescription);
		//$("#programmes_settings_block #programme_promotion_description_block textarea").val(data.programmePromotionDescription);
	});
	
	
	
/*=====================================================================================================================================*/
/*------- UPLOAD PICTURE --------------------------------------------------------------------------------------------------------------*/
	$(".products_content").delegate("#add_new_product_block .upload_picture_button", "click", function(){
		console.log("is clicked");
		
		$("#add_new_product_block #add_new_product_upload").trigger("click");
	});
	
    // detect if file has been selected in the 'add_new_product_block' file input
	$("#add_new_product_block #add_new_product_upload").change(function(){
		
		readPictureURL(this, $(this).attr("name")); // method in 'file_upload.js' file
	});
/*=====================================================================================================================================*/
	
	
/*------- CALCULATE DISCOUNT PERCENTAGE IN ('programmes_settings_fields') -------------------------------------------------------------*/
	$(".settings_content").delegate("#programmes_settings_fields #programme_price," +
			"#add_programme_settings_fields #programme_price", "keyup", function(){
		
		programmePrice = parseFloat($(this).val());
		
		// set 'programmePrice' to = 0, if the value isNaN
		if(isNaN(programmePrice)){
			
			programmePrice = 0;
		}
		
		// calculate final price for selected programme price and discount price
		calculateFinalPrice(programmePrice, discountPrice);
		
		// calculate percentage of the discount if made one
		calculateDiscountPercentage(programmePrice, discountPrice);
	});
	
/*------- ENTER THE AMOUNT IN 'DISCOUNT' FIELD, IF APPLICABLE -------------------------------------------------------------------------*/
    $(".settings_content").delegate("#programmes_settings_fields #programme_discount," +
    		"#add_programme_settings_fields #programme_discount", "keyup", function(){
		
		discountPrice = parseFloat($(this).val());
		
		// set 'programmePrice' to = 0, if the value isNaN
		if(isNaN(discountPrice)){
			
			discountPrice = 0;
		}
		
		// calculate final price for selected programme price and discount price
		calculateFinalPrice(programmePrice, discountPrice);
		
		// calculate percentage of the discount if made one
		calculateDiscountPercentage(programmePrice, discountPrice);
	});
});