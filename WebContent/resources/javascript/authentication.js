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
    	
    	$.ajax({
    		
    		type : "POST",
    		url   : "/Degree_Project/admin/authenticate",
    		data  : JSON.stringify({username : username, password : password}),
    		contentType : "application/json; charset=utf-8",
    		dataType : "html",
    		processData : true,
    		success : function(data, status, jxHR){
    			
    			if(data.length !== 0){
    				
    				$("body").html(data);
    				//$(".content").append(data.mssg.toString());
    				
    			}
    			else{
    				
    				$("#error_message h4").text("Sorry, Username and Password does not match!");
    			}
    			
    		},
    		error : function(e){
    			
    			alert(e);
    		}
    	});
    	event.preventDefault();
    });
});