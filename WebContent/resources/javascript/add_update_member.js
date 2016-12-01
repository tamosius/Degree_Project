
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


$(document).ready(function(){
	
	
/*---------- REMOVE CLASS 'error' IF CLICKED IN ON THE FIELD ('member_data' in 'member_profile_content' ----------*/
	$(".add_member_data :input, .member_data :input").click(function(){
		
		$(this).removeClass("error");
		$(this).removeClass("error_dates");
    });
	
/*----------- POP-UP WINDOW ('Add new Member' button) ------------------------------------------------------------*/
    $("body").delegate(".left_sidebar #add_member, .dashboard_top_left #add_button", "click", function(){
    	
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
    
/*----------- VALIDATE AND SUBMIT FORM ON 'Add new Member' and 'Update Member'----------------------------------- */
    $(".member_profile_panel form, .add_member_content form").submit(function(event){
    	
        var error_message = "";
        
        // get values from the 'form'
        var action = $(this).find("#action").val();                          // action to do ('new_member' of 'update_member')
        var id = $(this).find("#member_id").val();
        var firstName = ($(this).find("#first_name").val()).trim();
        var lastName = ($(this).find("#last_name").val()).trim();
        var address = (assignNA($(this).find("#address").val())).trim();              // assign 'N / A' if the field has been left blank in the form
        var phNumber = (assignNA($(this).find("#ph_number").val())).trim();           // assign 'N / A' if the field has been left blank in the form
        var dateOfBirth = (assignNA($(this).find("#date_of_birth").val())).trim();    // assign 'N / A' if the field has been left blank in the form
        var email = (assignNA($(this).find("#email").val())).trim();                  // assign 'N / A' if the field has been left blank in the form
        var membershipFrom = (assignNoMembership($(this).find("#from").val())).trim();// assign 'no membership' if the field has been left blank in the form
        var membershipTo = (assignNoMembership($(this).find("#to").val())).trim();    // assign 'no membership' if the field has been left blank in the form
        var programme = (assignPayAsYouGo($(this).find("#programme").val())).trim();  // assign 'Pay as You Go' if the field has been left blank in the form
        var paid = (assignZero($(this).find("#paid").val())).trim();                  // assign Zero if the field has been left blank in the form
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
        
         // if the 'From' field is not empty and the value is not 'no membership', then validate the date in 'From'
        if((membershipFrom !== "") && (membershipFrom !== "no membership")){
        	
            var date_field = $(this).find("#from");  // get the property of '#from' and assign to the variable (then you can add an 'error' class)
                                                     // in the case of input invalidation
            
            if(!isDate(membershipFrom.substring(0, 10))){  // call 'isDate' function to validate the date
            	
                date_field.val("");
                date_field.addClass("error");
                $(":focus").blur(); /* unfocus this field */
                
                // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
                error_message += "<div class='fault'><span styGggggggasle='color: red;'>&#9654;</span> Invalid <span class='fault_reason'>'Membership From'</span> format: " +
                		"<span class='faulty_format'>'" + membershipFrom + "'</span>.<br> <span style='margin-left: 20px;'>Please re-enter.</span><br><br></div>";
                event.preventDefault();
            }
        }
        
        // if the 'To' field is not empty and the value is not 'no membership', then validate the date in 'To'
        if((membershipTo !== "") && (membershipTo !== "no membership")){
        	
            var date_field = $(this).find("#to");  // get the property of '#to' and assign to the variable (then you can add an 'error' class)
                                                   // in the case of input invalidation
            
            if(!isDate(membershipTo.substring(0, 10))){   // call 'isDate' function to validate the date
            	
                date_field.val("");
                date_field.addClass("error");
                $(":focus").blur(); /* unfocus this field */
                
                // error classes 'fault', 'fault_reason', 'faulty_format' css styles are in 'body.css' file (at the bottom)
                error_message += "<div class='fault'><span style='color: red;'>&#9654;</span> Invalid <span class='fault_reason'>'Membership To'</span> format: " +
                		"<span class='faulty_format'>'" + membershipTo + "'</span>.<br> <span style='margin-left: 20px;'>Please re-enter.</span><br><br></div>";
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
        	
        	
        	/* SUBMIT FORM VALIDATED OK, MAKE A JAVASCRIPT OBJECT, STRINGIGY AND SEND TO WEBSERVICE, 
             * INSERT DATA INTO DATABASE  */
        	var formData = new FormData($(this)[0]);
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
            		
            		// display successfully added member name in the 'popup_window'
                    $(".popup_window").html("<img id='check_in_image' src='resources/images/loading1.jpg' />" +
        			                       "<div id='popup_window_text'><strong>" + fullName + "</strong><br>" +
        					               "has been successfully added to the database!</div>")
        					               .fadeIn().delay(3000).fadeOut(500);
            		
                    // display all members if 'display_members.js' is open (new added profile also)
               	    // call function 'displayAllMembers' in 'loading_content.js' file
            		displayAllMembers();
            		
                    // display in 'recently joined member', 'last_attended' bottom-left blocks
            		// functions are in 'loading_content.js' file
            		displayLastAttended();
            		displayRecentlyJoined(); 
            		
            		// display 'Today's visits' count in the 'bottom panel'
            		todaysVisitsCount();
                	
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
        	if(updateDescription.length === 0){
        		
        		var message = "<div class='fault'><span style='color: red;'>&#9654;</span> Nothing has been changed in the Profile.<br>" +
        		"<span style='margin-left: 20px;'>You don't have to submit the form.</span><br><br></div>";
        		
        		$(".error_window").append(message + "<hr><img src='resources/images/error.jpg' alt='error' />");
                $(".error_window").fadeIn(200);
        	}
        	else{
        		
        		//var formData = new FormData();
        		
        		//formData.append("imageFor", "members");  // indicate in what folder image to be saved ('membersImages', 'productsImages', etc)
            	//formData.append("image", $("input[type=file]")[1].files[0]); // 'input[type=file][1]' in 'member_profile_left_sidebar'
            	//ormData.append("id", id);
            	//formData.append("firstName", firstName);
            	//formData.append("lastName", lastName);
            	//formData.append("address", address);
            	//formData.append("phNumber", phNumber);
            	//formData.append("dateOfBirth", dateOfBirth);
            	//formData.append("email", email);
            	//formData.append("membershipFrom", membershipFrom);
            	//formData.append("membershipTo", membershipTo);
            	//formData.append("programme", programme);
            	//formData.append("paid", paid);
        		
        		/* SUBMIT FORM VALIDATED OK, MAKE A JAVASCRIPT OBJECT, STRINGIGY AND SEND TO WEBSERVICE, 
                 * INSERT DATA INTO DATABASE  */
            	var formData = new FormData($(this)[0]);
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
                    //async       : false,	
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
                        
                        // assign full name to variable
                        var fullName = data.firstName + " " + data.lastName;
                        
                        // show new member profile details after update submitted
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
                    	
                        // display successfully updated member name in the 'popup_window'
                    	 $(".popup_window").html("<img id='check_in_image' src='resources/images/loading1.jpg' />" +
    		                       "<div id='popup_window_text'><strong>" + fullName + "</strong><br>" +
    				               "profile has been successfully updated in the database!</div>")
    				               .fadeIn().delay(3000).fadeOut(500);
                    	 
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
        	}
        	
        	
        }
        
        // prevent the form from submitting via browser
        event.preventDefault();
    });
    
/*------------ CLICK ON 'add_member' OR 'member_profile' WINDOW TO MAKE 'error_window' DISAPEAR --------------------*/
    $(".error_window, .loading_content, .left_sidebar, .add_member_content, .member_profile_content").click(function(){
    	
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


});

/*------------ FUNCTIONS TO ASSIGN VALUES 'Pay as You Go', 'N / A' AND 'no membership' IF THE FIELDS HAVE BEEN LEFT BLANK IN THE FORM --*/
function assignPayAsYouGo(value){
	
	if(value.length === 0){
		
		value = "'Pay as You Go'";
	}
	return value;
}
function assignNA(value){
	
	if(value.length === 0){
		
		value = "N / A";
		
	}
	return value;
}
function assignNoMembership(value){
	
	if(value.length === 0){
		
		value = "no membership";
	}
	return value;
}
function assignZero(value){
	
	if(value.length === 0){
		
		value = "0.00";
	}
	return value;
}

/*--------- ADD CLASSES WITH COLORS FOR 'no membership', 'N / A', 'membership days left' (display_members.css)-----------*/
function addClass(value){
	
    if((value.localeCompare("no membership") === 0) || (value.localeCompare("N / A") === 0) || (value.localeCompare("'Pay as You Go'") === 0)){
		
		value = "<div class='no_membership'>" + value + "</div>";  // css style in 'display_members.css' file
	}
	else if(value == 0.00){
		
		value = "<div class='no_paid'>" + value + "</div>";        // css style in 'display_members.css' file
	}
	
	return value;	
}

/*-------- DISPLAY 'no membership' IN THE LEFT SIDEBAR ------------------------------------------------------------------*/
function addClassLeftSidebar(value){
	
    if((value.localeCompare("no membership") === 0) || (value.localeCompare("N / A") === 0)){
		
		value = "<div class='no_membership_left_sidebar'>" + value + "</div>";  // css style in 'display_members.css' file
	}
    return value;
}

/*-------- DISPLAY IN THE BIG TABLE DAYS LEFT UNTIL THE END OF MEMBERSHIP -----------------------------------------------*/
function addClassDaysLeft(value){
	
    if(value >= 5){
		
		value = "<div class='membership_available'>(" + value + " days left)</div>"; // css style in 'display_members.css' file
	}
	else if(value < 5 && value > 1){
		
		value = "<div class='membership_ending'>(" + value + " days left)</div>";    // css style in 'display_members.css' file
	}
	else if(value == 1){
		
		value = "<div class='membership_last_day'>(" + value + " day left)</div>";   // css style in 'display_members.css' file
	}
	else if(value == 0){
		
		value = "<div class='membership_last_day'>Last Day!</div>";                  // css style in 'display_members.css' file
	}else{
		
		value = "<div class='expired_membership'>expired</div>";                     // css style in 'display_members.css' file
	}
    return value;
}

/*-------- DISPLAY IN THE LEFT SIDEBAR DAYS LEFT UNTIL THE END OF MEMBERSHIP --------------------------------------------*/
function addClassDaysLeftLeftSidebar(value, membershipTo){

	if(membershipTo.localeCompare("no membership") !== 0){
		
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