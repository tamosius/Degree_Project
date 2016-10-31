
$(document).ready(function(){
	
	// 'Upload Picture' button is clicked
	$(".add_member_left_sidebar #upload_picture_button").click(function(){
		
		$(".add_member_left_sidebar #file_upload").trigger("click");
	});
	
	// detect if file has been selected in the file input
	$("#file_upload").change(function(){
		
		readPictureURL(this);
	});
	
});

function readPictureURL(input) {
	console.log("file: " + input.files);
    if (input.files && input.files[0]) {
    	
        var reader = new FileReader();

        reader.onload = function (e) {
        	
            $(".add_member_left_sidebar #image img").attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}