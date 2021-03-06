
/*
 * THIS FILE FOR LOADING DIFFERENT PAGES INTO ('loading_content' div class) LOCATED IN 'index.jsp'
 * AND ALSO DISPLAY MEMBERS WITH DETAILS IN THE BOTTOM-LEFT BLOCKS OF THE APPLICATION
 */


/*----------- GET TOTAL COUNT OF MEMBERS IN DATABASE -------------------------------------------------------*/
function getTotalMembers(){
	
	$.get("/Degree_Project/contr/getTotalMembers", function(data){
		
		totalMembers = data; // (int) value
		
		// display total number of members in the database (top panel, left)
		$(".top_panel .total_members_count").text("Total Members: " + totalMembers);
		
		// to show counts membership/programmes booked in 'Programmes booked' menu
		programmesBooked();
	});
}

/*------------ DISPLAY 'last attended member' DETAILS (BOTTOM-LEFT BLOCK) ----------------------------------*/
function displayLastAttended(){
	
	$.get("/Degree_Project/contr/lastAttendedMember", function(data){
		
		$(".last_attended_member #full_attendance").text("Show all " + data.firstName + "'s visits");
		
		// show this member in the 'Last Attended Member' bottom-left box
		$(".last_attended_member img").delay(1000).attr("src", "resources/images/membersImages/" + data.imagePath + "?" + parseInt(Math.random() * 1000000));
		$(".last_attended_member #member_id").val(data.id);
		$(".last_attended_member #full_name").text(data.firstName + " " + data.lastName);
		$(".last_attended_member #date_visited").text(data.visitedTimestamp.substring(0, 10));
		$(".last_attended_member #time_visited").text(data.visitedTimestamp.substring(11, 19));
		$(".last_attended_member #membership_status").html(fontLeftSidebar(data.membershipTo));                
		$(".last_attended_member #membership_status_days_left")                  // 'addClass', 'addClassDaysLeft', 'addClassDaysLeftLeftSidebar' functions
		     .html(fontDayLeftLeftSidebar(data.membershipDaysLeft, data.membershipTo));  // are in 'add_update_member.js' file
		
	});
}

/*------------ DISPLAY 'recently booked membership' DETAILS (BOTTOM-LEFT BLOCK) -----------------------------*/
function displayRecentlyBooked(){
	
    $.get("/Degree_Project/contr/recentlyBookedMembership", function(data){
		
		// show this member in the 'Recently Booked Membership' bottom-left box
    	$(".last_updated_member img").attr("src", "resources/images/membersImages/" + data.imagePath + "?" + parseInt(Math.random() * 1000000));
		$(".last_updated_member #member_id").val(data.id);
		$(".last_updated_member #full_name").text(data.firstName + " " + data.lastName);
		$(".last_updated_member #date_updated").text(data.bookedTimestamp);
		$(".last_updated_member #paid_membership").text(data.paid);                        
		$(".last_updated_member #membership_status").html(fontLeftSidebar(data.membershipTo));     
		$(".last_updated_member #membership_status_days_left")                 // 'addClass', 'addClassDaysLeft', 'addClassDaysLeftLeftSidebar' functions
		    .html(fontDayLeftLeftSidebar(data.membershipDaysLeft, data.membershipTo)); // are in 'add_update_member.js' file
	});
}

/*------------ DISPLAY 'recently joined member' DETAILS (BOTTOM-LEFT BLOCK) ---------------------------------*/
function displayRecentlyJoined(){
	
    $.get("/Degree_Project/contr/recentlyJoined", function(data){
		
		// show this member in the 'Recently Joined' bottom-left box
    	$(".recently_joined_member img").attr("src", "resources/images/membersImages/" + data.imagePath + "?" + parseInt(Math.random() * 1000000));
		$(".recently_joined_member #member_id").val(data.id);
		$(".recently_joined_member #full_name").text(data.firstName + " " + data.lastName);
		$(".recently_joined_member #date_updated").text(data.dateJoined);
		$(".recently_joined_member #paid_membership").text(data.paid);
		$(".recently_joined_member #membership_status").html(fontLeftSidebar(data.membershipTo));             
		$(".recently_joined_member #membership_status_days_left")            // 'addClass', 'addClassDaysLeft', 'addClassDaysLeftLeftSidebar' functions
		    .html(fontDayLeftLeftSidebar(data.membershipDaysLeft, data.membershipTo)); // are in 'add_update_member.js' file
	});
}

/*------------ SHOW 'Today's visits' NUMBER COUNT, BOTTOM PANEL ---------------------------------------------*/
function todaysVisitsCount(){
	
	$.get("/Degree_Project/bottomPanelReportsController/getVisitsCount", function(data){
		
		$(".bottom_panel #num_visits").html(data);
	});
}

/*------------ SHOW COUNTS OF BOOKED MEMBERSHIPS/PROGRAMMES IN 'Programmes booked' MENU ---------------------*/
function programmesBooked(){
	
	for(i = 0; i < programmes.length; i++){
		
		// nth-child in the 'programme_booked' block
		var nthChild = (i + 1);
		
		$.ajax({
			
			type : "POST",
			url  : "/Degree_Project/bottomPanelReportsController/getCountProgrammesTypes",
			data : {programme : programmes[i]},
			dataType : "text",
			processType : true,
			async : false,
			success : function(data, status, e){
				console.log(data);
				// array in 'global_variables.js' file
				booked[i] = data;
				
				$(".reports #programme_booked div:nth-child(" + nthChild + ")").find(".first_span")
				      .text(totalMembers + " / " + data + " ");
				$(".reports #programme_booked div:nth-child(" + nthChild + ")").find(".second_span")
				      .text("( " + calculateProgrammePercentage(data, totalMembers) + "% )");
			},
			error : function(e){
				
				alert("Error counting programmes types");
			}
		});
	}
}

/*------------ CALCULATE PROGRAMMES COUNT PERCENTAGES BOOKED BY THE MEMBERS ---------------------------------*/
function calculateProgrammePercentage(count, totalMembers){
	
	return ((count / totalMembers) * 100).toFixed(1);
}

/*------------ GET VISITED MEMBER COUNT BY THE SPECIFIED PERIOD OF WEEKS (DAYS) -----------------------------*/
function visitedMembersCount(){
	
	// iterate through the 'last_visitors' block for each 'div' element
	$(".reports #last_visitors div").each(function(){
		
		// get number of weeks (days actually) and call database
		var numberOfDays = $(this).find(".number_weeks span").text();
		// store this element in the variable
		var element = $(this).find(".first_span");
		
		$.ajax({
			
			type: "POST",
			url  : "/Degree_Project/bottomPanelReportsController/getVisitedMembersCountBySpecifiedWeeks",
			data : {numberOfDays : numberOfDays},
			dataType : "text",
			processType : true,
			async    : false,
			success : function(data, status, e){
				
				// append data (counted visitors) to this element
				element.text(data);
			},
			error : function(e){
				
				alert("Error counting visits by the specified weeks");
			}
		});
	});
}


/*===========================================================================================================*/
/*------------ JQUERY 'ready' -------------------------------------------------------------------------------*/
$(document).ready(function(){
	
/*------------ LOAD THE 'dashboard.jsp' AND GET TOTAL NUMBER OF MEMBERS WHEN THE PROGRAM STARTS -------------*/
	$(".loading_content").load("pages/dashboard.jsp");
	
/*----------- GET TOTAL COUNT OF MEMBERS IN DATABASE -------------------------------------------------------*/
	getTotalMembers();
	
/*----------- CALL THE 'displayLastAttended' FUNCTION (at the top of this file) ----------------------------*/
	displayLastAttended();
	
/*----------- CALL THE 'displayRecentlyBooked' FUNCTION (at the top of this file) --------------------------*/
	displayRecentlyBooked();
	
/*----------- CALL THE 'displayRecentlyJoined' FUNCTION (at the top of this file) --------------------------*/
	displayRecentlyJoined();
	
/*----------- SHOW ALL JOINED MEMBER BY DESCENDING ORDER 'Show all joined' link -----------------------------*/
	$(".recently_joined_member #show_all_recently_joined").click(function(){
		
		// 'reports_big_table.js' file will access this data (when loading 'jquery.ready'
		reportsBigTableType = 0;  // 0 = 'Show all joined'
		
		$(".loading_content").load("pages/reports_big_table.jsp");
	});
	
/*------------ SHOW ALL BOOKED MEMBERSHIPS MEMBERS BY DATES DESC 'Show all booked memberships' link ---------*/
	$("body").delegate(".last_updated_member #show_all_updated_memberships," +
			".dashboard_bottom_left #classes_booked_button", "click", function(){
		
		// 'reports_big_table.js' file will access this data (when loading 'jquery.ready'
		reportsBigTableType = 1;  // 1 = 'Show all booked memberships'
		
		$(".loading_content").load("pages/reports_big_table.jsp");
	});
	
/*----------- SHOW ONLY MEMBERS WITH THE VALID MEMBERSHIPS/PROGRAMMES ---------------------------------------*/
	$("body").delegate(".dashboard_bottom_left #mshp_booked_extended_button", "click", function(){
		
		// 'reports_big_table.js' file will access this data (when loading 'jquery.ready'
		reportsBigTableType = 2;  // 2 = 'Show members with the valid memberships'
		
		$(".loading_content").load("pages/reports_big_table.jsp");
	});
	
/*------------ SHOW THE TABLE WITH VISITED DATES, TIMES BY SELECTED MEMBER ----------------------------------*/
	$(".last_attended_member #full_attendance").click(function(){
		
		var memberId = $(this).parent().find("#member_id").val();
		var firstName = $(this).parent().find("#full_name").text().split(" ")[0];
		var lastName = $(this).parent().find("#full_name").text().split(" ")[1];
		
		// call the function to popup the table with the visited dates, times by selected member
		displayMemberVisitedDatesTimes(memberId, firstName, lastName);
	});
	
/*------------ SHOW 'Today's visits' NUMBER COUNT, BOTTOM PANEL ---------------------------------------------*/
	todaysVisitsCount();
	
/*------------ GET VISITED MEMBER COUNT BY THE SPECIFIED PERIOD OF WEEKS (DAYS) -----------------------------*/
	visitedMembersCount();
	
/*----------- DISPLAY TODAY'S DATE IN DASHBOARD 'Today's To-do List' ----------------------------------------*/
	var date = getTodaysDate();
	$("#today_to_do_list_button").val(date);
	
	
/*------------ CLEAR 'local storage' ON EXIT WINDOW ---------------------------------------------------------*/
	window.onbeforeunload = function(){
		localStorage.clear();
	}
/*------------ USING 'local storage' TO STORE DATA OF MEMBERS FOR 'display_members.jsp' PAGE ----------------*/
	
	// Check browser support
	/*if (typeof(Storage) !== "undefined") {
		
		$.get("/Degree_Project/contr/getAllMembers", function(data){
			
			// display total members in top-left corner of the window
			$(".top_panel .total_members_count").text("Total Members: " + data.length);
			// store the data returned in 'local storage' in 'string' format
			localStorage.setItem("membersList", JSON.stringify(data));
		}); 
	} else {
	    
	}*/
	
	
/*===========================================================================================================*/
/*------------ LEFT SIDEBAR, LOAD (dashboard.jsp) -----------------------------------------------------------*/
	$(".buttons_block #dashboard").click(function(){
		
		// clear description of the report (in the middle of 'top_panel')
		$(".top_panel #description_middle_top_panel").html("");
		
		// clear the 'Search' field in the top-right corner
		// before opening the page
		$(".top_panel .search #search_text").val("");
	    
		$(".loading_content").load("pages/dashboard.jsp");
	    });
	
/*------------ LEFT SIDEBAR, LOAD (display_members.jsp) -----------------------------------------------------*/
	$("body").delegate(".left_sidebar #display_members, .dashboard_top_left #display_button", "click", function(){
		
		// assign this variable in 'loading_content.js'
		// this variable will be used when loading 'reports_big_table.js'
		reportsBigTableType = 10;  // 3 = 'display_members'
		
		// clear description of the report (in the middle of 'top_panel')
		$(".top_panel #description_middle_top_panel").html("");
		
		// clear the 'Search' field in the top-right corner
		// before opening the page
		$(".top_panel .search #search_text").val("");
		
		$(".loading_content").load("pages/reports_big_table.jsp");
	});
	
/*------------ LEFT SIDEBAR, LOAD (communication.jsp) -------------------------------------------------------*/
	$(".left_sidebar #communication").click(function(){
		
		// clear description of the report (in the middle of 'top_panel')
		$(".top_panel #description_middle_top_panel").html("");
		
		// clear the 'Search' field in the top-right corner
		// before opening the page
		$(".top_panel .search #search_text").val("");
		
		$(".loading_content").load("pages/communications.jsp");
	});
	
/*------------ LEFT SIDEBAR, LOAD (reports.jsp) -------------------------------------------------------------*/
	$(".left_sidebar #reports").click(function(){
		
		// clear description of the report (in the middle of 'top_panel')
		$(".top_panel #description_middle_top_panel").html("");
		
		// clear the 'Search' field in the top-right corner
		// before opening the page
		$(".top_panel .search #search_text").val("");
		
		$(".loading_content").load("pages/reports.jsp"); 
		$(".report_table_header").hide();  // hide the table header of the report table, when the page loads
	});

/*------------ LEFT SIDEBAR, LOAD (sales.jsp) ---------------------------------------------------------------*/
	$(".buttons_block #sales").click(function(){
		
		// clear description of the report (in the middle of 'top_panel')
		$(".top_panel #description_middle_top_panel").html("");
		
		// clear the 'Search' field in the top-right corner
		// before opening the page
		$(".top_panel .search #search_text").val("");
		
		$(".loading_content").load("pages/products_sales.jsp");
	});
	
/*------------ LEFT SIDEBAR, LOAD (settings.jsp) ---------------------------------------------------------------*/
	$(".buttons_block #settings").click(function(){
		
		// clear description of the report (in the middle of 'top_panel')
		$(".top_panel #description_middle_top_panel").html("");
		
		// clear the 'Search' field in the top-right corner
		// before opening the page
		$(".top_panel .search #search_text").val("");
		
		$(".loading_content").load("pages/settings.jsp");
	});
});  // end of 'JQUERY.ready()'