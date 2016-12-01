	

$(document).ready(function() {
	
/* ----------- SHOW POPUPS 'Programmes booked', 'Show visitors for last' IN REPORTS BLOCKS -------------------------- */
	$(".bottom_panel .no_membership_members, .bottom_panel #programme_booked").hover(function(){
		
		$(".bottom_panel #programme_booked").stop().fadeToggle(300);
	});
	
	$(".bottom_panel #last_visitors, .bottom_panel .last_visitors").hover(function(){
		
		$(".bottom_panel #last_visitors").stop().fadeToggle(300);
	});
	
/*------------ GET NAMES AND DETAILS OF TODAYS VISITED MEMBERS 'Todays's visits' link --------------------------------*/
	$(".bottom_panel .today_visits").click(function(){
		
		// assign this variable in 'loading_content.js'
		// this variable will be used when loading 'reports_big_table.js'
		reportsBigTableType = 3;  // 3 = 'Today's visits'
		
		$(".loading_content").load("pages/reports_big_table.jsp");
	});
	
	$(".bottom_panel #programme_booked div").click(function(){
		
		// assign this variable in 'loading_content.js'
		// this variable will be used when loading 'reports_big_table.js'
		programmeType = $(this).find(".programme").text();
		
		// assign this variable in 'loading_content.js'
		// this variable will be used when loading 'reports_big_table.js'
		if(programmeType.localeCompare("'Pay as You Go'") === 0){
			
			reportsBigTableType = 5; // 5 = 'Pay as You Go' members
		}
		else if(programmeType.localeCompare("'Other'") === 0){
			
			reportsBigTableType = 6; // 6 = 'Other' (any other programme types)
		}
		else{
			
			reportsBigTableType = 4;  // 4 = '1 Month Membership', '3 Months Membership', etc..
		}
		
		
		$(".loading_content").load("pages/reports_big_table.jsp");
	});
	
/*---------- GET VISITED MEMBERS BY THE SPECIFIED PERIOD OF WEEKS (1 Week, 2 Weeks, 4 Weeks, etc..) --------------------*/
	$(".bottom_panel #last_visitors div").click(function(){
		
		// get number of weeks (weeks * 7) and fetch members from database by this number by date backwards
		numberOfWeeks = $(this).find(".number_weeks span").text();
		
		// assign this variable in 'loading_content.js'
		// this variable will be used when loading 'reports_big_table.js'
		reportsBigTableType = 7; // 7 = get visited members by the specified period of weeks (1 Week, 2 Weeks, 4 Weeks, etc..)
		
		$(".loading_content").load("pages/reports_big_table.jsp");
		
	});
});
