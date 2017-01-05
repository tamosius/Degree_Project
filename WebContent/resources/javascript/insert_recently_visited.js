

// 'check-in' the member, store the time in the database
function checkIn(memberId, name, imagePath, toPay){

	$.ajax({
		// 'clone()' clone the element
		type        : "POST",
		url         : "/Degree_Project/contr/insertRecentlyVisited",
		data        : {memberId : memberId,
			           toPay    : toPay},
		dataType    : "text",
		processType : true,
		success     : function(data, status, e) {
			
			// new entry were inserted in the database
			// show successful message
			if(parseInt(data) > 0){
				
				// fade out the window
				$(".check_in_window, .background_overlay").fadeOut(250);
				
				var date = new Date();
				var time = addZero(date.getHours()) + ":"
						+ addZero(date.getMinutes()) + ":"
						+ addZero(date.getSeconds()); // get current time

				// display 'Today's visits' count in the 'bottom panel'
				$(".bottom_panel #num_visits").html(data);

				// show 'last attended member' in the bottom-left block
				// call function in 'loading_content.js' file
				displayLastAttended();
				
				// display the picture of Member who checked-in
	            $(".popup_window #check_in_image").attr("src", "resources/images/membersImages/" + imagePath + "");
	        	 
	        	// display message about Member who checked-in
	            $(".popup_window .messages").html("<div id='popup_window_text'><strong>" + name + "</strong><br><br>" +
	 					               "just cheked-in, at time: <strong>" + time + "</strong></div>");
	 			$(".popup_window").fadeIn().delay(3000).fadeOut(500);  
	 			
			}else{  // the  members was already checked-in today, so entry discarded
				
				// display the picture of Member who checked-in
	            $(".popup_window #check_in_image").attr("src", "resources/images/error.jpg");
	        	 
	        	// display message about Member who checked-in
	            $(".popup_window .messages").html("<div id='popup_window_text'><strong>" + name + "</strong><br><br>" +
	 					               "Already checked-in today! This entry could not be processed!</div>");
	 			$(".popup_window").fadeIn().delay(5000).fadeOut(500);
			}
			

		},
		error : function(e) {

			alert("Failed to check-in!" + JSON.stringify(e));
		}
	});
	
}

/*-------------- FUNCTION TO ADD ZERO(0) IF THE 'HOURS' OR 'MINUTES' OR 'SECONDS' LESS THAN 10 --------------------------------------------*/
function addZero(i){
	
	if(i < 10){
		
		i = "0" + i;
	}
	return i;
}


/* ================================================================================================================================== */
/*--------- JQUERY READY -----------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
	
/*-------- SEARCH MEMBER BY ID OR NAME ---------------------------------------------------------------------------------------------*/
    $(".check_in_window .search_customer").keyup(function(){
		
		// get ID or name for searched customer
		var idOrName = $(this).val();
		
		// call function in 'search_member.js' to get result
		var customers = searchMembers("contr/searchMember", {name : idOrName});
		
		// get table empty before append new data
		$(".check_in_window .table_body table").empty();
		
		if(customers.length === 0){
			
			$(".check_in_window .table_body table").html("<div class='no_results'>No Results...</div>");
			                                                                       // 'no_results' css in 'display_members.css'
			return;
		}
		
		// display result in '.window .table_body' table (index.jsp)
		$.each(customers, function(key, value){
			
			$(".check_in_window .table_body table").append(
					
					"<tr>" +
					   "<input type='hidden' id='imagePath' value='" + value.imagePath + "'/>" +
					   "<td class='first'>" + value.id + "</td>" +
					   "<td class='second'>" + value.firstName + " " + value.lastName + "</td>" +
					   "<td class='third'>" + value.programme + "</td>" +
					   "<td class='fourth'><span>" + value.finalPrice + "</span></td>" +
					"</tr>"                         // 'finalPrice' is how much the programme cost now
			); // end of 'append'                   // retrieved from 'programmes_prices' table
		}); // end of 'each'                        // <p>" + (value.programmeDiscountPercentage != 0 ? "(" + value.programmeDiscountPercentage + "%)" : "") + "</p>
	});
	
/*----------- DISPLAY THE PICTURE ON 'mouseover' ON THE ROW -----------------------------------------*/
	$(".check_in_window").delegate(".table_body table  tr", "mouseover", function(){
		
		// get member id and the image path to display
		var memberId = $(this).find(".first").text();
		var imagePath = $(this).find("#imagePath").val();
		
		// display picture when mouse over the member row
		$(".check_in_window .image img").attr("src", "resources/images/membersImages/" + imagePath + "");
	});
	
	
/*----------- CLICK ON THE ROW WITH THE MEMBER TO BE CHECKED-IN --------------------------------------*/
    $(".check_in_window").delegate(".table_body table  tr", "click", function(){
		
    	// get member id, full name and the image path to display
		var memberId = $(this).find(".first").text();
		var fullName = $(this).find(".second").text();
		var imagePath = $(this).find("#imagePath").val();
		var toPay = $(this).find(".fourth span").text();
		
		// check-in member, function at the top file
		checkIn(memberId, fullName, imagePath, toPay);
	});
    
/*----------- FADE OUT POPUP WINDOW, 'Back' BUTTON IS CLICKED ----------------------------------------*/
    $(".check_in_window .bottom_panel .back_button").click(function(){
    	
    	$(".check_in_window, .background_overlay").fadeOut(250);
    });
	
	
	
/*------------ LEFT SIDEBAR, 'Check-in' BUTTON --------------------------------------------------------*/
	$(".left_sidebar #check_in").click(function(){
		
		// get table empty before append new data
		$(".check_in_window .table_body table").empty();
		
		// set image to 'no_photo.jpg'
		$(".check_in_window .image img").attr("src", "resources/images/membersImages/no_photo.jpg");
		
		// set search text-field empty
		$(".check_in_window .top_panel .search_customer").val("");
		
		$(".check_in_window, .background_overlay").fadeIn(250);
		
		// focus text field 'search customer'
		$(".check_in_window .top_panel .search_customer").focus();
	});
	

});