
// popup the table with the visited dates, times by selected member
function displayMemberVisitedDatesTimes(memberId, firstName, lastName){
	
	// fetch data from the data base, call RESTful API
	$.ajax({
		
		type        : "POST",
		url         : "/Degree_Project/reportsController/getMemberVisitedDatesTimes",
		data        : {id : memberId},
		dataType    : "json",
		processData : true,
		success     : function(data, status, e){
			
			// clear the previous loaded table data
			$(".popup_visits_body table").empty();
			
			// display the name of selected member (top table)
			$(".popup_visits_header #visitor_name").
			     html("<span>" + firstName + "</span>'s <span>" + lastName + "</span>'s visits." +
			     		" Total: <span>" + data.length + "</span>"); // 'span' css in 'body.css' file
			
			// append data to the table, fetched from the database
			$.each(data, function(key, value){
				
				$(".popup_visits_body table").append(
						"<tr>" +
						"<td id='visited_date_body'>" + value.visitedTimestamp.substring(0, 10) + "</td>" +
						"<td id='visited_time_body'>" + value.visitedTimestamp.substring(11, 19) + "</td>" +
						"<td id='week_day_body'>" + value.weekDay + "</td>" +
						"</tr>");
				
			});
			
			// popup 'backround_overlay' and table with the data
			// '.background_overlay_visits' and '.popup_visits' in 'index.jsp' and 'body.css', 'visits_popup.js'
			$(".background_overlay_visits, .popup_visits").animate({
				
				height: "toggle"
			});
		},
		error        : function(e){
			
			alert("Error from 'getVisitedDatesTimes' " + e);
		}
	});
}


$(document).ready(function(){
	
	// popup the table with the visited dates, times by selected member
	$("body").delegate("#reports_big_table_body_block #reports_big_table_body_table #visits," +
			".report_table_body .report_column5", "click", function(){
		
		// find member's ID, First Name, Last Name of selected row
		var memberId = $(this).parent().find("#member_id").val();
		var firstName = $(this).parent().find(".first_column").text().split(" ")[0];
		var lastName = $(this).parent().find(".first_column").text().split(" ")[1];
		
		// call the function to popup the table with the visited dates, times by selected member
		displayMemberVisitedDatesTimes(memberId, firstName, lastName);
		
	});
	
	
	$(".background_overlay_visits").click(function(){
		
		$(".background_overlay_visits, .popup_visits").animate({
			height: "toggle"
		});
	});
});