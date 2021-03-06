
// values used to calculate percentage of discount, if making one
var programmePrice = 0;

var discountPrice = 0;

// admin id, who is currently logged in
var adminId = 1;

// store data of particular settings type retrieved from the database
var initialSettingsData = "";

/*------ URI'S DEPENDING OF WHICH SETTINGS TYPE IS REQUESTED ---------------------------------------*/
var settings = {
		
		admin : [
		     {
		         uri : "/Degree_Project/admin/addAdmin"
		     },
		     {
		    	 uri : "/Degree_Project/settings/getAdminDetails"
		     }
		],  // end of 'Admin' settings type
		
		programmes : [
		      {
		    	  uri : "/Degree_Project/settings/getProgrammeDetails"
		      },
		      {
		    	  uri : "/Degree_Project/settings/updateProgrammeSettings"
		      },
		      {
		    	  uri : "/Degree_Project/settings/addProgramme"
		      }
		      
		], // end of 'programmes' settings type
		
		sales : [
		      {
		    	  uri : "/Degree_Project/settings/getSalesDetails"
		      }
		] // end of 'sales' settings type

} // end of 'settings' object

// data stored in object by submitting any of settings ('Admin', 'Programmes', 'Sales', etc.) -----*/
var submitSettingsData = "";

/*------ DATA FOR 'programmes_settings_block' WHEN SUBMITTING -------------------------------------*/
var programmeId = "";
var programmeName = "";
var programmePrice = "";
var programmeDiscount = "";
var programmeDiscountPercentage = "";
var finalPrice = "";
var promotionStartDate = "";
var promotionEndDate = "";

/*------- DISPLAY SETTINGS DATA BY SELECTED TYPE ('Admin', 'Programmes', 'Sales', etc.) -----------*/
function retrieveSettingsData(settingsType, id){
	
	var retrievedData = "";
	
	// retrieve data from the database, by using 'settingsType' and 'element' as the element number
	// in 'settings' object and 'id' is the 'Admin' id, or 'Programme' id to retrieve data
	$.ajax({
		
		type        : "POST",
		url         : settingsType.uri,
		data        : {id : id},
		dataType    : "json",
		processData : true,
		async       : false,
		success     : function(data, status, e){
			
			initialSettingsData = data;  // 'Programme' details returned from database by ID, before update
			
		}, 
		error       : function(e){
			
			alert("Error retrieving settings data..");
		}
	});
	return initialSettingsData;
}


/*------- UPDATE SETTINGS BY THE SELECTE TYPE ('Admin', 'Programmes', 'Sales', etc.) ---------------*/
function updateSettingsSelected(settingsType){
	
	// update details in the database
    $.ajax({
    	
    	type         : "POST",
    	url          : settingsType.uri,
    	data         : JSON.stringify(submitSettingsData),
    	contentType  : "application/json; charset=utf-8",
    	dataType     : "json",
    	proccessData : true,
    	async        : false,
    	success      : function(data, status, event){
    		
    		//$("#programmes_settings_block #programme_final_price span").text(data.finalPrice);
    		//$("#programmes_settings_block #programme_price").val(data.programmePrice);
    		//$("#programmes_settings_block #programme_discount").val(data.programmeDiscount);
    		//$("#programmes_settings_block #programme_discount_percentage").val(data.programmeDiscountPercentage);
    		//$("#programmes_settings_block #promotion_start_date").val(data.programmePromotionStart);
    		//$("#programmes_settings_block #promotion_end_date").val(data.programmePromotionEnd);
    		
    		$(".confirm_settings_window").slideUp(250);
            $(".confirm_window_background_overlay").slideUp(250);
    	},
    	error : function(e){
    		
    		alert("Error from settings");
    	}
    	
    });		
}

function displaySettingsData(settingsType, id){
	
	
}

/*------- CALCULATE FINAL PRICE OF THE PROGRAMME TYPE (including discount offer) -------------------*/
function calculateFinalPrice(programmePrice, discountPrice){
	
	var finalPrice = (programmePrice - discountPrice).toFixed(2);
	
	$("#programmes_settings_block #programme_final_price span," +
			"#add_programme_block #add_programme_final_price span").text(finalPrice);
}

/*------- CALCULATE PERCENTAGE OF THE DISCOUNT IF MADE ONE -----------------------------------------*/
function calculateDiscountPercentage(programmePrice, discountPrice){
	
	if((programmePrice !== 0) && (discountPrice !== 0)){
		
		var percentage = ((discountPrice / programmePrice) * 100).toFixed(1);
		
		$("#programmes_settings_fields #programme_discount_percentage," +
				"#add_programme_settings_fields #programme_discount_percentage").val(percentage);
	}
	else{
		
		$("#programmes_settings_fields #programme_discount_percentage," +
				"#add_programme_settings_fields #programme_discount_percentage").val(0);
	}
}


/*====================================================================================================================================*/
/*-------- JQUERY READY --------------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
/*-------- DATE PICKERS FOR THE DATES IN THE SETTINGS PAGE ---------------------------------------------------------------------------*/
	// start date
	$(".settings_content").delegate("#add_programme_block #promotion_start_date, #programmes_settings_block .promotion_start_date", "focusin", function(){
		
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
	$(".settings_content").delegate("#add_programme_block #promotion_end_date, #programmes_settings_block .promotion_end_date", "focusin", function(){
		
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
	
/*=====================================================================================================================================*/
/*--------- ADD NEW ADMIN USER TO THE DATABASE ----------------------------------------------------------------------------------------*/
	$("#add_admin_block").delegate("form", "submit", function(event){
		
		// get the values from the fields and tags of the form
		submitSettingsData = {
				
				settingsType : settings.admin[0],  // this points to 'settings' object in this file (line 13)
				firstName    : $(this).find("#admin_first_name").val(),
				lastName     : $(this).find("#admin_last_name").val(),
				username     : $(this).find("#admin_username").val(),
				email        : $(this).find("#admin_email").val(),
				password     : $(this).find("#admin_password").val()
		}
		
		// clear 'delete_member_confirm_window' before showing new confirmation
        $(".confirm_settings_window .details_message").empty();
		
		$(".confirm_settings_window #top_message").text(" - Are you sure to add the following Programme?:");
        
        $(".confirm_settings_window .details_message")
            .html("<div>Admin Name:<label>" + submitSettingsData.firstName + " " + submitSettingsData.lastName +  "</label></div>" +
            		
            	  "<div>Username:<label>" +
            	  "<span class='update_value'>" + submitSettingsData.username + "</span></label></div>" +
            	  
                  "<div>Email:<label><span class='update_value'>" + submitSettingsData.email + 
                  "</span></label></div>");
        
        // show up the 'delete_member_confirm_window' and background overlay also
        $(".confirm_window_background_overlay").animate({
            
        	height: "toggle"
        });
        $(".confirm_settings_window").delay(300).animate({
            
        	height: "toggle"
        });
		
		
		event.preventDefault();
	});
	
/*=====================================================================================================================================*/
/*--------- ADD NEW PROGRAMME TO THE DATABASE -----------------------------------------------------------------------------------------*/
	$("#add_programme_block").delegate("form", "submit", function(event){
		
		// get the values from the fields and tags of the form
		submitSettingsData = {
				
				settingsType                  : settings.programmes[2],  // this points to 'settings' object in this file (line 13)
				programmeName                 : $(this).find("#programme_name").val(),
				programmePrice                : $(this).find("#programme_price").val(),
				programmeDiscount             : $(this).find("#programme_discount").val(),
				programmeDiscountPercentage   : $(this).find("#programme_discount_percentage").val(),
				finalPrice                    : $(this).find("#add_programme_final_price span").text(),
				programmePromotionStart       : assignNA($(this).find("#promotion_start_date").val()), // assign 'N / A' if the field is empty
				programmePromotionEnd         : assignNA($(this).find("#promotion_end_date").val()),   // function 'assignNA' in 'add_update_member.js'
				programmePromotionDescription : assignNA($(this).find("#programme_promotion_description_block textarea").val()),
				programmeDescription          : assignNA($(this).find("#programme_description_block textarea").val())
		}
		
		// clear 'delete_member_confirm_window' before showing new confirmation
        $(".confirm_settings_window .details_message").empty();
		
		$(".confirm_settings_window #top_message").text(" - Are you sure to add the following Programme?:");
        
        $(".confirm_settings_window .details_message")
            .html("<div>Programme Name:<label>" + submitSettingsData.programmeName + "</label></div>" +
            		
            	  "<div>Programme Price:<label>" +
            	  "<span>€</span><span class='update_value'>" + submitSettingsData.programmePrice + "</span></label></div>" +
            	  
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
	
/*===========================================================================================================================================*/
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
				programmePromotionStart       : assignNA($(this).find(".promotion_start_date").val()), // assign 'N / A' if the field is empty
				programmePromotionEnd         : assignNA($(this).find(".promotion_end_date").val()),   // function 'assignNA' in 'add_update_member.js'
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
	
	
/*------------------- CONFIRM SUBMIT SETTINGS UPDATES, 'Yes' BUTTON ('Admin Account Details',
 * ------------------ 'Add new Programme', 'Set Programmes Prices', etc..) --------*/
    $(".confirm_settings_window .confirm_button").click(function(){
        
    	updateSettingsSelected(submitSettingsData.settingsType);
     });
	
/*------------------- CANCEL UPDATE SETTINGS, 'No' BUTTON ('Admin Account Details', 'Set Programmes Prices', etc..) ------------------*/
    $(".confirm_settings_window .cancel_button").click(function(){
    	
        $(".confirm_settings_window").slideUp(250);
        $(".confirm_window_background_overlay").slideUp(250); 
    });
	
/*-------- SELECT SETTINGS TYPE IN LEFT SETTINGS BLOCK (Admin Details, Programmes Prices, etc.) -------------------------------------*/
	$(".settings_content").delegate("#left_settings_block div", "click", function(){
		
		// get settings type, 1 = Add Admin, 2 = Add Programme, 3 = Programmes Prices, 4 = Products settings
		var settingType = parseInt($(this).find(":input").val());
		
		$("#left_settings_block div").removeClass("highlighted_settings_row");
		
		$(this).addClass("highlighted_settings_row");
		
		if(settingType === 1){
			
			// hide 'programmes_settings_block', 'products_settings_block', etc.
			$("#admin_settings_block, #add_programme_block, #programmes_settings_block, #products_settings_block").hide();
			
            $("#add_admin_block").animate({
				
				height: "toggle"
			}, 250);
			
		}else if(settingType === 2){
			
			// hide 'admin_settings_block', 'products_settings_block', etc.
			$("#admin_settings_block, #add_admin_block, #programmes_settings_block, #products_settings_block").hide();
			
			$("#add_programme_block").animate({
				
				height: "toggle"
			}, 250);
			
			
		}else if(settingType === 3){
			
			// hide 'admin_settings_block', 'products_settings_block', etc.
			$("#admin_settings_block, #add_admin_block, #add_programme_block, #products_settings_block").hide();
			
			$("#programmes_settings_block").animate({
				
				height: "toggle"
			}, 250);
			
		}else if(settingsType === 4){
			
			// hide 'admin_settings_block', 'programmes_settings_block'
			$("#admin_settings_block, #add_admin_block, #programmes_settings_block").hide();
			
            $("#products_settings_block").animate({
				
				height: "toggle"
			}, 1000);
		}
		
	});
	
/*-------- DISPLAY DROP-DOWN MENU WHEN CLICKED (programmes types) -------------------------------------------------------------------------------------*/
	$(".settings_content").delegate("#right_settings_block #programmes_settings_types", "click", function(){
		
		$("#right_settings_block #programmes_settings_dropdown").animate({
			
			height: "toggle"
		});
	});
	
/*-------- SELECT PROGRAMME TYPE FROM DROP-DOWN MENU ('1 Month Mbsh', '3 Monts Mbsh', etc.) -------------------------------------------*/
	$("#programmes_settings_block").delegate("#programmes_settings_dropdown div", "click", function(){
		
		// get the programme_id to use in the database
		var programmeId = $(this).find("span").text();
		
		$("#programmes_settings_types #programme_id").text(programmeId);
		
		// display programme type selected from drop-down menu
		$("#right_settings_block #programmes_settings_types input").val($(this).find("p").text() );
		
		// retrieve data from the database and display it in the fields
		var data = retrieveSettingsData(settings.programmes[0], programmeId);
		
		$("#programmes_settings_block #programme_final_price span").text(data.finalPrice);
		$("#programmes_settings_block #programme_price").val(data.programmePrice);
		$("#programmes_settings_block #programme_discount").val(data.programmeDiscount);
		$("#programmes_settings_block #programme_discount_percentage").val(data.programmeDiscountPercentage);
		$("#programmes_settings_block .promotion_start_date").val(data.programmePromotionStart);
		$("#programmes_settings_block .promotion_end_date").val(data.programmePromotionEnd);
		$("#programmes_settings_block #programme_description_block textarea").val(data.programmeDescription);
		$("#programmes_settings_block #programme_promotion_description_block textarea").val(data.programmePromotionDescription);
	});
	
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