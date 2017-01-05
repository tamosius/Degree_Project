/**
 * THIS FILE MAKES SEARCHES BY ID, NAME, ETC
 * FROM DIFFERENT PAGES FROM 'Search' FIELD IN THE TOP-RIGHT CORNER 
 * 
 */



/*-------- SEARCH MEMBERS BY NAME OR DISPLAY FULL LIST IF "" EMPTY STRING IS PASSED -------------------------------------------------------*/
function searchMembers(path, value){
	
	var retrievedData = "";
	
	$.ajax({
		
		type : "POST",
		url : serverPath + path, // 'serverPath' declared in 'global_variables.js'
		data : value,
		dataType : "json",
		processData : true,
		async       : false,
		success : function(data, status, e){
			
			retrievedData = data;
		},
		error : function(e){
			
			alert("Error! Failed to retrieve by Names");
		}
	});
	
	return retrievedData;
}

/*=========================================================================================================================================*/
/*-------- JQUERY READY -------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
/*---------***** MAKE SEARCHES FROM DIFFERENT PAGES IN THE PROGRAM *****-------------------------------------------------------------------*/
	
/*--------- SEARCH VALUED MEMBERS (spent on the membership plans and products -------------------------------------------------------------*/
	$(".top_panel").delegate("#totalMembers #search_text", "keyup", function(){
		
		var data = searchMembers("contr/getAllMembers", {idName : $(this).val()});
		
		// function in 'reports_big_table.js'
		// middle argument is the info displayed at the top
		// third argument is what type in switch statement to be executed, '10' = total members
		displayReportsBigTable(data, "Showing total number of members who has an account in the gym.", 10);  
		                                       
	});
	
/*--------- SEARCH VALUED MEMBERS (spent on the membership plans and products -------------------------------------------------------------*/
	$(".top_panel").delegate("#valuedMembers #search_text", "keyup", function(){
		
		var data = searchMembers("reportsController/getValuedMembersByIDName", {name : $(this).val()});
		
		// function in 'reports_big_table.js'
		// middle argument is the info displayed at the top
		// third argument is what type in switch statement to be executed, '9' = valuedMembers
		displayReportsBigTable(data, "Displaying valued Members by selected ID or name.", 9);  
		                                       
	});
	
/*--------- SEARCH MEMBERS BY PROGRAMME TYPE AND ID OR NAME -------------------------------------------------------------------------------*/
	$(".top_panel").delegate("#byProgrammeType #search_text", "keyup", function(){
		
		var data = searchMembers("bottomPanelReportsController/getProgrammeTypeMembers", {programmeType : programmeType,
			                                                                   name : $(this).val()});
		
		// function in 'reports_big_table.js'
		// middle argument is the info displayed at the top
		// third argument is what type in switch statement to be executed, '4' = by programme type ('1 Month Mbsh', etc.)
		displayReportsBigTable(data, "Displaying by programme type.", 4);  
		                                       
	});
	
/*--------- SEARCH MEMBERS WHO VISITED TODAY BY ID OR NAME --------------------------------------------------------------------------------*/
	$(".top_panel").delegate("#todayVisits #search_text", "keyup", function(){
		
		var data = searchMembers("bottomPanelReportsController/getTodaysVisitedMembers", {name : $(this).val()});
		
		// function in 'reports_big_table.js'
		// middle argument is the info displayed at the top
		// third argument is what type in switch statement to be executed, '3' = today's visitors
		displayReportsBigTable(data, "Displaying Today's <span>( " + getTodaysDate() + " )</span> visits.", 3);  
		                                       
	});
	
/*---------- GET VISITED MEMBERS BY THE SPECIFIED PERIOD OF WEEKS (1 Week, 2 Weeks, 4 Weeks, etc..) --------------------------------------*/
	$(".top_panel").delegate("#bySpecifiedWeeks #search_text", "keyup", function(){
		
		var data = searchMembers("bottomPanelReportsController/getVisitedMembersBySpecifiedWeeks", {startDate : numberOfWeeks,
			                                                                                        name : $(this).val()});
		
		// function in 'reports_big_table.js'
		// middle argument is the info displayed at the top
		// third argument is what type in switch statement to be executed, '7' = get visited members
		displayReportsBigTable(data, "Displaying all visitors of the last " + numberOfWeeks + " days:" +
				" <span>( " + subtractDate(numberOfWeeks) + " - " + getTodaysDate() + " )</span>.", 7);  // 'numberOfWeeks' is global variable
		                                       
	});
	
/*--------- SEARCH MEMBER BY NAME, BY TYPING IN 'search_text' BOX (top-right) -------------------------------------------------------------*/
	/*$("#search_text").keyup(function(){
		
		var name = $("#search_text").val();
		
		if(name.length !== 0){  // if the search field is not empty, get member details by name

			$.ajax({
				
				type: "POST",
				url: "/Degree_Project/contr/searchMember",
				data: name,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				processData: true,
				success: function(data, status, jqXHR){
					
					if(data.length !== 0){  // if the result data is not empty, display member(s) in the table
						
	                    appendDetails(data); // call function 'appendDetails' to display searched members
						
					}else { // the result returned from the database is empty
						
	                    $("table.body_table").empty(); // get the table empty
						
						//$("table.body_table").html("<h2 style='text-align:center'>No results found for<br>'" + value + "'</h2>").nextAll(".row_data").remove();
						$(".size .body_table").append("<div class='no_results'>No results found for:</div>" +
								"<div class='no_results_for_name'>" + name + "</div>");
						
					}
				},
				error: function(xhr){
					//console.log("ERROR: ", xhr);
					alert("Error: " + JSON.stringify(xhr));
					display(xhr);
				},
				done: function(e){
					
				}
			}); // end of 'ajax' function
			
		}else{ // if the search field is empty, return whole members list from the database
			
			$.get("/Degree_Project/contr/getAllMembers", function(data){
				
				appendDetails(data); // call function 'appendDetails' and pass 'data' as argument
			});
		}
	}); // end of 'keyup' function*/
	
/*-------------- FUNCTION TO APPEND MEMBER DETAILS RETURNED TO THE TABLE ------------------------------------------------------------------*/
	function appendDetails(data){
		
		$("table.body_table").empty(); // get the table empty
        
		// iterate through the result array returned
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
	} // end of function 'appendDetails'
});