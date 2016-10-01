
function loadPictureHideTable(){
	
	
}


$(document).ready(function(){
	
	/*--- SET THE PREVIOUS VALUES TO APPROPRIATE FIELDS AND BLOCKS
	 * IF RETURNING TO THIS PAGE
	 */
	$(".reports_start_date #report_start_date_input").val(startDate);
	$(".reports_end_date #report_end_date_input").val(endDate); 
	
	checkDateSelections();  // check if both dates are selected, calculate the 
	                        // difference between them
	
	checkReportType();      // check report type selected and display
	                        // names of that report type
	
});