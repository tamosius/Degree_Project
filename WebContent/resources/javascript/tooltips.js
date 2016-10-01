
$(document).ready(function(){
	
	$("body").delegate("#reports_big_table_body_block #reports_big_table_body_table tr td", "click", function(){
		
		// the time specified by the hovered field with the date ('booked on', 'last visit', etc..)
		var time = $(this).find(".time_popup");
		
		// popup the tooltip on the click
		time.fadeToggle();
		
		// fadeOut the tooltip on the mouse move out
		$(this).mouseout(function(){
			
			time.fadeOut();
		});
	});
	
	$(".bottom_panel .today_visits").hover(function(){
		var variable = $(".bottom_panel .today_visits").find("#today_visits").text();
		$(this).tooltip({
			content: "<span style='color: blue;'>" + variable + "</span>"
		});
	});
	
	
});