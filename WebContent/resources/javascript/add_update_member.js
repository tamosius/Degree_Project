
// function to assign 'update description' variable
// when adding new members to the database
function getUpdateDescription(programme){
	
	if(programme.localeCompare("'Pay as You Go'") === 0){
		
		return "Starded " + programme + " Programme";
	}
	else{
		
		return "Booked " + programme + " Programme";
	}
}


/*================================================================================================================*/
/*---------- JQUERY READY ----------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
	
/*---------- REMOVE CLASS 'error' IF CLICKED IN ON THE FIELD ('member_data' in 'member_profile_content' ----------*/
	$(".add_member_data :input, .member_data :input").click(function(){
		
		$(this).removeClass("error");
		$(this).removeClass("error_dates");
    });
	
	
	
/*================================================================================================================*/
/*----------- POP-UP WINDOW ('Add new Member' button) ------------------------------------------------------------*/
    $("body").delegate(".left_sidebar #add_member, .dashboard_top_left #add_button", "click", function(){
    	
    	$(".add_member_right_sidebar i").text("0%");
    	
    	// display 'no_photo' picture
    	$(".add_member_content .image img").attr("src", "resources/images/membersImages/no_photo.jpg");
    	
    	// clear upload file
    	$(".add_member_content #add_member_upload").val("");
    	
    	// clear 'input' fields and remove 'error' classes when loading new window
        $(".add_member_data input").each(function(){
        	
        	// clear all text boxes
            $(this).val("");
            
            // remove red font color in text boxes after 'error' validation made
            $(this).removeClass("error");
        });
        
        
        
        // fade in the 'add_member' panel content
        $(".background_overlay, .add_member_content").fadeIn(200);
        
        // focus on 'first_name' text input box
        $(".add_member_right_sidebar #first_name").focus();
    });
    
    
/*========================================================================================================================*/
/*----------- VALIDATE AND SUBMIT FORM ON 'Add new Member' or 'Update Member'---------------------------------------------*/
    $(".member_profile_panel form, .add_member_content form").submit(function(event){
    	
        var error_message = "";
        
        // get values from the 'form'
        var action = $(this).find("#action").val();                          // action to do ('new_member' of 'update_member')
        var id = $(this).find("#member_id").val();
        var firstName = ($(this).find("#first_name").val()).trim();
        var lastName = ($(this).find("#last_name").val()).trim();
        var address = (assignNA($(this).find("#address").val())).trim();           // assign 'N / A' if the field has been left blank in the form
        var phNumber = (assignNA($(this).find("#ph_number").val())).trim();        // assign 'N / A' if the field has been left blank in the form
        var dateOfBirth = (assignNA($(this).find("#date_of_birth").val())).trim(); // assign 'N / A' if the field has been left blank in the form
        var email = $(this).find("#email").val().trim();                           
        var membershipFrom = $(this).find("#from").val().trim();                   // assign 'Pay as You Go'' if the field has been left blank in the form
        var membershipTo = $(this).find("#to").val().trim();                       // assign 'Pay as You Go'' if the field has been left blank in the form
        var programme = $(this).find("#programme").val().trim();                   
        var toPay = (assignZero($(this).find("#to_pay").val())).trim();            // the amount the customer has to pay
        var paid = (assignZero($(this).find("#paid").val())).trim();               // the amount the customer has paid
                                                                          // functions are in this file
        // this will be assigned when executing 'else if' statements
        // in the 'new_member' or 'update_member'
        var programmeState = "";
        var updateDescription = "";    
        
        // clear the pop-up 'error' window
        $(".error_window").empty();
        
        if(firstName.length === 0){
            
            $(this).find("#first_name").addClass("error");
            $(":focus").blur();   /* unfocus this field */
            
            // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
            error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> The <span class='fault_reason'>'First Name'</span>" +
            		" field cannot be empty!<br> <span style='margin-left: 20px;'>Please enter The First Name.</span><br><br></div>";
            event.preventDefault();
        }
        if(lastName.length === 0){
            
            $(this).find("#last_name").addClass("error");
            $(":focus").blur();  /* unfocus this field */
            
            // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
            error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> The <span class='fault_reason'>'Last Name'</span>" +
            		" field cannot be empty!<br> <span style='margin-left: 20px;'>Please enter The Last Name.</span><br><br></div>";
            event.preventDefault();
        }
        
        // if the 'Date of Birth' field is not empty and the value is not 'N / A', then validate the date
        if((dateOfBirth !== "") && (dateOfBirth !== "N / A")){
        	
            var date_field = $(this).find("#date_of_birth"); // get the property of '#date_of_birth' and assign to the variable (then you can add an 'error' class)
                                                             // in the case of input invalidation 
            
            if(!isDate(dateOfBirth.substring(0, 10))){  // call the 'isDate' function to validate the date
            	
                date_field.val("");
                date_field.addClass("error");
                $(":focus").blur(); /* unfocus this field */
                
                // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
                error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> Invalid <span class='fault_reason'>'Date of Birth'</span> format:" +
                		" <span class='faulty_format'>'" + dateOfBirth + "'</span>.<br> <span style='margin-left: 20px;'>Please re-enter.</span><br><br></div>";
                event.preventDefault();
            }
        }
        
        // validate if 'Email' field is not empty
        if(email.length === 0){
            
        	$(this).find("#email").addClass("error");
            $(":focus").blur();   /* unfocus this field */
            
            // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
            error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> The <span class='fault_reason'>'Email'</span>" +
                   " field cannot be empty!<br> <span style='margin-left: 20px;'>Please enter the Email address.</span><br><br></div>";
            event.preventDefault();
           
        }
        
        // if the 'Email' field is not empty and the value is not 'N / A', then validate the email
        if((email !== "") && (email !== "N / A")){
        	
            var email_field = $(this).find("#email"); // get the property of '#email' and assign to the variable (then you can add an 'error' class)
                                                      // in the case of input invalidation
            
            if(!validateEmail(email)){  // call the 'validateEmail' function to validate email
            	
                email_field.val("");
                email_field.addClass("error");
                $(":focus").blur(); /* unfocus this field */
                
                // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
                error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> Invalid <span class='fault_reason'>'Email'</span> format: " +
                		"<span class='faulty_format'>'" + email + "'</span>.<br> <span style='margin-left: 20px;'>Please re-enter.</span><br><br></div>";
                event.preventDefault();
            }
        }
        
        // validate if 'Programme' field is not empty
        if(programme.length === 0){
        	
        	$(this).find("#programme").addClass("error");
            $(":focus").blur();   /* unfocus this field */
                 
            // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
            error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> The <span class='fault_reason'>'Programme'</span>" +
        		" field cannot be empty!<br> <span style='margin-left: 20px;'>Please select the Programme type.</span><br><br></div>";
            event.preventDefault();
        }
        
        // validate if 'Paid' value is valid
        if(isNaN(paid) || paid < 0){
        	
        	$(this).find("#paid").addClass("error");
            $(":focus").blur();   /* unfocus this field */
                 
            // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
            error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> The <span class='fault_reason'>'Paid'</span>" +
        		" value is invalid!<br> <span style='margin-left: 20px;'>Please re-enter the value.</span><br><br></div>";
            event.preventDefault();
        }
        
         // if the 'From' field is not empty and the value is not 'no membership', then validate the date in 'From'
        if((membershipFrom !== "") && (membershipFrom !== "'Pay as You Go'")){
        	
            var date_field = $(this).find("#from");  // get the property of '#from' and assign to the variable (then you can add an 'error' class)
                                                     // in the case of input invalidation
            
            if(!isDate(membershipFrom.substring(0, 10))){  // call 'isDate' function to validate the date
            	
                date_field.val("");
                date_field.addClass("error");
                $(":focus").blur(); /* unfocus this field */
                
                // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
                error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> Invalid <span class='fault_reason'>'Membership From'</span> format: " +
                		"<span class='faulty_format'>'" + membershipFrom + "'</span>.<br> <span style='margin-left: 20px;'>Please re-enter.</span><br><br></div>";
                event.preventDefault();
            }
        }
        
        // if we got some issues in validation, then pop-up the 'error_window' and display error messages
        if(error_message.length !== 0){
        	
            $(".error_window").append(error_message + "<hr><img src='resources/images/error.jpg' alt='error' />");
            $(".error_background_overlay").fadeIn(200);
            $(".error_window").fadeIn(200);
        
        // if 'action' variable equals 'new_member', add new member to the database
        }else if(action.localeCompare("new_member") === 0){
        	
        	// assign variables before submission
        	programmeState = "active";
        	updateDescription = (getUpdateDescription(programme)).trim();
        	programmeBooked = 1;
        	var programmeId = $(".add_member_right_sidebar").find("#programme_id").val();
        	console.log("id: " + programmeId);
        	/* SUBMIT FORM VALIDATED OK, MAKE A JAVASCRIPT OBJECT, STRINGIGY AND SEND TO WEBSERVICE, 
             * INSERT DATA INTO DATABASE  */
        	var formData = new FormData($(this)[0]);
        	formData.set("programmeId", programmeId);
        	formData.set("programme", programme);
        	formData.set("membershipFrom", membershipFrom);
        	formData.set("membershipTo", membershipTo);
        	formData.set("toPay", toPay);
        	formData.set("programmeState", programmeState);
        	formData.set("updateDescription", updateDescription);
        	formData.set("programmeBooked", programmeBooked);
            
            $.ajax({
                type        : "POST",
                url         : "/Degree_Project/contr/addMember",
                data        :  formData,
                //contentType : "application/json; charset=utf-8",
                //dataType    : "json",
                processData : false,  // these has to be done in order upload image to work
                contentType : false,
                //cache       : false,
                //async       : false,
                success     : function (data, status, jqXHR) {
                    
                	// if the data for the new member has been added successfully, display successful message
            		// assign full name to variable (make first letters Block Capitals)	
                    var fullName = (data.firstName.substring(0, 1).toUpperCase()) + "" + (data.firstName.substring(1).toLowerCase()) +
                               " " + (data.lastName.substring(0, 1).toUpperCase()) + "" + (data.lastName.substring(1).toLowerCase());
            		
                    // display the picture of Member you successfully removed from the database
                    $(".popup_window #check_in_image").attr("src", $(".add_member_left_sidebar .image img").attr("src"));
                	 
                	// display successful message about Member you successfully removed from the database
                    $(".popup_window .messages").html("<div id='popup_window_text'><strong>" + fullName + "</strong><br>" +
         					               "profile has been successfully added to the database!</div>");
         			$(".popup_window").fadeIn().delay(3000).fadeOut(500);  
            		
         			/*==============================================*/
         			getTotalMembers();
                    // display all members if 'display_members.js' is open (new added profile also)
               	    // call function 'displayAllMembers' in 'loading_content.js' file
            		displayAllMembers();
            		// display 'Today's visits' count in the 'bottom panel'
            		todaysVisitsCount();
            		
         			setTimeout(function(){
                    	
                		
                        // display in 'recently joined member', 'last_attended' bottom-left blocks
                		// functions are in 'loading_content.js' file
                		displayLastAttended();
                		displayRecentlyBooked();
                		displayRecentlyJoined(); 
                		
                		
                    }, 7000);
                /*===================================================*/	
                },
                error: function (xhr) {
                    alert("Failed!" + xhr.responseText);
                }
            });
            
            
            $(".background_overlay, .add_member_content").fadeOut(1000);
            
            
        // update 'member_profile' and display updated details     
        }else if(action.localeCompare("update_member") === 0){
        	
        	// assign 'programme state'
        	programmeState = "active";
        	
        	// assign '1' if programme has been booked
        	// assign '0' if not
        	var programmeBooked = 0;  // initially '0'
        	var programmeId = $(".member_profile_right_sidebar").find("#programme_id").val();
        	
        	// assign 'update description' value, check what has been updated
        	if(firstName.localeCompare(memberProfile.firstName) !== 0 || lastName.localeCompare(memberProfile.lastName) !== 0){
        		
        		updateDescription += "The name has been changed.\n";
        		
        	}
        	if(address.localeCompare(memberProfile.address) !== 0){
        		
        		updateDescription += "The address has been changed.\n";
        		
        	}
        	if(phNumber.localeCompare(memberProfile.phNumber) !== 0){
        		
        		updateDescription += "The Phone number has been changed.\n";
        		
        	}
        	if(dateOfBirth.localeCompare(memberProfile.dateOfBirth) !== 0){
        		
        		updateDescription += "The Date of Birth has been changed.\n";
        		
        	}
        	if(email.localeCompare(memberProfile.email) !== 0){
        		
        		updateDescription += "The email has been changed.\n";
        		
        	}
        	if(membershipFrom.localeCompare(memberProfile.membershipFrom) !== 0 || membershipTo.localeCompare(memberProfile.membershipTo) !== 0){
        		
        		updateDescription += "The membership/programme has been updated.\n";
        		
        		programmeBooked = 1;  // yes, new programme has been booked
        	}
        	// if nothing has been changed, do not submit the form
        	//if(updateDescription.length === 0){
        		
        		//var message = "<div class='fault'><span style='color: red;'>&#9654;</span> Nothing has been changed in the Profile.<br>" +
        		//"<span style='margin-left: 20px;'>You don't have to submit the form.</span><br><br></div>";
        		
        		//$(".error_window").append(message + "<hr><img src='resources/images/error.jpg' alt='error' />");
                //$(".error_window").fadeIn(200);
        	//}
        	//else{
        		
        		/* SUBMIT FORM VALIDATED OK, MAKE A JAVASCRIPT OBJECT, STRINGIGY AND SEND TO WEBSERVICE, 
                 * INSERT DATA INTO DATABASE  */
            	var formData = new FormData($(this)[0]);
            	formData.set("programmeId", programmeId);
            	formData.set("programme", programme);
            	formData.set("membershipFrom", membershipFrom);
            	formData.set("membershipTo", membershipTo);
            	formData.set("toPay", toPay);
            	formData.set("programmeState", programmeState);
            	formData.set("updateDescription", updateDescription);
            	formData.set("programmeBooked", programmeBooked);
            	
            	$.ajax({
            		
            		type        : "POST",
                    url         : "/Degree_Project/contr/updateMember",
                    data        : formData,
                    //contentType : "application/json; charset=utf-8",
                    //dataType    : "json",
                    processData : false,  // these has to be done in order upload image to work
                    contentType : false,
                    //cache       : false,
                    async       : false,	
                    success     : function (data, status, jqXHR){
                    	
                    	// show member details in 'member_data' class
                        $(".member_profile_right_sidebar div").removeClass("member_data_update");
                        $(".member_profile_right_sidebar div").addClass("member_data");
                    	
                    	
                    	// hide 'bottom_update_panel' with 'cancel' and 'submit' buttons
                        $(".member_profile_right_sidebar #bottom_update_panel").hide(500);
                        
                        // do not show border and shadow on 'member_profile_right_sidebar'
                        $(".member_profile_right_sidebar").css({"border" : "none", "box-shadow" : "none"});
                        
                        // add attribute 'disabled' in 'input' and make it 'disabled' text
                        $(".member_data input").attr("disabled", "disabled");
                        
                        // enable 'Delete Profile' button when user clicks 'Cancel' button in update profile state
                        $(".member_profile_bottom_panel #delete_button").prop("disabled", false).css("opacity", 1);
                        
                        /*----- BUTTON UNDER PICTURE -----------*/
                        $(".member_profile_left_sidebar .shoot_button").hide(); // 'Take a Snapshot'
                        $(".member_profile_left_sidebar .photo_button").show(); // 'New Photo'
                        
                        // disable 'New Photo', 'Upload Picture' buttons
                        $(".member_profile_left_sidebar .photo_button, .member_profile_left_sidebar .upload_picture_button")
                                .prop("disabled", true).css("opacity", 0.4);
                        
                        // assign full name to variable
                        var fullName = data.firstName + " " + data.lastName;
                        
                        // show new member profile details after update submitted
                        //$(".member_profile_left_sidebar .image img").attr("src", "resources/images/membersImages/" + data.imagePath +"?" + parseInt(Math.random() * 1000000));
                        
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
                        
                        // change to appropriate font colors and size ('N / A', 'no membership', etc ('member_profile.js'))
                    	memberDataFont();
                    	
                    	// do not display 'drop-down' arrow in 'programme' field
                        $(".member_profile_right_sidebar #second_block #programme_drop_down_arrow").hide();
             
                    	 
                    	// display the picture of Member you successfully removed from the database
                        $(".popup_window #check_in_image").attr("src", $(".member_profile_left_sidebar .image img").attr("src"));
                    	 
                    	// display successful message about Member you successfully removed from the database
                        $(".popup_window .messages").html("<div id='popup_window_text'><strong>" + firstName + " " + lastName + "</strong><br>" +
             					               "profile has been successfully updated!</div>");
             			$(".popup_window").fadeIn().delay(3000).fadeOut(500);  
                    	 
                    	 
                    	 
                    	 // display all members if 'display_members.js' is open (updated profile also)
                    	 // call function 'displayAllMembers' in 'display_members.js' file
                    	 displayAllMembers();
                    	 
                    	 // display 'Last attended member','recently booked member',
                    	 // 'Recently joined' (bottom-left block)
                    	 // call functions in 'loading_content.js' file
                    	 displayLastAttended();
                    	 displayRecentlyBooked();
                    	 displayRecentlyJoined();
                    },
                    error : function (xhr) {
                    	
                        alert("Failed!" + JSON.stringify(xhr));
                    }
            	});
        	//}
        	
        	
        }
        
        // prevent the form from submitting via browser
        event.preventDefault();
    });
    
    
/*==========================================================================================================================*/
/*------------- 'DROP-DOWN' ARROW, FADEIN, FADEOUT 'programe type' SELECTION -----------------------------------------------*/
            $(".add_member_right_sidebar #programme_drop_down_arrow").click(function(){
            	
            	$(".add_member_right_sidebar #programme_type").animate({
            		
            		height : "toggle"
            	});
            });
            
/*------------ SELECT 'programme type' IN THE 'DROP-DOWN' MENU IN 'programme' FIELD ----------------------------------------*/
            $(".add_member_right_sidebar #programme_type div").click(function(){
            	
            	// get number of days depending on membership type
            	// use this number to calculate and show 'membership_to' in calendar format
            	var membershipDays = parseInt($("p", this).text());
            	
            	// get programme ID
            	var programmeId = $(this).find("label").text();
            	
            	// set text value selected from 'drop-down' menu
            	$(".add_member_right_sidebar #programme").val($("span", this).text());
            	
            	if(membershipDays === 0){ // 'Pay as You Go' Programme selected
            		
            		// get Todays date function in 'loading_content.js'
            		$(".add_member_right_sidebar #from").val(getTodaysDate());
            		$(".add_member_right_sidebar #to").val("present");
            	}
            	else{
            		
            		// calculate the programme length and display it in the fields 'From', 'To'
            		// in date format
            		var programmeLength = membershipProgrammeLength(membershipDays);
                	
            		// display todays date in 'membership_from' text field
            		$(".add_member_right_sidebar #from").val(programmeLength.programmeFrom);
            		
            		// display 'membership_to' date in the field
            		$(".add_member_right_sidebar #to").val(programmeLength.programmeTo);
            	}
            	// get values for the selected programme (discounts, full price, etc)
            	// function in 'programmes.js' file
            	var programmeDetails = getProgrammeDetails(programmeId);
            	// set to the fields
            	$(".add_member_right_sidebar #programme_id").val(programmeId);
            	$(".add_member_right_sidebar #price").val(programmeDetails.programmePrice);
            	$(".add_member_right_sidebar i").text(programmeDetails.programmeDiscountPercentage + "%");
            	$(".add_member_right_sidebar #paid").val(programmeDetails.finalPrice);
            	$(".add_member_right_sidebar #to_pay").val(programmeDetails.finalPrice);
            	
            	// set fonts size and colors in appropriate fields
            	setFonts(".add_member_data input");
            	
            	// hide 'drop-down' menu after selection made
            	$(".add_member_right_sidebar #programme_type").slideUp(300);
            });
        
    
/*------------ CLICK ON 'add_member' OR 'member_profile' WINDOW TO MAKE 'error_window' DISAPEAR --------------------*/
    $(".error_window, .add_member_content, .member_profile_content").click(function(){
    	
    	$(".error_window").fadeOut(200);
    });
    
/*------------ FUNCTION TO VALIDATE THE DATE IN THE FORM BEFORE SUBMIT ---------------------------------------------*/
    function isDate(date_string){
    	
        var current_value = date_string;
        
        // declare regex
        var date_pattern = /^(\d{1,2})(\-|-)(\d{1,2})(\-|-)(\d{4})$/;
        var date_array = current_value.match(date_pattern); /* check if date format is ok */
        
        if(date_array === null){
            return false;
        }
        // checks for dd-mm-yyyy format
        day = date_array[1];
        month = date_array[3];
        year = date_array[5];
        
        if(day < 1 || day > 31){
            return false;
        }else if(month < 1 || month > 12){
            return false;
        }else if((month === 4 || month === 6 || month === 9 || month === 11) && day === 31){
            return false;
        }else if(month === 2){
            var is_leap_year = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
            if(day > 29 || (day === 29 && !is_leap_year)){
                return false;
            }
        }
        return true;
    }
    
/*------------ FUNCTION TO VALIDATE EMAIL ADDRESS IN THE FORM BEFORE SUBMIT ------------------------------------------------------------*/
    function validateEmail(email){
    	
    	// declare regex
        var email_pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var validated = email.match(email_pattern);
        
        if(validated === null){
            return false;
        }
        return true;
    }


}); // end of JQUERY READY

/*------------ FUNCTIONS TO ASSIGN VALUES 'N / A', '0.00' IF THE FIELDS HAVE BEEN LEFT BLANK IN THE FORM --*/
function assignNA(value){
	
	if(value.length === 0){
		
		value = "N / A";
		
	}
	return value;
}

function assignZero(value){
	
	if(value.length === 0){
		
		value = "0.00";
	}
	return value;
}


/*-------- DISPLAY 'present' IN THE LEFT SIDEBAR IF 'Pay as You Go' -----------------------------------------------------*/
function fontLeftSidebar(value){
	
    if((value.localeCompare("present") === 0)){
		
		value = "<div class='no_membership_left_sidebar'>" + value + "</div>";  // css style in 'display_members.css' file
	}
    return value;
}



/*-------- DISPLAY IN THE LEFT SIDEBAR DAYS LEFT UNTIL THE END OF MEMBERSHIP --------------------------------------------*/
function fontDayLeftLeftSidebar(value, membershipTo){

	if(membershipTo.localeCompare("present") !== 0){
		
		if(value >= 5){
			
			value = "<div class='membership_available_left_sidebar'>(" + value + " days left)</div>"; // css style in 'display_members.css' file
		}
		else if(value < 5 && value > 1){
			
			value = "<div class='membership_ending_left_sidebar'>(" + value + " days left)</div>";    // css style in 'display_members.css' file
		}
		else if(value == 1){
			
			value = "<div class='membership_last_day_left_sidebar'>(" + value + " day left)</div>";   // css style in 'display_members.css' file
		}
		else if(value == 0){
			
			value = "<div class='membership_last_day_left_sidebar'>Last Day!</div>";                  // css style in 'display_members.css' file
		}else{
			
			value = "<div class='expired_membership_left_sidebar'>expired</div>";                     // css style in 'display_members.css' file
		}
	    return value;
	}
	else{
		
		return "";
	}

}

/*===========================================================================================================================*/
/*------ CHANGE FONT COLORS IN THE 'Programme' and DATES 'From', 'To' WHEN USER SELECTS PROGRAMME ---------------------------*/
function setFonts(selector){
	
	$(selector).each(function(){
		
		if($(this).attr("id").localeCompare("from") === 0 || $(this).attr("id").localeCompare("to") === 0){
			
			if($(this).val().localeCompare("present") === 0){
				
				$(this).css({"color" : "#004d00", "font-size" : "13px"});
			}
			else{
				
				$(this).css({"color" : "#001a00", "font-size" : "14px"});
			}
		}
		if($(this).attr("id").localeCompare("programme") === 0){
			
			$(this).css({"color" : "#00003D", "font-size" : "14px"});
		}
        if($(this).attr("id").localeCompare("to_pay") === 0){
			
			$(this).css({"color" : "#00003D", "font-size" : "15px"});
		}
        if($(this).attr("id").localeCompare("paid") === 0){
			
			$(this).css({"color" : "#001a00", "font-size" : "17px"});
		}
	});
}