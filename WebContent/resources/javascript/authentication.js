$(document).ready(function(){
	
    if($('#authenticate_username_field').val().length === 0){
        $('#authenticate_username_field').focus();  /* focus on the username field when page is loaded */
    }else{
        $('#authenticate_password_field').focus();  
    }
    
    $('#authenticate_username_field, #authenticate_password_field').keydown(function(){
        $('#error_message h4').text('');
    });
    
    $("#username_password_block form").submit(function(event){
    	
    	var username = $(this).find("#username_block #authenticate_username_field").val();
    	var password = $(this).find("#password_block #authenticate_password_field").val();
    	
    	$.post("/Degree_Project/authentication/authenticate", {username : username, password : password});
    	event.preventDefault();
    });
});