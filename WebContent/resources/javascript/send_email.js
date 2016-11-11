
$(document).ready(function(){
	
	
	$(".send_email_window form").submit(function(event){
		
		// get standard javascript object here
		var form = $(this)[0];
		
		var formData = new FormData(form);
		
		$.ajax({
    		
    		type        : "POST",
            url         : "/Degree_Project/sendEmail/send",
            data        : formData,
            //contentType : "application/json; charset=utf-8",
            //dataType    : "json",
            processData : false,  // these has to be done in order upload image to work
            contentType : false,
            //cache       : false,
            //async       : false,	
            success     : function (data, status, jqXHR){
            	
            	
            },
            error : function (xhr) {
            	
                alert("Failed!" + JSON.stringify(xhr));
            }
    	});
		
		event.preventDefault();
	});
	
});