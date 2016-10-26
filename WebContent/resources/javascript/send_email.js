
$(document).ready(function(){
	
	
	$("#send_email_button").click(function(event){
		
		// get values from the email window
		var subject = $(".send_email_window #subject_field").val();
		var emailMessage = $(".send_email_window textarea").val();
		
		// send the email for each recipient selected with the check-box
		$(".send_email_window select option").each(function(){
			
			// compose new object for email
			composeEmail = {
					
					recipient : $(this).text(),
					subject : subject,
					emailMessage : emailMessage
			}
			
			// call web service 'SendMailController' class
			$.ajax({
	            type        : "POST",
	            url         : "/Degree_Project/sendEmail/send",
	            data        : JSON.stringify(composeEmail),
	            contentType : "application/json; charset=utf-8",
	            dataType    : "text",
	            processData : true,
	            success     : function (data, status, jqXHR) {
	                
	            	
	            },
	            error: function (xhr) {
	                
	            	alert("Error sending email!");
	            }
	        });
		});
	});
});