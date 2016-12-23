


// store reports descriptions, URI to REST API and table header tags
var reportsBigTable = {
		
		reportType : [
		        
		{ // [0], 'Show all joined'
			description : "Showing all members joined the gym (Newest from the top).",
			uri         : "/Degree_Project/reportsController/getNewMembers",
			tableHeader : "<tr><td id='first_column'>Name</td><td id='second_column'>Joined on:</td>" +
					"<td id='third_column'>Programme</td><td id='fourth_column'>Start Date</td>" +
					"<td id='fifth_column'>End Date</td><td id='sixth_column'>Last Visit</td>" +
					"<td id='seventh_column'>Visits</td></tr>"
			
		},
		{ // [1], 'Show all booked memberships'
			description : "Showing all members booked their memberships.",
			uri         : "/Degree_Project/reportsController/getMembersBookings",
			tableHeader : "<tr><td id='first_column'>Name</td><td id='second_column'>Booked on:</td>" +
			"<td id='third_column'>Programme</td><td id='fourth_column'>Start Date</td>" +
			"<td id='fifth_column'>End Date</td><td id='sixth_column'>Days left</td>" +
			"<td id='seventh_column'>Paid €</td></tr>"
		},
		{ // [2], 'Show members with the valid memberships'
			description : "Showing only members with the valid memberships.",
			uri         : "/Degree_Project/reportsController/getValidMembersBookings",
			tableHeader : "<tr><td id='first_column'>Name</td><td id='second_column'>Booked on:</td>" +
			"<td id='third_column'>Programme</td><td id='fourth_column'>Start Date</td>" +
			"<td id='fifth_column'>End Date</td><td id='sixth_column'>Days left</td>" +
			"<td id='seventh_column'>Paid €</td></tr>"
		},
		{ // [3], 'Today's visits' (show todays visited members)
			description : "Showing today's visited members.",
			uri         : "/Degree_Project/bottomPanelReportsController/getTodaysVisitedMembers",
			tableHeader : "<tr><td id='first_column'>Name</td><td id='second_column'>Visited at:</td>" +
			"<td id='third_column'>Programme</td><td id='fourth_column'>Start Date</td>" +
			"<td id='fifth_column'>End Date</td><td id='sixth_column'>Days Left</td>" +
			"<td id='seventh_column'>Visits</td></tr>"
		},
		{ // [4], '1 Month Membership', '3 Months Membership', etc... programme members
			description : "<span style='font-size: 20px;'>'1 Month Membership'</span> programme members. ",
			uri         : "/Degree_Project/bottomPanelReportsController/getProgrammeTypeMembers",
			tableHeader : "<tr><td id='first_column'>Name</td><td id='second_column'>Programme</td>" +
			"<td id='third_column'>Start Date</td><td id='fourth_column'>End Date</td>" +
			"<td id='fifth_column'>Days left</td><td id='sixth_column'>Last Visit</td>" +
			"<td id='seventh_column'>Visits</td></tr>"
		},
		{ // [5], 'Pay as You Go' members
			description : "<span style='font-size: 20px;'>'Pay as You Go'</span> members. ",
			uri         : "/Degree_Project/bottomPanelReportsController/getPayAsYouGoMembers",
			tableHeader :  "<tr><td id='first_column'>Name</td><td id='second_column'>Programme</td>" +
			"<td id='third_column'>Start Date</td><td id='fourth_column'>End Date</td>" +
			"<td id='fifth_column'>Days left</td><td id='sixth_column'>Last Visit</td>" +
			"<td id='seventh_column'>Visits</td></tr>"
		},
		{ // [6], 'Other' programme members
			description : "<span style='font-size: 20px;'>'Other'</span> programmes members. ",
			uri         : "/Degree_Project/bottomPanelReportsController/getOtherProgrammesMembers",
			tableHeader :  "<tr><td id='first_column'>Name</td><td id='second_column'>Booked on:</td>" +
			"<td id='third_column'>Programme</td><td id='fourth_column'>Start Date</td>" +
			"<td id='fifth_column'>End Date</td><td id='sixth_column'>Days Left</td>" +
			"<td id='seventh_column'>Visits</td></tr>"
		},
		{ // [7], get visited members by the specified period of weeks (1 Week, 2 Weeks, 4 Weeks, etc..)
			description : "Showing members who visited from/to: ",
			uri         : "/Degree_Project/bottomPanelReportsController/getVisitedMembersBySpecifiedWeeks",
			tableHeader : "<tr><td id='first_column'>Name</td><td id='second_column'>Visited on</td>" +
			"<td id='third_column'>Programme</td><td id='fourth_column'>Start Date</td>" +
			"<td id='fifth_column'>End Date</td><td id='sixth_column'>Days Left</td>" +
			"<td id='seventh_column'></td></tr>"
			
		},
		{ // [8], show missing members, who haven't attended in the specified period of time
			description : "Showing members who haven't attended in the last: ",
			tableHeader : "<tr><td id='first_column'>Name</td><td id='second_column'>Last Visit</td>" +
			"<td id='third_column'>Date Joined</td><td id='fourth_column'>Programme</td>" +
			"<td id='fifth_column'>Start Date</td><td id='sixth_column'>End Date</td>" +
			"<td id='seventh_column'>Visits</td></tr>"
			
		},
		{ // [9], valued members (mostly spent on programmes and products)
			description : "Showing valued members who spent the most on programmes and products.: ",
			uri         : "/Degree_Project/reportsController/getValuedMembers",
			tableHeader : "<tr><td id='first_column'>Name</td><td id='second_column'>Date Joined</td>" +
			"<td id='third_column'>Programmes €</td><td id='fourth_column'>Products €</td>" +
			"<td id='fifth_column'>Total €</td><td id='sixth_column'>Last Visit</td>" +
			"<td id='seventh_column'>Visits</td></tr>"
			
		},
		{ // [10], total members in the gym
			description : "Showing total number of members who has an account in the gym. ",
			uri         : serverPath + "contr/getAllMembers",
			tableHeader : "<tr><td id='first_column'>Name</td><td id='second_column'>Date Joined</td>" +
			"<td id='third_column'>Programme</td><td id='fourth_column'>Start Date</td>" +
			"<td id='fifth_column'>End Date</td><td id='sixth_column'>Days Left</td>" +
			"<td id='seventh_column'>Visits</td></tr>"
		}
	]
}


/*=====================================================================================================================================*/
/*----------- JQUERY READY ------------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
	// get today's date to set 'endDate'
	var todayDate = new Date();
	
	var startDate = "01-01-2012";
	var endDate = todayDate.getDate() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getFullYear();
	
	// 'reportsBigTableType' from 'loading_content.js'
	var variable = reportsBigTable.reportType[reportsBigTableType];
	
	// display appropriate columns in table header
	$("#reports_big_table_header_block #reports_big_table_header_table").append(variable.tableHeader);
	
	// call REST API depending on 'reportsBigTableType'
	// 0 = 'Show all joined', 1 = 'Show all booked memberships', 2 = 'Show members with the valid memberships'
	if(reportsBigTableType === 0 || reportsBigTableType === 1 || reportsBigTableType === 2){
		
		var description = "";
		
		if(reportsBigTableType === 0){
			
			description = "Displaying all members joined until today <span>( " + endDate + " )</span>.";
		}
		else if(reportsBigTableType === 1){
			
			description = "Displaying all members who booked any membership plan until today <span>( " + endDate + " )</span>.";
		}
		else if(reportsBigTableType === 2){
			
			description = "Displaying all members who have valid membership plans until today <span>( " + endDate + " )</span>.";
		}
		
		$.ajax({
		
		type        : "POST",
		url         : variable.uri,
		data        : {startDate : startDate, endDate : endDate},
		dataType    : "json",
		processType : true,
		success     : function(data, status, e){
			
			// call function to display appropriate report in 'reports_big_table.jsp'
			// report displayed by 'reportsBigTableType' variable selected from 'loading_content.js' file
			displayReportsBigTable(data, description, reportsBigTableType);
		},
		error       : function(e){
			
			alert("from 'reports_big_table'" + JSON.stringify(e));
		}
	    }); // end of 'ajax' call
	
	// 3 = 'Today's visits'
	}else if(reportsBigTableType === 3){
		
		$.ajax({
			
			type        : "POST",
			url         : variable.uri,
			data        : {name : ""},
			dataType    : "json",
			processType : true,
			success     : function(data, status, e){
				
				// call function to display appropriate report in 'reports_big_table.jsp'
				// report displayed by 'reportsBigTableType' variable selected from 'loading_content.js' file
				displayReportsBigTable(data, "Displaying Today's <span>( " + getTodaysDate() + " )</span> visits.", reportsBigTableType);
			},
			error       : function(e){
				alert("from 'reports_big_table'" + JSON.stringify(e));
			}
		});
	
	// 4, 5, 6 = get members by specified programme type ('1 Month Mbsh', '3 Months Mbsh', 'Pay as You Go', etc..),
	}else if (reportsBigTableType === 4 || reportsBigTableType === 5 || reportsBigTableType === 6){
		
		var programme = "";
		
		if(reportsBigTableType === 4){
			
			programme = "Displaying by programme type.";
		}
		else if(reportsBigTableType === 5){
			
			programme = "Displaying Members with <span>'Pay as You Go'</span> plan.";
		}
		
		$.ajax({
			
			type        : "POST",
			url         : variable.uri,
			data        : {programmeType : programmeType, name : ""},
			dataType    : "json",
			processType : true,
			success     : function(data, status, e){
				
				// call function to display appropriate report in 'reports_big_table.jsp'
				// report displayed by 'reportsBigTableType' variable selected from 'loading_content.js' file
				displayReportsBigTable(data, programme, reportsBigTableType);
			},
			error       : function(e){
				alert("from 'reports_big_table'" + JSON.stringify(e));
			}
		});
	
    // 7 = get visited members by the specified period of weeks (1 Week, 2 Weeks, 4 Weeks, etc..)
	}else if(reportsBigTableType === 7){
		
		var description = "Displaying all visitors of the last " + numberOfWeeks + " days:" +
				" <span>( " + subtractDate(numberOfWeeks) + " - " + endDate + " )</span>.";

        $.ajax({
			
			type        : "POST",
			url         : variable.uri,
			data        : {startDate : numberOfWeeks, name : ""}, // 'numberOfWeeks' is actually number of days, will be subtracted from today's date in mysql query
			dataType    : "json",
			processType : true,
			success     : function(data, status, e){
				
				// call function to display appropriate report in 'reports_big_table.jsp'
				// report displayed by 'reportsBigTableType' variable selected from 'loading_content.js' file
				displayReportsBigTable(data, description, reportsBigTableType);
			},
			error       : function(e){
				alert("from 'reports_big_table'" + JSON.stringify(e));
			}
		});
    
    // 8 = show missing members, who haven't attended in specified period of time
	}else if(reportsBigTableType === 8){
		
		// call function to display appropriate report in 'reports_big_table.jsp'
		// report displayed by 'reportsBigTableType' variable selected from 'loading_content.js' file
		displayReportsBigTable(missingMembers, variable, reportsBigTableType);
		
    // 9 = valued members (mostly spent on programmes and products)
	}else if(reportsBigTableType === 9){
		
        $.ajax({
			
			type        : "POST",
			url         : variable.uri,
			data        : {startDate : startDate, endDate : endDate}, // 'numberOfWeeks' will be subtracted from today's date in mysql query
			dataType    : "json",
			processType : true,
			success     : function(data, status, e){
				
				// call function to display appropriate report in 'reports_big_table.jsp'
				// report displayed by 'reportsBigTableType' variable selected from 'loading_content.js' file
				displayReportsBigTable(data, variable, reportsBigTableType);
			},
			error       : function(e){
				alert("from 'reports_big_table'" + JSON.stringify(e));
			}
		});
        
    // 10 = get total number of member who have an account    
	}else if(reportsBigTableType === 10){
		
		// set the table empty before displaying whole list of members
		$("table.body_table").empty(); 
		
			$.ajax({
				
				type: "POST",
				url : variable.uri,
				data : {idName : ""},
				dataType : "json",
				success : function(data){
					
					// call function to display appropriate report in 'reports_big_table.jsp'
					// report displayed by 'reportsBigTableType' variable selected from 'loading_content.js' file
					displayReportsBigTable(data, "Showing total number of members who has an account in the gym.", reportsBigTableType);
				
				},
				error : function(e){
					
					alert("Filed!!!");
				}
			});
	}
	
	
}); // end of 'JQUERY'

/*----------- DISPLAY REPORT IN 'reports_big_table.jsp' BY 'reportsBigTableType' --------------------------------------------------*/
function displayReportsBigTable(data, variable, reportsBigTableType){
	
	// display description of the report (in the middle of 'top_panel')
	$(".top_panel #description_middle_top_panel").html(variable + " Total: <span>" + data.length + "</span>");
	                                                        // 'span' css in 'body.css' file
	
	// clear the table body
	// before next displaying
	$("#reports_big_table_body_block #reports_big_table_body_table").empty();
	
	if(data.length === 0){
		
		$("#reports_big_table_body_block #reports_big_table_body_table").html("<div class='no_results'>No Results...</div>");
		                                                                       // 'no_results' css in 'display_members.css'
		return;
	}
	
	switch(reportsBigTableType){
	
		case 0 : // 'Show all new members'
			
			$.each(data, function(key, value){
				
				$("#reports_big_table_body_block #reports_big_table_body_table").append(
						
						"<tr>" +
						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
						"<td class='second_column' style='position: relative;'>" + value.dateJoined.substring(0, 10) + "" +
						  "<div class='time_popup'>at <span>" + value.dateJoined.substring(11, 19) + "</span></div></td>" +
						"<td class='third_column'>" + reportsBigTableFonts(value.programme) + "</td>" +  // 'addClass' function in 'add_update_member.js' file
						"<td class='fourth_column' style='position: relative;'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" +   
						"<td class='fifth_column' style='position: relative;'><div class='membership_dates'>" + reportsBigTableFonts(value.membershipTo) + "</div></td>" +
						"<td class='sixth_column' style='position: relative;'>" + value.visitedTimestamp.substring(0, 10) + "" +
						    "<div class='time_popup'>at <span>" + value.visitedTimestamp.substring(11, 19) + "</span></div></td>" +
						"<td class='seventh_column' id='visits'>" + value.countVisits + "</td>" +
						"</tr>");
			});
			break;
			
		case 1 : // 'Show all booked memberships'
			
			$.each(data, function(key, value){
				
				$("#reports_big_table_body_block #reports_big_table_body_table").append(
						
						"<tr>" +
						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
						"<td class='second_column' style='position: relative;'>" + value.bookedTimestamp.substring(0, 10) + "" +
						  "<div class='time_popup'>at <span>" + value.bookedTimestamp.substring(11, 19) + "</span></div></td>" +
						"<td class='third_column'>" + reportsBigTableFonts(value.programme) + "</td>" +         // 'addClass' function
						"<td class='fourth_column'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" +   // in 'add_update_member.js' file
						"<td class='fifth_column'><div class='membership_dates'>" + reportsBigTableFonts(value.membershipTo) + "</div></td>" +
						"<td class='sixth_column'>" + addClassDaysLeft(value.membershipDaysLeft) + "</td>" + 
						"<td class='seventh_column'>" + addClass(value.paid.toFixed(2)) + "</td>" +
						"</tr>");
			});
			break;
			
        case 2 : // 'Show members with the valid memberships'
			
			$.each(data, function(key, value){
				
				$("#reports_big_table_body_block #reports_big_table_body_table").append(
						
						"<tr>" +
						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
						"<td class='second_column' style='position: relative;'>" + value.bookedTimestamp.substring(0, 10) + "" +
						  "<div class='time_popup'>at <span>" + value.bookedTimestamp.substring(11, 19) + "</span></div></td>" +
						"<td class='third_column'>" + reportsBigTableFonts(value.programme) + "</td>" +         // 'addClass' function
						"<td class='fourth_column'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" +   // in 'add_update_member.js' file
						"<td class='fifth_column'><div class='membership_dates'>" + reportsBigTableFonts(value.membershipTo) + "</div></td>" +
						"<td class='sixth_column'>" + addClassDaysLeft(value.membershipDaysLeft) + "</td>" + 
						"<td class='seventh_column'>" + addClass(value.paid.toFixed(2)) + "</td>" +
						"</tr>");
			});
			break;
			
         case 3 : // 'Today's visits'
			
			$.each(data, function(key, value){
				
				// set id value for the 'Search' field in the top-right corner
         	    // this field is for search members by ID or name entered
         	    $(".top_panel .search").attr("id", "todayVisits");
				
				$("#reports_big_table_body_block #reports_big_table_body_table").append(
						
						"<tr>" +
						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" +
						"<td class='second_column'>" + value.visitedTimestamp.substring(11, 19) + "</td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
						"<td class='third_column'>" + reportsBigTableFonts(value.programme) + "</td>" +         // 'addClass' function
						"<td class='fourth_column'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" +   // in 'add_update_member.js' file
						"<td class='fifth_column'><div class='membership_dates'>" + reportsBigTableFonts(value.membershipTo) + "</div></td>" +
						"<td class='sixth_column'>" + addClassDaysLeft(value.membershipDaysLeft) + "</td>" +
						"<td class='seventh_column' id='visits'>" + value.countVisits + "</td>" +
						"</tr>");
			});
			break;
			
          case 4 : // get members by specified programme type
            	   // ('1 Month Membership', '3 Months Membership', etc)
        	  
        	    // set id value for the 'Search' field in the top-right corner
         	    // this field is for search members by ID or name entered
         	    $(".top_panel .search").attr("id", "byProgrammeType");
    			
    			$.each(data, function(key, value){
    				
    				$("#reports_big_table_body_block #reports_big_table_body_table").append(
    						
    						"<tr>" +
    						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
    						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
    						"<td class='second_column'>" + reportsBigTableFonts(value.programme) + "</td>" +
    						"<td class='third_column'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" +         // 'addClass' function
    						"<td class='fourth_column'><div class='membership_dates'>" + reportsBigTableFonts(value.membershipTo) + "</div></td>" +          // in 'add_update_member.js' file
    						"<td class='fifth_column'>" + addClassDaysLeft(value.membershipDaysLeft) + "</td>" +
    						"<td class='sixth_column' style='position: relative;'>" + value.visitedTimestamp.substring(0, 10) + "" +
						  "<div class='time_popup'>at <span>" + value.visitedTimestamp.substring(11, 19) + "</span></div></td>" +
    						"<td class='seventh_column' id='visits'>" + value.countVisits + "</td>" +
    						"</tr>");
    			});
    			break;
    			
            case 5 : // 'Pay as You Go' members
            	
            	// set id value for the 'Search' field in the top-right corner
         	    // this field is for search members by ID or name entered
         	    $(".top_panel .search").attr("id", "byProgrammeType");
			
			 $.each(data, function(key, value){
				
				$("#reports_big_table_body_block #reports_big_table_body_table").append(
						
						"<tr>" +
						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
						"<td class='second_column'>" + reportsBigTableFonts(value.programme) + "</td>" +
						"<td class='third_column'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" +         // 'addClass' function
						"<td class='fourth_column'><div class='membership_dates'>" + reportsBigTableFonts(value.membershipTo) + "</div></td>" +          // in 'add_update_member.js' file
						"<td class='fifth_column'>" + addClassDaysLeft(value.membershipDaysLeft) + "</td>" +
						"<td class='sixth_column'style='position: relative;'>" + value.visitedTimestamp.substring(0, 10) + "" +
						  "<div class='time_popup'>at <span>" + value.visitedTimestamp.substring(11, 19) + "</span></div></td>" +
						"<td class='seventh_column' id='visits'>" + value.countVisits + "</td>" +
						"</tr>");
			});
			break;
			
            case 6 : // 'Other' programmes members
    			
    			$.each(data, function(key, value){
    				
    				$("#reports_big_table_body_block #reports_big_table_body_table").append(
    						
    						"<tr>" +
    						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
    						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
    						"<td class='second_column'style='position: relative;'>" + value.bookedTimestamp.substring(0, 10) + "" +
						       "<div class='time_popup'>at <span>" + value.bookedTimestamp.substring(11, 19) + "</span></div></td>" +
    						"<td class='third_column'>" + reportsBigTableFonts(value.programme) + "</td>" +         // 'addClass' function
    						"<td class='fourth_column'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" +          // in 'add_update_member.js' file
    						"<td class='fifth_column'><div class='membership_dates'>" + reportsBigTableFonts(value.membershipTo) + "</div></td>" +
    						"<td class='sixth_column'>" + addClassDaysLeft(value.membershipDaysLeft) + "</td>" +
    						"<td class='seventh_column' id='visits'>" + value.countVisits + "</td>" +
    						"</tr>");
    			});
    			break;
    			
             case 7 : // get visited members by the specified period of weeks (1 Week, 2 Weeks, 4 Weeks, etc..)
            	 
            	// set id value for the 'Search' field in the top-right corner
          	    // this field is for search members by ID or name entered
          	    $(".top_panel .search").attr("id", "bySpecifiedWeeks");
    			
    			$.each(data, function(key, value){
    				
    				$("#reports_big_table_body_block #reports_big_table_body_table").append(
    						
    						"<tr>" +
    						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
    						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
    						"<td class='second_column' style='position: relative;'>" + value.visitedTimestamp.substring(0, 10) + "" +
						       "<div class='time_popup'>at <span>" + value.visitedTimestamp.substring(11, 19) + "</span></div></td>" +
    						"<td class='third_column'>" + reportsBigTableFonts(value.programme) + "</td>" +                      
    						"<td class='fourth_column'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" +   // 'addClass' function
    						"<td class='fifth_column'><div class='membership_dates'>" + reportsBigTableFonts(value.membershipTo) + "</div></td>" +     // in 'useful_functions.js' file
    						"<td class='sixth_column' id='visits'>" + addClassDaysLeft(value.membershipDaysLeft) + "</td>" +
    						"<td class='seventh_column' id='visits'>" + "</td>" +
    						"</tr>");
    			});
    			break;
    			
             case 8 : // show missing members, who haven't attended in the specified period of time
            	 
            	 $.each(data, function(key, value){
     				
     				$("#reports_big_table_body_block #reports_big_table_body_table").append(
     						
     						"<tr>" +
     						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
     						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
     						"<td class='second_column'style='position: relative;'>" + value.visitedTimestamp.substring(0, 10) + "" +
 						       "<div class='time_popup'>at <span>" + value.visitedTimestamp.substring(11, 19) + "</span></div></td>" +
 						    "<td class='third_column'style='position: relative;'>" + value.dateJoined.substring(0, 10) + "" +
						       "<div class='time_popup'>at <span>" + value.dateJoined.substring(11, 19) + "</span></div></td>" +
     						"<td class='fourth_column'>" + reportsBigTableFonts(value.programme) + "</td>" +         // 'addClass' function
     						"<td class='fifth_column'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" + // in 'add_update_member.js' file
     						"<td class='sixth_column'><div class='membership_dates'>" + reportsBigTableFonts(value.membershipTo) + "</div></td>" +
     						"<td class='seventh_column' id='visits'>" + value.countVisits + "</td>" +
     						"</tr>");
     			});
     			break;
     			
             case 9 : // valued members (mostly spent on programmes and products)
            	 
            	 // set id value for the 'Search' field in the top-right corner
            	 // this field is for search members by ID or name entered
            	 $(".top_panel .search").attr("id", "valuedMembers");
            	 
            	 $.each(data, function(key, value){
     				
     				$("#reports_big_table_body_block #reports_big_table_body_table").append(
     						
     						"<tr>" +
     						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
     						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
     						"<td class='second_column'style='position: relative;'>" + value.dateJoined.substring(0, 10) + "" +
 						       "<div class='time_popup'>at <span>" + value.dateJoined.substring(11, 19) + "</span></div></td>" +
 						    "<td class='third_column'style='position: relative;'>" + value.programmesTotalPaid + "</td>" +
     						"<td class='fourth_column'>" + value.productsTotalPaid + "</td>" +       // 'addClass' function
     						"<td class='fifth_column'>" + value.totalPaid + "</td>" +                // in 'add_update_member.js' file
     						"<td class='second_column'style='position: relative;'>" + value.visitedTimestamp.substring(0, 10) + "" +
 						       "<div class='time_popup'>at <span>" + value.visitedTimestamp.substring(11, 19) + "</span></div></td>" +
     						"<td class='seventh_column' id='visits'>" + value.countVisits + "</td>" +
     						"</tr>");
     			});
     			break;
     			
             case 10 :  // total members who have account in the gym
            	 
            	 // set id value for the 'Search' field in the top-right corner
            	 // this field is for search members by ID or name entered
            	 $(".top_panel .search").attr("id", "totalMembers");
            	 
            	 $.each(data, function(key, value){
      				
      				$("#reports_big_table_body_block #reports_big_table_body_table").append(
      						
      						"<tr>" +
      						"<input type='hidden' id='member_id' name='member_id' value='" + value.id + "' />" +
      						"<td class='first_column'><div class='name'>" + value.firstName + " " + value.lastName + "</div></td>" + // 'time_popup', 'span' css in 'reports_big_table.css'
      						"<td class='second_column'style='position: relative;'>" + value.dateJoined.substring(0, 10) + "" +
  						       "<div class='time_popup'>at <span>" + value.dateJoined.substring(11, 19) + "</span></div></td>" +
  						    "<td class='third_column'>" + reportsBigTableFonts(value.programme) + "</td>" +
      						"<td class='fourth_column'><div class='membership_dates'>" + value.membershipFrom + "</div></td>" +       // 'addClass' function
      						"<td class='fifth_column'><div class='membership_dates'>" + reportsBigTableFonts(value.membershipTo) + "</div></td>" +                // in 'add_update_member.js' file
      						"<td class='sixth_column'>" + addClassDaysLeft(value.membershipDaysLeft) + "</td>" +
      						"<td class='seventh_column' id='visits'>" + value.countVisits + "</td>" +
      						"</tr>");
      			});
      			break;
			
		default : break;
	}
}




