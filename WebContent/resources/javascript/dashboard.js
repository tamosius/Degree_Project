
var numberOfDays = 15;    // specified number of days, for which any particular
                         // members haven't attended the gym

var missingMembers = ""  // store missing members who haven't attended in the specified period of time

/*--------- CALCULATE MEMBER RETENTION RATE (%) ---------------------------------------------------------------------*/
function calculateAttendanceRate(totalMembers, missingMembers){
	
	return ((100 - (100 / (totalMembers / missingMembers)))).toFixed(1);
} // end of 'calculateRetentionRate' function

/*--------- GET DATE FORMAT, e.g. FROM 'new Date()' IN '12-06-2016' -------------------------------------------------*/
function getDateFormat(date){
	
	return ((date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate())
            + "-" + ((date.getMonth() + 1 ) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1))
            + "-" + date.getFullYear());
}

/*--------- JQUERY 'ready' FUNCTION ---------------------------------------------------------------------------------*/
$(document).ready(function(){
	
	var progress = $(".dashboard_top_left #retention_rate_div");
	var progressLabel = $(".dashboard_top_left #retention_rate_label");
	
	// calculate and display attendance rate (below 'Missing Members' button
	var rate = 0;
	
	$(function(){
		progress.progressbar({
	
		value: true,
		change: function(){
			progressLabel.text(rate + "% Attendance rate");
		},
		complete: function(){
			progressLabel.text(rate + "% Retentions rate");
		}
	});
		});
	
	$("body").delegate(".dashboard_top_left #b", "click", function(){
		
		
		
		progress.progressbar("value", rate);
	});
	
/*--------- SHOW MISSING MEMBERS (who haven't attended for the specified period of time) ----------------------------*/
	$(function(){
		
		// get today's date
		var endDate = new Date();     
		
		// subtract specified number of days from today's date
		var startDate = new Date(endDate.setDate(endDate.getDate() - numberOfDays));  
		                    		
	    $.ajax({
	    	type: "POST",
		    url   : "/Degree_Project/reportsController/getMissingMembers",
		    data : {startDate : getDateFormat(startDate), endDate : getDateFormat(new Date())},
		    dataType: "json",
		    processData : true,
		    success : function(data, status, jqXHR){
		    	
		    	// store missing members who haven't attended in the specified period of time
		    	missingMembers = data;
			    
		    	// show the count of missing members on the 'Missing Members' button
			    $(".dashboard_top_left #missing_members_button")
			        .text(missingMembers.length + " Missing members (last " + numberOfDays + " days)");
			    
			    // calculate attendance '%' rate (below 'Missing Members' button
			    rate = parseFloat(calculateAttendanceRate(totalMembers, parseInt(missingMembers.length)));
			    
			    if(rate === 0){
			    	
			    	progressLabel.text("0% Attendance rate");
			    }
			    else{
			    	
			    	// display calculated attendance in '%'
				    progress.progressbar("value", rate);
			    }   
		   },
		   error: function (xhr){
			   
			   alert("Failed! " + xhr);
		   }
	    });  // end of 'ajax' function
	}); // end of self invoking function
	
/*----------- SHOW ALL MISSING MEMBERS WHO HAVEN'T ATTENDED IN SPECIFIED NUMBER OF DAYS 'numberOfDays'
 *               'Missing Members' BUTTON --------------------------------------------------------------------------------*/
	$(".dashboard_top_left #missing_members_button").click(function(){
		
		// 'reports_big_table.js' file will access this data (when loading 'jquery.ready'
		reportsBigTableType = 8;  // 8 = 'Show missing members'
		
		$(".loading_content").load("pages/reports_big_table.jsp");
	});
	
/*---------- GET VALUED MEMBERS (SPENT MOSTLY ON PROGRAMMES AND PRODUCTS) ------------------------------------------------*/
	$(".dashboard_bottom_left #valued_members_button").click(function(){
		
		// 'reports_big_table.js' file will access this data (when loading 'jquery.ready'
		reportsBigTableType = 9;  // 9 = valued members (mostly spent on programmes and products)
		
		$(".loading_content").load("pages/reports_big_table.jsp");
	});
});