
/*------- DECLARE GLOBAL VARIABLES TO BE ACCESSIBLE FROM OTHER '.js' FILES ---------------------------------------------------*/
	var startDate = "";              // start date of selected report
	var endDate = "";                // end date of selected report
	
	var reportType = "--------";     // report type assigned, when the page loads for the first time
	var reportTypeReference = "";    // reference to JavaScript object 'reportData'
	var uriToDatabase = "";          // URI to database to execute query
	var elementNumber = "";          // the number of element of the report type (e.g. 'member[0]')
	
/*-------- OBJECT TO STORE THE REPORT TYPES, 
 * ------- THE REPORT NAMES AND THE DESCRIPTIONS -----------------------------------------------------------------------------*/
	var reportsData = {
			
			member  : [
			      {   // [0]
			    	  reportName  : "New Members", 
			    	  description : "This report lists all new signup of members within the given period. The 'Programme' column displays the current programme plan the members holds.",
			    	  uri         : "getNewMembers",
			    	  tableHeader : "<tr id='header_row'><td id='first'>Name</td><td id='second'>Joined on</td><td id='third'>Programme</td><td id='fourth'>Expires</td><td id='fifth'>Visits</td></tr>"
			      },
			      {   // [1]
			    	  reportName  : "Member Made Booking",
			    	  description : "All members who made bookings within the given period. 'Pay as You Go' are excluded.",
			    	  uri         : "getMembersBookings",
			    	  tableHeader : "<tr id='header_row'><td id='first'>Name</td><td id='second'>Programme</td><td id='third'>Start Date</td><td id='fourth'>End Date</td><td id='fifth'>Paid €</td></tr>"
			      },
			      {   // [2]
			    	  reportName  : "Birthday List",
			    	  description : "All current members whose birthday between given report start date and end date. 'Age' column shows current age of person.",
			    	  uri         : "getBirthdayList",
			    	  tableHeader : "<tr id='header_row'><td id='first'>Name</td><td id='second'>Birthday</td><td id='third'>Programme</td><td id='fourth'>Age</td><td id='fifth'>Visits</td></tr>"
			      },
			      {
			    	  reportName  : "Updated Programme Plan",
			    	  description : "Members whose previous Programme plan has been updated during the given period.",
			    	  uri         : "getExpireMemberships",
			    	  tableHeader : "<tr id='header_row'><td id='first'>Name</td><td id='second'>Programme</td><td id='third'>Expired On:</td><td id='fourth'>Last Visit</td><td id='fifth'>Visits</td></tr>"
			      },
			      {   // [4]
			    	  reportName  : "Missing Members",
			    	  description : "Members who haven't attended in the specified period of time.",
			    	  uri         : "getMissingMembers",
			    	  tableHeader : "<tr id='header_row'><td id='first'>Name</td><td id='second'>Date Joined</td><td id='third'>Programme</td><td id='fourth'>Last Visit</td><td id='fifth'>Visits</td></tr>"
			      }
			], // end of 'Member' report type
	
	        personal_trainer : [
	              {
	            	  reportName  : "Trainer Performance",
	            	  description : "Break down performance of personal trainer regard members retention.",
	            	  uri         : "getTrainerPerformance"
	              },
	              {
	            	  reportName  : "Trainer Total Sessions",
	            	  description : "Count sessions completed by trainers.",
	            	  uri         : "getTrainerSessions"
	              }
	        ], // end of 'Trainer Performance' report type
			
			financial :[
			      {
			    	  reportName  : "All Products",
			    	  description : "All products for sold...",
			    	  uri         : "getFinancialProducts"
			      },
			      {
			    	  reportName  : "All Sales",
			    	  description : "Sales desctiption is on the way...",
			    	  uri         : "getFinancialSales"
			      },
			      {
			    	  reportName  : "Gross Membership Sales",
			    	  description : "Gross membership sales, really?...",
			    	  uri         : "getGrossMembership"
			      }
			], // end of 'Financial' report type
	        
	        sales : [
	              {
	            	  reportName  : "All Products",
	            	  description : "This report lists all products.",
	            	  uri         : "getSalesProducts"
	              },
	              {
	            	  reportName  : "All Sales",
	            	  description : "All sales made within a given period. This report includes all till sales, all membership sales (including renews).",
	            	  uri         : "getSalesSales"
	              }, 
	              {
	            	  reportName  : "Product Purchases",
	            	  description : "This report lists all products purchased over a given period.",
	            	  uri         : "getProductPurchases"
	              }
	        ] // end of 'Sales' report type     		                       
	} // end of 'reportsData' object		                       
				                       			                      
/*-------- CHECK IF BOTH DATES 'report start date' AND 'report end date' ARE SELECTED -----------------------------------------*/
	function checkDateSelections(startDate, endDate){
		
		// clear the 'error_window'
		$(".error_window").empty();
		if((startDate.localeCompare("no membership") !== 0) && (endDate.localeCompare("no membership") !== 0)
				&& (startDate.localeCompare("") !== 0) && (endDate.localeCompare("") !== 0)){
			
			// get number of days between 'startDate' and 'endDate'
			var count = daysCount(parseDate(startDate.substring(0, 10)), parseDate(endDate.substring(0, 10)));
			
			// if 'startDate' is higher than the 'endDate'
			if(count < 0){
				
				// add 'error' classes to the 'From' and 'To' fields
				//$("#second_block #from").addClass("error_dates");
				//$("#second_block #to").addClass("error_dates");
				
				
				// error message to display if the 'startDate' is higher than the 'endDate'
				var message = "<div class='fault'><span style='color: red;'>&#9654;</span> The <span class='fault_reason'>'From'</span>" +
        		" date: <span class='fault_reason'>'" + startDate.substring(0, 10) + "'</span>, is higher than<br> <span style='margin-left: 20px;'>the" +
				" </span><span class='fault_reason'>'To'</span> date: <span class='fault_reason'>'" + endDate.substring(0, 10) +
				"' </span>.<br> <span style='margin-left: 20px;'>Please select the dates again.</span><br><br></div>";
				
				// popup the error window with the message
				$(".error_window").append(message + "<hr><img src='resources/images/error.jpg' alt='error' />");
		        $(".error_window").fadeIn(200);
		        
		        // return count = 0, if the 'startDate' is higher than the 'endDate'
		        return 0;
		        
			}else{
				
				return count;
			}
		}else{
			
			// return count = 0, if one of the fields are with 'no membership' value
			return 0;
		}
		
	}
	
/*------- CALCULATE NUMBER OF DAYS BETWEEN 'start' AND 'end' REPORT	-----------------------------------------------------------*/
	function parseDate(date){
		
		var dayMonthYear = date.split("-");
		
		return new Date(dayMonthYear[2], dayMonthYear[1] - 1, dayMonthYear[0]);
	}
	
	function daysCount(startDate, endDate){
		
		var oneDay = 24 * 60 * 60 * 1000;  // hours, minutes, seconds, milliseconds
		
		return Math.round((endDate - startDate) / oneDay);
	}
	
/*----- CHECK THE REPORT TYPE, AND PASS APPROPRIATE ARRAY REFERENCE TO 'displayReportNames' ----------------------------------*/
	function checkReportType(){
		
		$(".report_selection #report_selected_type").text(reportType);
		
    	if(reportType === "member"){
    		
    		displayReportNames(reportsData.member);              // pass 'member' array reference 
    		
    	}else if(reportType === "personal_trainer"){
    		
    		displayReportNames(reportsData.personal_trainer);    // pass 'personal_trainer' array reference
    		
    	}else if(reportType === "financial"){
    		
    		displayReportNames(reportsData.financial);           // pass 'financial' array reference
    		
    	}else if(reportType === "sales"){
    		
    		displayReportNames(reportsData.sales);               // pass 'sales' array reference
    		
    	}
	}
	
/*----- FUNCTION 'displayReportNames' TO DISPLAY ALL REPORT NAMES BY TYPE -----------------------------------------------------*/
    function displayReportNames(type){
    	
    	reportTypeReference = type;  // reference to JavaScript object 'reportData'
    	
    	$(".report_name_block #report_name_table").empty();   // make a table empty before append the names of the report
    	
    	$.each(type, function(key, value){
    		
    		$(".report_name_block #report_name_table").append(
    				"<tr><td>" + value.reportName + "<input type='hidden' value='" + key + "'></td></tr>");
    					
    	});
    }
 

    
	
/*-------- JQUERY ------------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
	// animate whole page when loading
	//$(".reports_content_block").animate({
		
		//height: "toggle"
	//}, 100);
	
/*------- BIND TEXTFIELDS WITH CALENDAR IN 'reports.jsp' FILE ----------------------------------------------------------------*/
	$("#report_dates_statistics").delegate("#report_start_date_input", "focusin", function(){
		
		   $(this).datepicker({
			   
			   showAnim   : "slide",
			   dateFormat : "dd-mm-yy",
			   firstDay   : 1,
			   changeYear : true,
			   yearRange  : "1975:2020",
			   
			   //changeMonth: true,
			   //showOtherMonths: true,
			   //selectOtherMonths: true,
			   
			   onSelect   : function(dateText){
				   
				   startDate = dateText;
				   
				   // calculate date difference if 'startDate' and 'endDate' are selected
                   // show 'error' message if 'startDate' higher than 'endDate'
				   $("#report_dates_statistics #number_of_days").val(checkDateSelections(startDate, endDate));  
			   }
		   });
		});
	
	$("#report_dates_statistics").delegate("#report_end_date_input", "focusin", function(){ 
		
		   $(this).datepicker({
			   
			   showAnim   : "slide",
			   dateFormat : "dd-mm-yy",
			   firstDay   : 1,
			   changeYear : true,
			   yearRange  : "1975: 2020",
			   onSelect   : function(dateText){
				   
				   endDate = dateText;
				   
				   // calculate date difference if 'startDate' and 'endDate' are selected
                   // show 'error' message if 'startDate' higher than 'endDate'
				   $("#report_dates_statistics #number_of_days").val(checkDateSelections(startDate, endDate));  
			   }
		   });
	});
	

/*----- SELECT THE REPORT TYPE ON POP-UP 'div' WINDOW -------------------------------------------------------------------------*/
	$(".reports_left_container").delegate(".report_selection", "click", function(){
		
		//$(".report_selection_types").stop().fadeToggle();  // fadeIn, fadeOut 'report type selection'
		$(".report_selection_types").animate({
			
			height: "toggle"
		});
	});
	
    $(".reports_left_container").delegate(".report_selection_types div", "click", function(){
    	
    	reportType = $(":input", this).val();   // get report type selected
    	
    	$(".report_description #report_description").text(""); // clear the 'Report Description' area
    	
    	checkReportType();    // check report type selected and display
                              // names of that report type
    });
    
/*------ MAKE FOCUS AND SELECTION IN 'report_name_table' IN 'reports.jsp' -----------------------------------------------------*/
	$(".reports_left_container").delegate(".report_name_block #report_name_table tr", "click", function(){
		
		$(".report_name_block #report_name_table tr").removeClass("highlight_row");
		$(this).addClass("highlight_row");
		
		elementNumber = $(":input", this).val();  // assign the number of element of the report type
		                                          // (e.g. 'member[0]')
		
		// assign URI to 'uriToDatabase' variable to execute SQL query
		uriToDatabase = reportTypeReference[elementNumber].uri;
		
		// show report type name description in 'Report Description' area
		$(".report_description #report_description").text(reportTypeReference[$(":input", this).val()].description);
	});
    
/*----- VIEW REPORT IN THE RIGHT-SIDE CONTAINER TABLE -------------------------------------------------------------------------*/
    $(".reports_left_container").delegate("#view_report_button", "click", function(event){
    	var fault = "";  // do not execute call to the database if not all variables have 
    	                 // values ('both dates', 'reportType', 'reportTypeReference', 'uriToDatabase')
    	
    	if(startDate === ""){
    		
    		fault += "<div class='fault'>- <span class='fault_reason'>'The Report Start Date'</span> is NOT selected! Please select one.<br><br></div>";
    		event.preventDefault();
    	}
        if(endDate === ""){
    		
    		fault += "<div class='fault'>- <span class='fault_reason'>'The Report End Date'</span> is NOT selected! Please select one.<br><br></div>";
    		event.preventDefault();
    	}
    	if(reportTypeReference === ""){
    		
    		fault += "<div class='fault'>- <span class='fault_reason'>'The Report Name'</span> is NOT selected! Please select one.<br><br></div>";
    		event.preventDefault();
    	}
    	
    	
    	if(fault.length === 0){
    		
    		$.ajax({
        		type: "POST",
        		url: serverPath + "reportsController/" + uriToDatabase,
        		data: {startDate : startDate.substring(0, 10), endDate : endDate.substring(0, 10)},
        		dataType: "json",
        		processData: true,
        		success: function(data, status, e){
        			
        			$(".reports_right_container .reports_right_container_content").hide();
        			
        			$(".report_table_header").show();
        			
        			$(".report_table_header table").html(reportTypeReference[elementNumber].tableHeader);  // insert appropriate table header row
        			                                                                                       // depending on report type and name
        			
        			$(".report_table_body").empty();   // make table empty before inserting data
        			
        			displayReport(data, reportType, elementNumber);
        			
                    $(".reports_right_container .reports_right_container_content").animate({
        				
        				height: "toggle"
        					
        			}, 300);
        			
        		},
        		error: function(e){
        			
        			$(".error_window").html( "<p>Errors in the database connection, queries, etc.</p><hr><img src='resources/images/error.jpg' alt='error' />");
        	        $(".error_window").fadeIn(200);
        		}
        		
        	});
    		
    		$("#report_dates_statistics .statistics_barcharts ").empty();
    		
    		// make another call to retrieve the statistics
    		// within the specified period of time
    		$.ajax({
        		type: "POST",
        		url: serverPath + "reportsController/" + uriToDatabase + "Statistics",
        		data: {startDate : startDate.substring(0, 10), endDate : endDate.substring(0, 10)},
        		dataType: "json",
        		processData: true,
        		success: function(data, status, e){
        			
        			$.each(data, function(key, value){
        				
        				$("#report_dates_statistics .statistics_barcharts").append(
        					
        					"<div class='barchart'>" +
					            "<div class='barchart_label'><div class='week'>Week: " + value.weekNumber + ",</div> " +
					            		"<div class='week_range'>(" + value.weekRangeStart + " - " + value.weekRangeEnd + ")</div>" +
					            (uriToDatabase.localeCompare("getNewMembers") === 0 ? "" : "<div class='revenue'>Revenue: €" + value.revenue + "</div>") +
					            
					            "<div class='total_entries'>Entries: " + value.entries + "</div></div>" +
				             "</div>"
        				);
        			});
        			
        		},
        		error: function(e){
        			
        			$(".error_window").html( "<p>Errors in the database connection, queries, etc.</p><hr><img src='resources/images/error.jpg' alt='error' />");
        	        $(".error_window").fadeIn(200);
        		}
        		
        	});
    		
    	}else{
    	
            $(".error_window").html( fault + "<hr><img src='resources/images/error.jpg' alt='error' />");
            $(".error_window").fadeIn(200);
            event.preventDefault();
    	}
    	
    	event.preventDefault();
    });
}); // end of 'JQUERY'

function displayReport(data, reportType, elementNumber){
	
	$("#report_dates_statistics #showing_total_members").val(data.length);  // show total of members returned
	
	if(data.length === 0){ // exit the function if no results returned
		
		$(".report_table_body").html("<div class='no_results'>No Results...</div>");
		return;
	}
	
	if((reportType.localeCompare("member") === 0)){
		
		switch(elementNumber){
		
			case "0" : // 'New Members' report name
				$.each(data, function(key, value){
    				
    				$(".report_table_body").append(              // 'reportsTableFonts' in 'useful_functions.js'
    						
    						"<tr class='report_row'>" +
    						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
    						"<td class='first_column' style='display:none;'>" + value.firstName + " " + value.lastName + "</td>" +
    						"<td class='report_column1'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" +
    						"<td class='report_column2' style='position: relative;'>" + value.dateJoined.substring(0, 10) + "" +
  						               "<div class='time_popup'>at <span>" + value.dateJoined.substring(11, 19) + "</span></div></td>" +
    						"<td class='report_column3'>" + reportsTableFonts(value.programme) + "</td>" +
    						"<td class='report_column4'><div class='membership_dates'>" + reportsTableFonts(value.membershipTo) + "</div></td>" +
    						"<td class='report_column5'>" + value.countVisits + "</td>" + 
    						"</tr>");
    			});
				break;
				
			case "1" :  // 'Member made booking' report name
				$.each(data, function(key, value){
    				
    				$(".report_table_body").append(
    						
    						"<tr class='report_row'>" +
    						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
    						"<td class='first_column' style='display:none;'>" + value.firstName + " " + value.lastName + "</td>" +
    						"<td class='report_column1'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" +
    						"<td class='report_column2'>" + reportsTableFonts(value.programme) + "</td>" +
    						"<td class='report_column3'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" +
    						"<td class='report_column4'><div class='membership_dates'>" + reportsTableFonts(value.membershipTo) + "</div></td>" +
    						"<td class='report_column5'>" + addClass(value.paid.toFixed(2)) + "</td>" + 
    						"</tr>");
    			});
				break;
				
			case "2" :  // 'Birthday List' report name
				$.each(data, function(key, value){
    				
    				$(".report_table_body").append(
    						
    						"<tr class='report_row'>" +
    						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
    						"<td class='first_column' style='display:none;'>" + value.firstName + " " + value.lastName + "</td>" +
    						"<td class='report_column1'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" +
    						"<td class='report_column2'><div class='membership_dates'>" + value.dateOfBirth + "</div></td>" +
    						"<td class='report_column3'>" + reportsTableFonts(value.programme) + "</td>" +
    						"<td class='report_column4'>" + value.memberAge + "</td>" +
    						"<td class='report_column5'>" + value.countVisits + "</td>" +
    						"</tr>");
    			});
				break;
				
			case "3" :  // 'Expired Memberships' report name
				$.each(data, function(key, value){
    				
    				$(".report_table_body").append(
    						
    						"<tr class='report_row'>" +
    						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
    						"<td class='first_column' style='display:none;'>" + value.firstName + " " + value.lastName + "</td>" +
    						"<td class='report_column1'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" +
    						"<td class='report_column2'>" + reportsTableFonts(value.programme) + "</td>" +
    						"<td class='report_column3'><div class='membership_dates'>" + reportsTableFonts(value.membershipTo) + "</div></td>" +
    						"<td class='report_column4'><div class='membership_dates'>" + value.visitedTimestamp + "</div></td>" +
    						"<td class='report_column5'>" + value.countVisits + "</td>" +
    						"</tr>");
    			});
				break;
				
			case "4" :  // 'Missing Members' report name
				$.each(data, function(key, value){
					
					$(".report_table_body").append(
							
							"<tr class='report_row'>" +
    						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
    						"<td class='first_column' style='display:none;'>" + value.firstName + " " + value.lastName + "</td>" +
    						"<td class='report_column1'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" +
    						"<td class='report_column2' style='position: relative;'>" + value.dateJoined.substring(0, 10) + "" +
				               "<div class='time_popup'>at <span>" + value.dateJoined.substring(11, 19) + "</span></div></td>" +
				            "<td class='report_column3'>" + reportsTableFonts(value.programme) + "</td>" +
				            "<td class='report_column4' style='position: relative;'><div class='membership_dates'>" + value.visitedTimestamp.substring(0, 10) + "</div>" +
					           "<div class='time_popup'>at <span>" + value.visitedTimestamp.substring(11, 19) + "</span></div></td>" +			        
    						"<td class='report_column5'>" + value.countVisits + "</td>" +
    						"</tr>");
							
				});
				break;
		}
	}
}








