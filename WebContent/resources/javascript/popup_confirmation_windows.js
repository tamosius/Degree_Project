
$(document).ready(function(){
	
/*------- 'Yes' button clicked in '.confirm_window' ------------------------------------------------------------*/
	$(".confirm_window #confirm_button").click(function(){
		
		// get the value specified from '#trigger_submit'
		// and trigger appropriate button in submit forms
		$($(".confirm_window #trigger_submit").val()).trigger("click");
		
		// hide the window and the background overlay
		$(".confirm_window_background_overlay, .confirm_window").fadeOut(200);
	});
	
/*------- 'No' button clicked in '.confirm_window' -------------------------------------------------------------*/
    $(".confirm_window #cancel_button").click(function(){
    	
		$(this).parent().parent().find("#trigger_submit").val("");
		
		// hide the window and the background overlay
		$(".confirm_window_background_overlay, .confirm_window").fadeOut(200);
	});
	
/*------- 'Yes' button clicked in '.confirm_settings_window' ---------------------------------------------------*/
    $(".confirm_settings_window .confirm_button").click(function(){
		
    	// get the value specified from '#trigger_submit'
		// and trigger appropriate button in submit forms
		$($(".confirm_settings_window #trigger_submit").val()).trigger("submit");
		
		// hide the window and the background overlay
		$(".confirm_window_background_overlay, .confirm_settings_window").fadeOut(200);
	});
    
/*------- 'No' button clicked in '.confirm_settings_window' ----------------------------------------------------*/
    $(".confirm_settings_window .cancel_button").click(function(){
		
        $(this).parent().parent().find("#trigger_submit").val("");
		
		// hide the window and the background overlay
		$(".confirm_window_background_overlay, .confirm_settings_window").fadeOut(200);
	});
});