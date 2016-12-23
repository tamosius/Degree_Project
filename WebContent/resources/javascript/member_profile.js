
// store member profile details when returned from the database
// and use them if the user clicks 'cancel' button in update profile state
var memberProfile = "";


/*===================================================================================================================================*/
/*--------- JQUERY READY ------------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
/*------- BIND TEXTFIELDS IN 'Member Profile' WITH CALENDAR IN 'index.jsp'-----------------------------------------------------------*/
	/*---- DATE OF BIRTH ------------------------------------------------------*/
	$(".member_profile_content #first_block #date_of_birth").focusin(function(){
		
		   $(this).datepicker({
			   
			   showAnim   : "slide",
			   dateFormat : "dd-mm-yy",
			   firstDay   : 1,
			   changeYear : true,
			   yearRange  : "1940:" + (new Date().getFullYear()),
			   
			   beforeShow: function (textbox, instance) {
		            instance.dpDiv.css({
		                    marginTop: 0 + 'px',
		                    marginLeft: 0 + 'px'
		            });
		        },
			   
			   //changeMonth: true,
			   //showOtherMonths: true,
			   //selectOtherMonths: true,
			   
			   onSelect   : function(dateText){
				   
				    // set font to 'member_data_update' state and ('N / A', 'no membership', etc)
		        	// function is in this file (at the bottom)
		        	memberDataUpdateFont();
			   }
		   });
	});
	
	/*--------- MEMBERSHIP FROM DATE ----------------------------------*/
	$(".member_profile_content #second_block #from").focusin(function(){
		
		   $(this).datepicker({
			   
			   showAnim   : "slide",
			   dateFormat : "dd-mm-yy",
			   firstDay   : 1,
			   changeYear : true,
			   yearRange  : "2010:2025",
			   
			   beforeShow: function (textbox, instance) {
		            instance.dpDiv.css({
		                    marginTop: 0 + 'px',
		                    marginLeft: 0 + 'px'
		            });
		        },
			   
			   //changeMonth: true,
			   //showOtherMonths: true,
			   //selectOtherMonths: true,
			   
			   onSelect   : function(dateText){
				   
				   membershipFromDate = dateText;
				   
				   // calculate the number of days selected
				   var daysOfMembership = checkDateSelections(($(".member_profile_content #second_block #from").val()), 
			        		  ($(".member_profile_content #second_block #to").val()));
				   
				   // calculate date difference if 'startDate' and 'endDate' are selected
                   // show 'error' message if 'startDate' higher than 'endDate' (reports.js' file)
				   // function 'checkDateSelections' is in the 'reports.js' file
				   $(".member_profile_content #second_block #programme")
			          .val(parseInt(daysOfMembership) == 0 ? "'Pay as You Go'" : "'" + daysOfMembership + " days Mbsh'");
				   
				   // set font to 'member_data_update' state and ('N / A', 'no membership', etc)
		           // function is in this file (at the bottom)
		           memberDataUpdateFont();
			   }
		   });
	});
	
	/*-------- MEMBERSHIP TO DATE ------------------------------------*/
	$(".member_profile_content #second_block #to").focusin( function(){
		
		   $(this).datepicker({
			   
			   showAnim   : "slide",
			   dateFormat : "dd-mm-yy",
			   firstDay   : 1,
			   changeYear : true,
			   
			   beforeShow: function (textbox, instance) {
		            instance.dpDiv.css({
		                    marginTop: 0 + 'px',
		                    marginLeft: 0 + 'px'
		            });
		        },
			   
			   onSelect   : function(dateText){
				   
				   membershipToDate = dateText;
				   
				// calculate the number of days selected
				   var daysOfMembership = checkDateSelections(($(".member_profile_content #second_block #from").val()), 
			        		  ($(".member_profile_content #second_block #to").val()));
				   
				   // calculate date difference if 'startDate' and 'endDate' are selected
                   // show 'error' message if 'startDate' higher than 'endDate' (reports.js' file)
				   // function 'checkDateSelections' is in the 'reports.js' file
				   $(".member_profile_content #second_block #programme")
			          .val(parseInt(daysOfMembership) == 0 ? "'Pay as You Go'" : "'" + daysOfMembership + " days Mbsh'");
				   
				   // set font to 'member_data_update' state and ('N / A', 'no membership', etc)
		           // function is in this file (at the bottom)
		           memberDataUpdateFont();
			   }
		   });
	});
	

/*===============================================================================================================================*/
/*--------------- SHOW 'Member_Profile' ON CLICK IN THE TABLE ROW ---------------------------------------------------------------*/
    $("body").delegate(".body_table .row_data .first_name_data, .body_table .row_data .last_name_data," +
    		".left_sidebar .last_attended_member .image," +
    		".left_sidebar .last_attended_member #full_name," +
    		".left_sidebar .last_updated_member .image," +
    		".left_sidebar .last_updated_member #full_name," +
    		".left_sidebar .recently_joined_member .image," +
            ".left_sidebar .recently_joined_member #full_name," +
    		"#reports_big_table_body_table tr .first_column," +
    		".report_table_body .report_row .report_column1," +
    		".products_displayed .bottom_table_body",
    		"click", function(){
	
    	// get member ID, clicked in the table
    	var id = $(this).parent().find("#member_id").val();
        
        // show member details in 'member_data' class
        $(".member_profile_right_sidebar div").removeClass("member_data_update");
        $(".member_profile_right_sidebar div").addClass("member_data");
        
        /*----- BUTTONS UNDER PICTURE -----------*/
        $(".member_profile_left_sidebar #shoot_button").hide(); // 'Take a Snapshot'
        $(".member_profile_left_sidebar #photo_button").show(); // 'New Photo'
     
        // enable 'Delete' button
        $('.member_profile_bottom_panel #delete_button').prop('disabled', false).css('opacity', 1); 
        // disable 'New Photo', 'Upload Picture' buttons
        $(".member_profile_left_sidebar .photo_button, .member_profile_left_sidebar .upload_picture_button")
                .prop("disabled", true).css("opacity", 0.4);
        
        $.ajax({
        	
            type: "POST",
            url: "/Degree_Project/contr/memberProfile",
            data: {id : id},
            dataType: "json",
            processData: true,
            cache  : false,
            success: function (data, status, jqXHR) {
            	
            	// assign data to variable to use it later in update profile state
            	// if user clicks 'cancel' button
            	memberProfile = data;
            	
            	$(".member_profile_left_sidebar .image img").attr("src", "resources/images/membersImages/" + data.imagePath +"?" + parseInt(Math.random() * 1000000));
            	
            	$(".member_data #programme_id").val(data.programmeId);
            	$(".member_data #member_id").val(data.id);
            	$(".member_data #id_label").text(data.id);
            	$(".member_data #first_name").val(data.firstName);
            	$(".member_data #last_name").val(data.lastName);
            	$(".member_data #address").val(data.address);
            	$(".member_data #ph_number").val(data.phNumber);
            	$(".member_data #date_of_birth").val(data.dateOfBirth);
            	$(".member_data #email").val(data.email);
            	$(".member_data #programme").val(data.programme);
            	$(".member_data #from").val(data.membershipFrom);
            	$(".member_data #to").val(data.membershipTo);
            	//$(".member_data #paid").val(data.paid);
            	$(".member_data #date_joined").val(data.dateJoined);
            	
            	// set font to 'member_data' state and ('N / A', 'no membership', etc)
            	// function is in this file (at the bottom)
            	memberDataFont();
            	
            	$(".background_overlay, .member_profile_panel").slideDown(250);
            },
            error: function (xhr) {
            	
                alert("Failed to retrieve member profile!");
            }
        });
    });
    
    
/*==========================================================================================================================*/
/*------------- CLICK 'New Photo', 'Take a Snapshot' BUTTONS ---------------------------------------------------------------*/
    $(".member_profile_left_sidebar .photo_button").click(function(){
    	
    	/*----- BUTTONS UNDER PICTURE -----------*/
        $(".member_profile_left_sidebar .shoot_button").show(); // 'Take a Snapshot'
        $(".member_profile_left_sidebar .photo_button").hide(); // 'New Photo'
    });
    
    $(".member_profile_left_sidebar .shoot_button").click(function(){
    	
    	/*----- BUTTON UNDER PICTURE -----------*/
        $(".member_profile_left_sidebar .shoot_button").hide(); // 'Take a Snapshot'
        $(".member_profile_left_sidebar .photo_button").show(); // 'New Photo'
    });
    
    
    
/*==========================================================================================================================*/
/*------------- 'DROP-DOWN' ARROW, FADEIN, FADEOUT 'programe type' SELECTION -----------------------------------------------*/
        $(".member_profile_right_sidebar #second_block #programme_drop_down_arrow").click(function(){
        	
        	$(".member_profile_right_sidebar #second_block #programme_type," +
        			".add_member_right_sidebar #programme_type").animate({
        		
        		height : "toggle"
        	});
        });
        
/*------------ SELECT 'programme type' IN THE 'DROP-DOWN' MENU IN 'programme' FIELD ----------------------------------------*/
        $(".member_profile_right_sidebar #second_block #programme_type div").click(function(){
        	
        	// get number of days depending on membership type
        	var membershipDays = parseInt($("p", this).text());
        	
        	// get programme ID
        	var programmeId = $(this).find("input#prog_id").val();
        	
        	// set text value selected from 'drop-down' menu
        	$(".member_profile_right_sidebar #second_block #programme").val($("span", this).text());
        	
        	if(membershipDays === 0){
        		
        		$(".member_profile_right_sidebar #second_block #from").val(getTodaysDate());
        		$(".member_profile_right_sidebar #second_block #to").val("present");
        	}
        	else{
        		
        		// calculate the programme length and display it in the fields 'From', 'To'
        		// in date format
        		var programmeLength = membershipProgrammeLength(membershipDays);
            	
        		// display todays date in 'membership_from' text field
        		$(".member_profile_right_sidebar #second_block #from").val(programmeLength.programmeFrom);
        		
        		// display 'membership_to' date in the field
        		$(".member_profile_right_sidebar #second_block #to").val(programmeLength.programmeTo);
        	}
        	// get values for the selected programme (discounts, full price, etc)
        	// function in 'programmes.js' file
        	var programmeDetails = getProgrammeDetails(programmeId);
        	// set to the fields
        	$(".member_profile_right_sidebar #programme_id").val(programmeId);
        	$(".member_profile_right_sidebar #price").val(programmeDetails.programmePrice);
        	$(".member_profile_right_sidebar i").text(programmeDetails.programmeDiscountPercentage + "%");
        	$(".member_profile_right_sidebar #paid").val(programmeDetails.finalPrice);
        	$(".member_profile_right_sidebar #to_pay").val(programmeDetails.finalPrice);
        		
        	//setFonts(".member_data_update input");
        	// hide 'drop-down' menu after selection made
        	$(".member_profile_right_sidebar #second_block #programme_type").slideUp(300);
        	
        	// set font to 'member_data_update' state and ('N / A', 'no membership', etc)
        	// function is in this file (at the bottom)
        	//memberDataUpdateFont();
        });
    
        
/*==========================================================================================================================*/
/*------------- UPDATE MEMBER PROFILE, CLICK 'Update Profile' BUTTON -------------------------------------------------------*/    
    $(".member_profile_bottom_panel #update_button").click(function(){
    	
    	// enable 'New Photo', 'Upload Picture' buttons
        $(".member_profile_left_sidebar .photo_button, .member_profile_left_sidebar .upload_picture_button")
                .prop("disabled", false).css("opacity", 1);
        
        // show 'bottom_update_panel' with 'cancel' and 'submit' buttons when 'update profile button is clicked
        $(".member_profile_right_sidebar #bottom_update_panel").show(500);
        
        // show member details in 'member_data_update' class 
        $(".member_profile_right_sidebar div").removeClass("member_data");
        $(".member_profile_right_sidebar div").addClass("member_data_update");
        
        // remove attribute 'disabled' in 'input' and make it 'enabled' text
        $(".member_data_update input").removeAttr("disabled");
        
        
        // add css to 'member_profile_right_sidebar' to show border and shadow
        $(".member_profile_right_sidebar").css({"border" : "solid 1px #D3D3D3", "box-shadow" : "4px 4px 4px black"});
        
        // set font to 'member_data_update' state and ('N / A', 'Pay as You Go', etc)
    	memberDataUpdateFont();
    	
    	// disable 'Joined on' field, do not allow change value
    	$(".member_data_update #date_joined").attr("disabled", true);
    	
    	// display 'drop-down' arrow in 'programme' field
        $(".member_profile_right_sidebar #second_block #programme_drop_down_arrow").show();
        
        // disable 'Delete Profile' button when 'Update Profile' button is clicked
        $(".member_profile_bottom_panel #delete_button").prop("disabled", true).css("opacity", 0.4); 
        
    });
    
    
/*=========================================================================================================================*/
/* ---------- 'Back' BUTTON FADES OUT 'add_member' OR 'member_profile' WINDOW ---------------------------------------------*/
    $(".add_member_bottom_panel #back_button, .member_profile_bottom_panel #back_button").click(function(){
    	
    	// fade out the window
    	$('.background_overlay, .member_profile_panel, .add_member_content').slideUp(250);
        
        // show member details in 'member_data' class
        $(".member_profile_right_sidebar div").removeClass("member_data_update");
        $(".member_profile_right_sidebar div").addClass("member_data");
        
        // hide 'bottom_update_panel' with 'cancel' and 'submit' buttons
        $(".member_profile_right_sidebar #bottom_update_panel").hide(500);
        
        // do not show border and shadow on 'member_profile_right_sidebar'
        $(".member_profile_right_sidebar").css({"border" : "none", "box-shadow" : "none"});
        
        // add attribute 'disabled' in 'input' and make it 'disabled' text
        $(".member_data input").attr("disabled", "disabled");
        
        // set font to 'member_data' state and ('N / A', 'Pay as You Go', etc)
    	memberDataFont();
    	
    	// do not display 'drop-down' arrow in 'programme' field
        $(".member_profile_right_sidebar #second_block #programme_drop_down_arrow").hide();
        
        // enable 'Delete Profile' button when user clicks 'Back' button
        $(".member_profile_bottom_panel #delete_button").prop("disabled", false).css("opacity", 1); 
        
        // hide 'drop-down' menu after selection made in 'Add New Member' or 'Member Profile'
    	$(".member_profile_right_sidebar #second_block #programme_type," +
    			".add_member_right_sidebar #programme_type").slideUp(300);
    });
    
    
/*==========================================================================================================================*/
/*------------------------ CANCEL UPDATE MEMBER PROFILE ------------------------------------------------------------------- */
    $("#cancel_update").click(function(){
    	
    	// disable 'New Photo', 'Upload Picture' buttons
        $(".member_profile_left_sidebar .photo_button, .member_profile_left_sidebar .upload_picture_button")
                .prop("disabled", true).css("opacity", 0.4);
        
        /*----- BUTTON UNDER PICTURE -----------*/
        $(".member_profile_left_sidebar .shoot_button").hide(); // 'Take a Snapshot'
        $(".member_profile_left_sidebar .photo_button").show(); // 'New Photo'
    	
    	// show member details in 'member_data' class
        $(".member_profile_right_sidebar div").removeClass("member_data_update");
        $(".member_profile_right_sidebar div").addClass("member_data");
        
        
        // set the 'member_profile' details to initial state
        // if user clicks 'cancel' button
        $(".member_profile_left_sidebar .image img").attr("src", "resources/images/membersImages/" + memberProfile.imagePath +"?" + parseInt(Math.random() * 1000000));
        $(".member_data #first_name").val(memberProfile.firstName);  
        $(".member_data #last_name").val(memberProfile.lastName);
        $(".member_data #address").val(memberProfile.address);
        $(".member_data #ph_number").val(memberProfile.phNumber);
        $(".member_data #date_of_birth").val(memberProfile.dateOfBirth);  
        $(".member_data #email").val(memberProfile.email);
        $(".member_data #programme").val(memberProfile.programme);
        $(".member_data #from").val(memberProfile.membershipFrom);
        $(".member_data #to").val(memberProfile.membershipTo);
        $(".member_data #paid").val(memberProfile.paid);
        $(".member_data #date_joined").val(memberProfile.dateJoined);
        
        // hide 'drop-down' menu under 'programme' field
    	$(".member_profile_right_sidebar #second_block #programme_type").hide();
    	
        // hide 'bottom_update_panel' with 'cancel' and 'submit' buttons
        $(".member_profile_right_sidebar #bottom_update_panel").hide(500);
        
        // do not show border and shadow on 'member_profile_right_sidebar'
        $(".member_profile_right_sidebar").css({"border" : "none", "box-shadow" : "none"});
        
        // add attribute 'disabled' in 'input' and make it 'disabled' text
        $(".member_data input").attr("disabled", "disabled");
        
        // set font to 'member_data' state and ('N / A', 'no membership', etc)
    	memberDataFont();
        
        // enable 'Delete Profile' button when user clicks 'Cancel' button in update profile state
        $(".member_profile_bottom_panel #delete_button").prop("disabled", false).css("opacity", 1);
        
        // do not display 'drop-down' arrow in 'programme' field
        $(".member_profile_right_sidebar #second_block #programme_drop_down_arrow").hide();
         
    });

    
/*==========================================================================================================================*/
/* ------------------- TEXTBOXES IN MEMBER PROFILE WINDOW, CHANGE FONT SIZES ---------------------------------------------- */
    $('.member_data input').keyup(function(){
        if(!this.value){
            if(($(this).attr('id') === 'first_name') || ($(this).attr('id') === 'last_name')){
                $(this).css({'color' : '#525252', 'font-size' : '22px'});
            }else{
                $(this).css({'color' : '#525252', 'font-size' : '17px'});
            }
            
        }
    });
});

/*------ CHANGE FONT COLORS AND SIZE TO INITIAL STATE WHEN USER CLICKS 'cancel update' BUTTON ------------------------------*/
function memberDataFont(){
	
    $(".member_data input").each(function(){
    	
        if($(this).val().localeCompare("N / A") === 0){
        	
            $(this).css({"font-size" : "12px", "color" : "#FF6262"});
            
        }else{
        	
        	if(($(this).attr("id").localeCompare("first_name") === 0) || ($(this).attr('id').localeCompare("last_name") === 0)){
        		
                $(this).css({"font-size" : "22px", "color" : "white"});
                
            }else{
            	
            	$(this).css({"font-size" : "15px", "color" : "white"});
            }
        } // end of outer 'else'
    });
}
/*------ CHANGE FONT COLORS AND SIZE TO UPDATE STATE WHEN USER CLICKS 'update profile' BUTTON ------------------------------*/
function memberDataUpdateFont(){
	
    $(".member_data_update input").each(function(){
        
        if($(this).val() === "N / A"){
        	
            $(this).css({"font-size" : "12px", "color" : "#660000"});
        }else{
        	
        	if(($(this).attr('id') === 'first_name') || ($(this).attr('id') === 'last_name')){
        		
                $(this).css({'color' : '#00003D', 'font-size' : '22px'});
            }else{
            	
            	$(this).css({'color' : '#00003D', 'font-size' : '15px'});
            }
        }
        if($(this).attr("id").localeCompare("from") === 0 || $(this).attr("id").localeCompare("to") === 0){
			
			if($(this).val().localeCompare("present") === 0){
				
				$(this).prop("disabled", true).css({"color" : "#004d00", "font-size" : "13px"});
			}
			else{
				
				$(this).prop("disabled", true).css({"color" : "#001a00", "font-size" : "14px"});
			}
		}
		if($(this).attr("id").localeCompare("programme") === 0){
			
			$(this).prop("disabled", true).css({"color" : "#00003D", "font-size" : "14px", "disabled" : "disabled"});
		}
    });
}

/*------ CALCULATE AND DISPLAY CALENDAR DAYS WHEN MEMBERSHIP PROGRAMME IS SELECTED IN 'programme' FIELD ---------------------*/
function membershipProgrammeLength(days){
	
	var today = new Date();
	
	// get date in 'dd-mm-YY' format
	var membershipFrom = addZeroToDate(today.getDate()) + "-" + addZeroToDate((today.getMonth() + 1)) + "-" + today.getFullYear();
	
	// get 'membership_to' date, add the numbers of days depending on programme type
	var addDays = new Date(today.setDate(today.getDate() + parseInt(days)));
	
	// get 'membership_to' date in 'dd-mm-YY' format
	var membershipTo = addZeroToDate(addDays.getDate()) + "-" + addZeroToDate((addDays.getMonth() + 1)) + "-" + addDays.getFullYear();
	
	var programmeLength = {
			
			programmeFrom : membershipFrom,
			programmeTo   : membershipTo
	};
	
	return programmeLength;
}

/*------- FUNCTION TO ADD '0' IF THE DAY OR MONTH LESS THAN 10 --------------------------------------------------------------*/
function addZeroToDate(value){
	
	if(value < 10){
		
		value = "0" + value;
	}
	return value;
}



