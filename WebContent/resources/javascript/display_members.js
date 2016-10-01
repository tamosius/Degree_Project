
/*------------ DISPLAY ALL MEMBERS ------------------------------------------------------------------------------*/
function displayAllMembers(){
	
    $.get("/Degree_Project/contr/getAllMembers", function(data){
		
		// display total members in top-left corner of the window
		$(".top_panel .total_members_count").text("Total Members: " + data.length);
		
		// before appending data to table, make previous data empty
		$("table.body_table").empty(); 
		
		// display whole list of members in the table 'display_members.jsp'
		$.each(data, function(key, value){
			
			$(".size .body_table").append(
					
					"<tr class='row_data'>" +
	                 "<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
	                 "<td class='first_name_data'><span id='check_in'>Check-in</span>" + value.firstName + "</td>" +
	                 "<td class='last_name_data'>" + value.lastName + "</td>" +
	                 "<td class='from_data'>" + addClass(value.membershipFrom) + "</td>" +  // 'addClass' function
	                 "<td class='to_data'>" + addClass(value.membershipTo) + "</td>" +      // in 'add_update_member.js' file
	                 "<td class='paid_data'>" + addClass(value.paid.toFixed(2)) + "</td>" +  
	             "</tr>"); 
		});
	});
}

$(document).ready(function(){

/*------------ CALL 'displayAllMembers' FUNCTION (at the top of the file) ---------------------------------------*/
	displayAllMembers();
	
	
/*------------ DISPLAY MEMBERS FROM VARIABLE STORED IN 'local storage' -------------------------------------------*/
	// Check browser support
	/*if (typeof(Storage) !== "undefined") {
		
		// retrieve data from 'local storage' and convert to JSON format
		var members = JSON.parse(localStorage.getItem("membersList"));
		
		// iterate whole data and display in 'display_members.jsp' table
        $.each(members, function(key, value){
        	
        	$(".size .body_table").append(
        			
				"<tr class='row_data'>" +
	                 "<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
	                 "<td class='first_name_data'><span id='check_in'>Check-in</span>" + value.firstName + "</td>" +
	                 "<td class='last_name_data'>" + value.lastName + "</td>" +
	                 "<td class='from_data'>mhip_from</td>" +
	                 "<td class='to_data'>mship_to</td>" +
	                 "<td class='paid_data'>paid</td>" +
	             "</tr>"); 
		});
	} else {
		
		$.get("/Degree_Project/contr/getList", function(data){
			
			$(".size .body_table").append(
					
					"<tr class='row_data'>" +
	                 "<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
	                 "<td class='first_name_data'><span id='check_in'>Check-in</span>" + value.firstName + "</td>" +
	                 "<td class='last_name_data'>" + value.lastName + "</td>" +
	                 "<td class='from_data'>mhip_from</td>" +
	                 "<td class='to_data'>mship_to</td>" +
	                 "<td class='paid_data'>paid</td>" +
	             "</tr>"); 
		});
	    
	}*/
});