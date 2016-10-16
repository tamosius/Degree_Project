
/*-------- SEARCH MEMBERS BY NAME OR DISPLAY FULL LIST IF "" EMPTY STRING IS PASSED -------------------------------------------------------*/
function searchDisplayMembers(requestType, path, name){
	
	var retrievedData = "";
	
	$.ajax({
		
		type : requestType,
		url : path,
		data : {name : name},
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


$(document).ready(function(){
	
/*--------- SEARCH MEMBER BY NAME, BY TYPING IN 'search_text' BOX (top-right) -------------------------------------------------------------*/
	$("#search_text").keyup(function(){
		
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
	}); // end of 'keyup' function
	
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