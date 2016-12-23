
$(document).ready(function(){
/*--------------------- DELETE MEMBER PROFILE ------------------------------------------------------------------------------------------------ */    
    $("#delete_button").click(function(){
        
    	// set the value in '.confirm_window #trigger_submit' (index.jsp) for '#add_new_product_block form' to be clicked
		// if confirmation 'Yes' selected to remove the product from the database
		$(".confirm_window #trigger_submit").val(".member_profile_bottom_panel #confirm_delete_button");
    	
    	// clear 'delete_member_confirm_window' before showing new confirmation
        $(".confirm_window #confirm_message").empty();
        
        // show up the 'delete_member_confirm_window' and background overlay also
        $(".confirm_window_background_overlay, .confirm_window").fadeIn(200);
        
        var firstName = $(this).parent().parent().find("#first_name").val();
        var lastName = $(this).parent().parent().find("#last_name").val();
        
        // display the picture of Member you intend to remove
		$(".confirm_window .top_image").attr("src", $(this).parent().parent().find(".image img").attr("src"));
        
        $(".confirm_window #confirm_message").
                html("<div> - Are you sure want to delete <strong style=\'font-size: 22px;\'>'" + 
        		firstName + " " + lastName + "'</strong> profile?</div>");
        
    });
    

    /*------------------- CONFIRM DELETE MEMBER PROFILE, 'Yes' BUTTON -------------------------------------------------------------------------------------- */
        $(".member_profile_bottom_panel #confirm_delete_button").click(function(){
            
        	// display the picture of Member you successfully removed from the database
        	$(".popup_window #check_in_image").attr("src", $(this).parent().parent().find(".image img").attr("src"));
        	
            var id = $(this).parent().parent().find("#member_id").val();
            var firstName = $(this).parent().parent().find("#first_name").val();
            var lastName = $(this).parent().parent().find("#last_name").val();
            
            $.ajax({
            	
            	type         : "POST",
            	url          : "/Degree_Project/contr/deleteMember",
            	data         : {id : id},
            	dataType     : "text",
            	proccessData : true,
            	success      : function(data, status, event){
            		
            		// fade out the overlays, 'member_profile_panel' and 'delete_member_confirm_window'
                    $(".background_overlay, .member_profile_panel, .confirm_window_background_overlay, .confirm_window")
                          .fadeOut();
            		
            		// display successful message about Member you successfully removed from the database
                    $(".popup_window .messages").html("<div id='popup_window_text'><strong>" + firstName + " " + lastName + "</strong><br>" +
        					               "profile has been successfully deleted from the database!</div>");
        			$(".popup_window").fadeIn().delay(3000).fadeOut(500);    
            		
            		// display 'Total Members' in the top-left corner
            		getTotalMembers();
            		// display all members
            		displayAllMembers();
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
        });
});
