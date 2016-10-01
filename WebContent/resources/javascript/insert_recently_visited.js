/*
*THIS FILE FOR INSERT GYM VISITED MEMBERS (click on 'check in')
*/

$(document).ready(function(){
	
	$("body").delegate(".row_data #check_in", "click", function(){
		
		var memberId = $(this).closest(".row_data").find("#member_id").val();
		var fullName = $(this).closest(".row_data").find(".first_name_data").clone().children().remove().end().text() + " " + $(this).closest(".row_data").find(".last_name_data").text();
		
		$.ajax({
			                                                                                // 'clone()' clone the element
			type        : "POST",                                                           // 'children()' select all the children 
			url         : "/Degree_Project/contr/insertRecentlyVisited",                    // 'remove()' remove all the children
			data        : {memberId : memberId},                                            // 'end()' again go back to selected element
			dataType    : "text",
			processType : true,
			success     : function(data, status, e){
				
				var date = new Date();
				var time = addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());  // get current time
				
				// display 'Today's visits' count in the 'bottom panel'
				$(".bottom_panel #num_visits").html(data);
				
				// show 'last attended member' in the bottom-left block
				// call function in 'loading_content.js' file
				displayLastAttended();
				
				$(".popup_window").html("<img id='check_in_image' src='resources/images/loading1.jpg' />" +
						        "<div id='popup_window_text'><strong>" + fullName + "</strong><br>" +
								"just cheked-in, at time: <strong>" + time + "</strong></div>")
								.fadeIn().delay(3000).fadeOut(500);
				
			},
			error: function(e){
				
				alert("Uppss" + JSON.stringify(e));
				
			}
		});
	});
	
/*-------------- FUNCTION TO ADD ZERO(0) IF THE 'HOURS' OR 'MINUTES' OR 'SECONDS' LESS THAN 10 --------------------------------------------*/
	function addZero(i){
		
		if(i < 10){
			
			i = "0" + i;
		}
		return i;
	}
});