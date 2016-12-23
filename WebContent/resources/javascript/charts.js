
$(document).ready(function(){
	
	
	$(".bottom_panel .reports .programmes_booked").click(function(){
		
		$(".loading_content").load("pages/charts.jsp");
		
		
	});
});