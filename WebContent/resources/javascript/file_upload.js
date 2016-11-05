
$(document).ready(function(){
	
	// 'Upload Picture' button is clicked
	$(".add_member_left_sidebar .upload_picture_button").click(function(){
		
		
		$(".add_member_left_sidebar #add_member_upload").trigger("click");
	});
	
    $(".member_profile_left_sidebar .upload_picture_button").click(function(){
		
		
		$(".member_profile_left_sidebar #member_profile_upload").trigger("click");
	});
	
	// detect if file has been selected in the 'add_member_profile_left_sidebar' file input
	$(".add_member_left_sidebar #add_member_upload").change(function(){
		
		readPictureURL(this, $(this).attr("name"));
	});
	
	// detect if file has been selected in the 'member_profile_left_sidebar' file input
	$(".member_profile_left_sidebar #member_profile_upload").change(function(){
		
		readPictureURL(this, $(this).attr("name"));
	});
	
});

function readPictureURL(input, action) {  // action: 'add_member', 'member_profile', etc show in for uploading picture
	
    if (input.files && input.files[0]) {
    	
        var reader = new FileReader();

        reader.onload = function (e) {
        	
        	if(action.localeCompare("add_member") === 0){
        		
        		$(".add_member_left_sidebar .image img").attr('src', e.target.result);
        		
        	}else if(action.localeCompare("member_profile") === 0){
        		
        		$(".member_profile_left_sidebar .image img").attr('src', e.target.result);
        		
        	}else if(action.localeCompare("add_new_product") === 0){
        		
        		$("#add_new_product_block .image img").attr('src', e.target.result);
        	}
        	
            
        }

        reader.readAsDataURL(input.files[0]);
    }
}