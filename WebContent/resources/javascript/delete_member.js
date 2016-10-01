
$(document).ready(function(){
/*--------------------- DELETE MEMBER PROFILE ------------------------------------------------------------------------------------------------ */    
    $("#delete_button").click(function(){
        
    	// clear 'delete_member_confirm_window' before showing new confirmation
        $(".confirm_window #confirm_message").empty();
        
        // show up the 'delete_member_confirm_window' and background overlay also
        $(".confirm_window_background_overlay, .confirm_window").fadeIn(200);
        
        var firstName = $(".member_data #first_name").val();
        var lastName = $(".member_data #last_name").val();
        
        $(".confirm_window #confirm_message").
                html("<div> - Are you sure want to delete <strong style=\'font-size: 22px;\'>'" + 
        		firstName + " " + lastName + "'</strong> profile?</div>");
        
    });


/*------------------- CONFIRM DELETE MEMBER PROFILE, 'Yes' BUTTON -------------------------------------------------------------------------------------- */
    $(".confirm_window #confirm_button").click(function(){
        
        var id = $(".member_profile_right_sidebar #member_id").val();
        var firstName = $(".member_data #first_name").val();
        var lastName = $(".member_data #last_name").val();
        var message = "profile has been successfully deleted!";
        
        $.ajax({
        	
        	type         : "POST",
        	url          : "/Degree_Project/contr/deleteMember",
        	data         : {id : id},
        	dataType     : "json",
        	proccessData : true,
        	success      : function(data, status, event){
        		
        		// show total members count in the 'top_panel'
        		$(".top_panel .total_members_count").text("Total Members: " + data.length);
        		
        		// set the table empty before displaying whole list of members
        		$("table.body_table").empty(); 
        		
        		// display whole list of members in the table 'display_members.jsp'
        		$.each(data, function(key, value){
        			
        			$(".size .body_table").append(
        					
        					"<tr class='row_data'>" +
        	                 "<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
        	                 "<td class='first_name_data'><span id='check_in'>Check-in</span>" + value.firstName + "</td>" +
        	                 "<td class='last_name_data'>" + value.lastName + "</td>" +
        	                 "<td class='from_data'>" + addClass(value.membershipFrom) + "</td>" +
        	                 "<td class='to_data'>" + addClass(value.membershipTo) + "</td>" +
        	                 "<td class='paid_data'>" + addClass(value.paid.toFixed(2)) + "</td>" +
        	             "</tr>"); 
        		});
        		
        		// call the functions in 'loading_content.js' file
        		// to display 'last attended', 'recently booked' and 'recently joined' members
        		displayLastAttended();	
        		displayRecentlyBooked();
        		displayRecentlyJoined();
        		// display 'Today's visits' count in the 'bottom panel'
        		todaysVisitsCount();
        	},
        	error : function(event){
        		
        		alert("Ooopss: " + event.responseText);
        	}
        });
        
        // fade out the overlays, 'member_profile_panel' and 'delete_member_confirm_window'
        $(".background_overlay, .member_profile_panel, .confirm_window_background_overlay, .confirm_window")
              .fadeOut();
        
        // show 'popup_window' with successful confirmation message
        $('.popup_window').html("<p><strong>\'" + firstName + " " + lastName + "\'</strong> " + message 
                + "</p><hr><img id='successfull_add_update_image' src='images/green_accept.jpg' alt='photo' />");
        $('.popup_window').delay(1000).fadeIn().delay(3000).fadeOut(500);
    });
    
/*------------------- CANCEL DELETE MEMBER PROFILE, 'No' BUTTON -------------------------------------------------------------------------------------- */
    $(".confirm_window #cancel_button").click(function(){
    	
        $(".confirm_window_background_overlay, .confirm_window").animate({
        	
        	height: "toggle"
        });
    });
});
