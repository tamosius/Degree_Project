
// store member profile details when returned from the database
// and use them if the user clicks 'cancel' button in update profile state
var memberProfile = null;


$(document).ready(function(){
	
/*------- BIND TEXTFIELDS WITH CALENDAR IN 'index.jsp' ('member_profile.js') FILE ---------------------------------------------------*/
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
	
	
/*--------------- SHOW 'member_profile' ON DOUBLE CLICK ON MEMBER TABLE ROW -----------------------------------------------------*/
    $("body").delegate(".row_data, .last_attended_member, .last_updated_member, .recently_joined_member," +
    		"#reports_big_table_body_table tr, .report_table_body .report_row", "dblclick", function(){
	
    	// get member ID, clicked in the table
    	var id = $(this).find("#member_id").val();
        
        // show member details in 'member_data' class
        $(".member_profile_right_sidebar div").removeClass("member_data_update");
        $(".member_profile_right_sidebar div").addClass("member_data");
        
        
   /*--------- CHECK THIS OUT ---------------------------------------------------------------------------*/     
        $('.member_profile_left_sidebar #photo_button').css({'visibility' : 'hidden', 'display' : 'block'});
        $('.member_profile_left_sidebar #shoot_button').css('display', 'none');
        
        $('.add_member_left_sidebar #shoot_button, .member_profile_left_sidebar #shoot_button, .add_member_left_sidebar #photo_camera, .member_profile_left_sidebar #photo_camera').css('display', 'none');
        $('.add_member_left_sidebar #photo_button, .member_profile_left_sidebar #photo_button, .add_member_left_sidebar #image, .member_profile_left_sidebar #image').show();  /* show the same image if user does not update it */
   /*--------- CHECH THIS OUT ---------------------------------------------------------------------------*/
        
        
        // enable 'delete' button
        $('.member_profile_bottom_panel #delete_button').prop('disabled', false).css('opacity', 1); 
        
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
            	console.log("executed: " + parseInt(Math.random() * 10000000));
            	$(".member_profile_left_sidebar .image img").attr("src", "resources/images/membersImages/" + data.id + ".jpg?" + parseInt(Math.random() * 1000000));
            	
            	$(".member_data #member_id").val(data.id);
            	$(".member_data label").text(data.id);
            	$(".member_data #first_name").val(data.firstName);
            	$(".member_data #last_name").val(data.lastName);
            	$(".member_data #address").val(data.address);
            	$(".member_data #ph_number").val(data.phNumber);
            	$(".member_data #date_of_birth").val(data.dateOfBirth);
            	$(".member_data #email").val(data.email);
            	$(".member_data #programme").val(data.programme);
            	$(".member_data #from").val(data.membershipFrom);
            	$(".member_data #to").val(data.membershipTo);
            	$(".member_data #paid").val(data.paid);
            	$(".member_data #date_joined").val(data.dateJoined);
            	
            	// set font to 'member_data' state and ('N / A', 'no membership', etc)
            	// function is in this file (at the bottom)
            	memberDataFont();
            },
            error: function (xhr) {
                alert("Failed!" + xhr.responseText);
            }
        });
        
        $(".background_overlay, .member_profile_panel").animate({
        	height : "toggle"
        });
    });
    
/*------------- 'DROP-DOWN' ARROW, FADEIN, FADEOUT 'programe type' SELECTION -----------------------------------------------*/
        $(".member_profile_right_sidebar #second_block #programme_drop_down_arrow").click(function(){
        	
        	$(".member_profile_right_sidebar #second_block #programme_type").animate({
        		
        		height : "toggle"
        	});
        });
        
/*------------ SELECT 'programme type' IN THE 'DROP-DOWN' MENU IN 'programme' FIELD ----------------------------------------*/
        $(".member_profile_right_sidebar #second_block #programme_type div").click(function(){
        	
        	// get the programme name selected in the 'drop-down' menu
        	var programmeName = $("span", this).text();
        	
        	// set text value selected from 'drop-down' menu
        	$(".member_profile_right_sidebar #second_block #programme").val($("span", this).text());
        	
        	if(programmeName.localeCompare("'Pay as You Go'") === 0){
        		
        		$(".member_profile_content #second_block #from").val("no membership");
        		$(".member_profile_content #second_block #to").val("no membership");
        	}
        	else{
        		
        		// get number of days depending on membership type
            	var membershipDays = $("p", this).text();
            	
            	// call the function to display calendar days when membership programme is selected
            	// function is in this file (at the bottom)
            	membershipProgrammeLength(membershipDays);
        	}
        	
        	// hide 'drop-down' menu after selection made
        	$(".member_profile_right_sidebar #second_block #programme_type").animate({
        		
        		height : "toggle"
        	});
        	
        	// set font to 'member_data_update' state and ('N / A', 'no membership', etc)
        	// function is in this file (at the bottom)
        	memberDataUpdateFont();
        });
    
/*------------- UPDATE MEMBER PROFILE, CLICK 'update profile' BUTTON -------------------------------------------------------*/    
    $(".member_profile_bottom_panel #update_button").click(function(){
    	
        //$('.member_data #membership_to_before_update').val($('.member_data #to').val());
        
        // show 'bottom_update_panel' with 'cancel' and 'submit' buttons when 'update profile button is clicked
        $(".member_profile_right_sidebar #bottom_update_panel").show(500);
        
        // show member details in 'member_data_update' class 
        $(".member_profile_right_sidebar div").removeClass("member_data");
        $(".member_profile_right_sidebar div").addClass("member_data_update");
        
        // remove attribute 'disabled' in 'input' and make it 'enabled' text
        $(".member_data_update input").removeAttr("disabled");
        
        // add css to 'member_profile_right_sidebar' to show border and shadow
        $(".member_profile_right_sidebar").css({"border" : "solid 1px #D3D3D3", "box-shadow" : "4px 4px 4px black"});
        
        
        
    /*------------- CHECK THIS OUT ------------------------------------------------------------*/
        $('.member_profile_left_sidebar #photo_button').css('visibility', 'visible');
    /*------------- CHECK THIS OUT ------------------------------------------------------------*/
        
        // set font to 'member_data_update' state and ('N / A', 'no membership', etc)
    	memberDataUpdateFont();
    	
    	// display 'drop-down' arrow in 'programme' field
        $(".member_profile_right_sidebar #second_block #programme_drop_down_arrow").show();
        
        // disable 'Delete Profile' button when 'Update Profile' button is clicked
        $(".member_profile_bottom_panel #delete_button").prop("disabled", true).css("opacity", 0.4); 
        
    });
    
/* ---------- 'Back' BUTTON FADES OUT 'add_member' OR 'member_profile' WINDOW ----------------------------------- */
    $(".add_member_bottom_panel #back_button, .member_profile_bottom_panel #back_button").click(function(){
    	
    	// fade out the window
    	$('.background_overlay, .member_profile_panel, .add_member_content').animate({
        	height : "hide"
        });
        
        // show member details in 'member_data' class
        $(".member_profile_right_sidebar div").removeClass("member_data_update");
        $(".member_profile_right_sidebar div").addClass("member_data");
        
        // hide 'bottom_update_panel' with 'cancel' and 'submit' buttons
        $(".member_profile_right_sidebar #bottom_update_panel").hide(500);
        
        // do not show border and shadow on 'member_profile_right_sidebar'
        $(".member_profile_right_sidebar").css({"border" : "none", "box-shadow" : "none"});
        
        // add attribute 'disabled' in 'input' and make it 'disabled' text
        $(".member_data input").attr("disabled", "disabled");
        
        // set font to 'member_data' state and ('N / A', 'no membership', etc)
    	memberDataFont();
    	
    	// do not display 'drop-down' arrow in 'programme' field
        $(".member_profile_right_sidebar #second_block #programme_drop_down_arrow").hide();
        
        // enable 'Delete Profile' button when user clicks 'Back' button
        $(".member_profile_bottom_panel #delete_button").prop("disabled", false).css("opacity", 1); 
        
        
     /*---------- CHECK THIS OUT ----------------------------------------------------------------------*/
        $('.add_member_left_sidebar #shoot_button, .member_profile_left_sidebar #shoot_button, .add_member_left_sidebar #photo_camera, .member_profile_left_sidebar #photo_camera').css('display', 'none');
        $('.add_member_left_sidebar #photo_button, .member_profile_left_sidebar #photo_button, .add_member_left_sidebar #image, .member_profile_left_sidebar #image').show();  /* show the same image if user does not update it */
     /*---------- CHECK THIS OUT ----------------------------------------------------------------------*/
          
    });
    
/*------------------------ CANCEL UPDATE MEMBER PROFILE ----------------------------------------------------------------------------------- */
    $("#cancel_update").click(function(){
    	
    	// show member details in 'member_data' class
        $(".member_profile_right_sidebar div").removeClass("member_data_update");
        $(".member_profile_right_sidebar div").addClass("member_data");
        
        
    /*--------- CHECK THIS OUT ---------------------------------------------------------------------------------*/
        $('.member_profile_left_sidebar #photo_button').css({'visibility' : 'hidden', 'display' : 'block'});
        $('.member_profile_left_sidebar #shoot_button').css('display', 'none');
    /*--------- CHECK THIS OUT ---------------------------------------------------------------------------------*/
        
        
        // set the 'member_profile' details to initial state
        // if user clicks 'cancel' button
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

/* ------------------- TEXTBOXES IN MEMBER PROFILE WINDOW, CHANGE FONT SIZES --------------------------------------------------------------------------------------- */
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
    	
        if(($(this).val().localeCompare("no membership") === 0) || ($(this).val().localeCompare("N / A") === 0)){
        	
            $(this).css({"font-size" : "12px", "color" : "#FF6262"});
            
        }else{
        	
        	if(($(this).attr("id").localeCompare("first_name") === 0) || ($(this).attr('id').localeCompare("last_name") === 0)){
        		
                $(this).css({"font-size" : "22px", "color" : "white"});
                
            }else{
            	
            	$(this).css({"font-size" : "17px", "color" : "white"});
            }
        } // end of outer 'else'
    });
}
/*------ CHANGE FONT COLORS AND SIZE TO UPDATE STATE WHEN USER CLICKS 'update profile' BUTTON ------------------------------*/
function memberDataUpdateFont(){
	
    $(".member_data_update input").each(function(){
        
        if($(this).val() === "no membership" || $(this).val() === "N / A"){
        	
            $(this).css({"font-size" : "12px", "color" : "#FF6262"});
        }else{
        	
        	if(($(this).attr('id') === 'first_name') || ($(this).attr('id') === 'last_name')){
        		
                $(this).css({'color' : '#525252', 'font-size' : '22px'});
            }else{
            	
            	$(this).css({'color' : '#525252', 'font-size' : '15px'});
            }
        }
    });
}

/*------ CALCULATE AND DISPLAY CALENDAR DAYS WHEN MEMBERSHIP PROGRAMME IS SELECTED IN 'programme' FIELD ---------------------*/
function membershipProgrammeLength(days){
	
	var today = new Date();
	
	// get date in 'dd-mm-YY' format
	var membershipFrom = addZeroToDate(today.getDate()) + "-" + addZeroToDate((today.getMonth() + 1)) + "-" + today.getFullYear();
	
	// display todays date in 'membership_from' text field
	$(".member_profile_right_sidebar #second_block #from").val(membershipFrom);
	
	// get 'membership_to' date, add the numbers of days depending on programme type
	var addDays = new Date(today.setDate(today.getDate() + parseInt(days)));
	
	// get 'membership_to' date in 'dd-mm-YY' format
	var membershipTo = addZeroToDate(addDays.getDate()) + "-" + addZeroToDate((addDays.getMonth() + 1)) + "-" + addDays.getFullYear();
	
	// display 'membership_to' date in the field
	$(".member_profile_right_sidebar #second_block #to").val(membershipTo);
}

/*------- FUNCTION TO ADD '0' IF THE DAY OR MONTH LESS THAN 10 --------------------------------------------------------------*/
function addZeroToDate(value){
	
	if(value < 10){
		
		value = "0" + value;
	}
	return value;
}



