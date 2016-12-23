
$(document).ready(function(){
	
	$("body").delegate("#reports_big_table_body_block #reports_big_table_body_table tr td," +
			"#leave_message_block #communications_table_body tr td," +
			".report_table_body .report_column2," +
			".report_table_body .report_column4", "click", function(){
		
		// the time specified by the hovered field with the date ('booked on', 'last visit', etc..)
		var time = $(this).find(".time_popup");
		
		// popup the tooltip on the click
		time.fadeToggle();
		
		// fadeOut the tooltip on the mouse move out
		$(this).mouseout(function(){
			
			time.fadeOut();
		});
	});
});