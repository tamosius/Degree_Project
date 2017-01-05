
// communication type button selected ('Show Messages', 'Leave Admin Message', 'Email Members', etc.)
var communicationSelect = "";

// paths to web services to retrieve appropriate data from the database
var communicationsServices = {
		
		showMessages : [
		          {
		        	  tableHeader : "<tr><td>Select All</td><td>Name</td><td>Something</td></tr>",
		        	  uri         : ""
		          }
		],
		
		leaveMessage : [
		          {
		        	  tableHeader : "",
		        	  uri         : ""
		          }
		],
		
		emailMembers : [
		          {
		        	  tableHeader : "<tr><td>Select All</td><td>Name</td><td>Email</td></tr>",
		        	  uri         : "/Degree_Project/communications/emailMembers"
		          }
		]
}

/*------ STORE THE NEW MESSAGE INTO THE DATABASE LEFT BY ADMIN (readable by other admins only) -------------------------------*/
function addAdminMessage(path, messageTo, message, messageFrom){ // 'adminId' is to whom the message is intended
	                                                           // 'messageFrom' is who left a message
	$.ajax({
		
		type : "POST",
		url : path,
		data : {messageTo : messageTo, // 'messageTo' (id)
			    message : message,
			    messageFrom : messageFrom}, // 'messageFrom (id)
		dataType : "json",
		processData : true,
		async       : false,
		success : function(data, status, e){
			
			
		},
		error : function(e){
			
			alert("Error! Failed to add new Admin message!");
		}
	});
}

/*------ DISPLAY RETRIEVED ADMINS IN 'Communications' 'Leave Admin Message' TABLE --------------------------------------------*/
function displayAllAdmin(admins){
	
	$("#leave_message_block #communications_table_body").empty(); // get the table empty
	
	if(admins.length === 0){
		                                                          // 'no_results' css in 'display_members.css'
		$("#leave_message_block #communications_table_body").html("<div class='no_results'>No Results...</div>");
        
		return;
	}
	
	// iterate through the result array returned
	$.each(admins, function(key, value){
		
		// do not display current admin user in the 'Leave Admin Message' table
		if(parseInt(value.id) !== parseInt($("#admin_user_session #admin_id").val())){
			
			$("#leave_message_block #communications_table_body").append(
					
					 "<tr class='admin_data'>" +
		                 "<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
		                 "<td id='first_column'><input type='checkbox' class='row_checkbox' value='" + value.id + "'></td>" +
		                 "<td id='second_column'>" +value.firstName + " " + value.lastName + "</td>" +
		                 "<td id='third_column' style='position: relative;'>" + value.joinedOn.substring(0, 10) + "" +
								  "<div class='time_popup'>at <span>" + value.joinedOn.substring(11, 19) + "</span></div></td>" + // pop-up time in 'reports_big_table.css'
		             "</tr>");    
		}                                                    
	});
}

/*------ DISPLAY RETRIEVED MEMBERS IN 'Communications' 'Email Members' TABLE -------------------------------------------------*/
function displayEmailMembers(members){
	
	$("#email_members_block #communications_table_body").empty(); // get the table empty
	
	if(members.length === 0){
		                                                          // 'no_results' css in 'display_members.css'
		$("#email_members_block #communications_table_body").html("<div class='no_results'>No Results...</div>");
        
		return;
	}
	
	// iterate through the result array returned
	$.each(members, function(key, value){
		
		$("#email_members_block #communications_table_body").append(
				
			 "<tr class='row_data'>" +
                 "<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
                 "<td id='first_column'><input type='checkbox' class='row_checkbox' value='" + value.email + "'><input type='hidden' value='" + value.firstName + "' /></td>" +
                 "<td id='second_column'>" +value.firstName + " " + value.lastName + "</td>" +
                 "<td id='third_column'>" + addClass(value.email) + "</td>" + // 'addClass' function in 'add_update_member.js'
             "</tr>");                                                        // 'addClass' add style 'display_members.css' file
	});
}


/*===================================================================================================================*/
/*-------- JQUERY 'ready' -------------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
/*-------- DISPLAY CURRENT ADMIN USER NAME IN 'communications.jsp' --------------------------------------------------*/
	
	// display admin name in the page ('left_communications_block')
	$("#left_communications_block #admin_user_name").text($("#admin_user_session #admin_firstName").val() +
			" " + $("#admin_user_session #admin_lastName").val());
	
/*-------- SELECT COMMUNICATIONS IN THE 'left_communications_block' (Show Messages, Leave a Message, Email All Members, etc.) -------------------------------------*/
	$(".communications_content").delegate("#left_communications_block div", "click", function(){
		
		// get communication type selected, 1 = Show Messages, 2 = Leave a Message, 3 = Email Members
		communicationSelect = parseInt($(this).find(":input").val());
		
		$("#left_communications_block div").removeClass("highlighted_settings_row");
		
		$(this).addClass("highlighted_settings_row");
		
		
		// show 'show_messages_block'
		if(communicationSelect === 1){
			
			// hide 'leave_message_block', 'email_members_block', etc.
			$("#leave_message_block, #email_members_block").hide();
			
            $("#show_messages_block").slideDown(250);
			
            
        // show 'leave_message_block'    
		}else if(communicationSelect === 2){
			
			// hide 'show_messages_block', 'email_members_block', etc.
			$("#show_messages_block, #email_members_block").hide();
			
			// call function 'searchDisplayMembers' in 'search_member.js' to retrieve members from the database
			// empty "" String is passed to retrieve full list
			var retrievedAdmins = searchMembers("admin/getAllAdmin", {name : ""});
			
			//display retrieved ADMINS in the table in 'communications.jsp' page
			displayAllAdmin(retrievedAdmins);
			
			$("#leave_message_block").slideDown(250);
			
			
		// show 'email_members_block'
		}else if(communicationSelect === 3){
			
			// hide 'show_messages_block', 'leave_message_block', etc.
			$("#show_messages_block, #leave_message_block").hide();
			
			// call function 'searchDisplayMembers' in 'search_member.js' to retrieve members from the database
			// empty "" String is passed to retrieve full list
			var retrievedMembers = searchMembers("communications/getEmailMembers", {name : ""});
			
			//display retrieved members in the table in 'communications.jsp' page
			displayEmailMembers(retrievedMembers);
			
			$("#email_members_block").slideDown(250);
			
		}
	});
	
/*--------- CHECK ALL CHECKBOXES WHEN TOP CHECKBOX IS CLICKED ------------------------------------------------------------*/
	$("#leave_message_block, #email_members_block").delegate("#checkboxes_check_all", "click", function(){
		
		$("#communications_table_body .row_checkbox").prop("checked", $(this).prop("checked"));
	});
	
/*-------- RETRIEVE MEMBERS BY TYPING IN THE 'search' FIELD IN THE TOP PANEL ---------------------------------------------*/
	$(".top_panel :input").keyup(function(){
		
		var name = $(this).val();
		
		if(communicationSelect === 1){
			
			
		}else if(communicationSelect === 2){
			
			
		}else if(communicationSelect === 3){
			
			// call function 'searchDisplayMembers' in 'search_member.js' to retrieve members from the database
			// if empty "" String is passed to retrieve full list
			var retrievedMembers = searchMembers("communications/getEmailMembers", {name : name});
			
			//display retrieved members in the table in 'communications.jsp' page
			displayEmailMembers(retrievedMembers);
		}
	});
	
/*-------- LEAVE A MESSAGE FOR OTHER ADMINS, ('Leave Message' button) SAVE IN THE DATABASE -------------------------------*/
	$("#right_communications_block").delegate("#leave_message_block #leave_message_button", "click", function(){
		
		// get the message from the textarea from admin
		var message = $("#leave_message_block #leave_admin_message_block textarea").val();
		
		// display the picture of Member you successfully removed from the database
        $(".popup_window #check_in_image").attr("src", "resources/images/green_accept.jpg");
    	 
    	// display successful message about Member you successfully removed from the database
        $(".popup_window .messages").html("<div id='popup_window_text'><strong></strong><br>" +
					               "Successfully sent the message!</div>");
			$(".popup_window").fadeIn().delay(3000).fadeOut(500);  
		
		if(message.length === 0){
			
			return;
		}
		
		// iterate through all Admins and select by check boxes ticked
		$("#communications_table_body .admin_data input:checkbox").each(function(){
			
			if($(this).prop("checked")){
				                // path, messageTo (id), message, messageFrom (id)
				//addAdminMessage("/Degree_Project/admin/addAdminMessage", $(this).val(),
						//message, $("#admin_user_session #admin_id").val());
			}
		});
	});
	
/*-------- OPEN NEW WINDOW AND COMPOSE A NEW EMAIL ('Compose Email' button) ----------------------------------------------*/
	$("#right_communications_block").delegate("#compose_email_button", "click", function(){
		
		$(".send_email_window #recipients select").empty();
		
		// iterate through all check boxes and append to 'recipients' drop-down only selected
		$("#communications_table_body .row_data input").each(function(){
			
			if($(this).prop("checked") && ($(this).val().localeCompare("N / A")) !== 0){
				                                                                                       // value='" + $(this).next().val() + "'
				// append only selected email addresses excluding 'N / A' field values
				$(".send_email_window #recipients select").append("<option selected >" + $(this).val() + "</option>");
			}
			
		});
		
		$(".background_overlay, .send_email_window").slideDown(250);
	});
	
/*-------- HIDE COMPOSE EMAIL WINDOW WHEN 'Send Email' OR 'Cancel Email' IS CLICKED ---------------------------------------*/
	$(".send_email_window #cancel_email_button, .send_email_window #send_email_button").click(function(){
		
		$(".background_overlay, .send_email_window").slideUp(250);
	});
});