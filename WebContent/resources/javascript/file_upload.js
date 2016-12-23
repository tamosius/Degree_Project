
$(document).ready(function(){
	
	// 'Upload Picture' button is clicked in 'Add Member' window
	$(".add_member_left_sidebar .upload_picture_button").click(function(){
		
		
		$(".add_member_left_sidebar #add_member_upload").trigger("click");
	});
	
	// 'Upload Picture' button is clicked 'Member Profile' window
    $(".member_profile_left_sidebar .upload_picture_button").click(function(){
		
		
		$(".member_profile_left_sidebar #member_profile_upload").trigger("click");
	});
    
    // 'Add Attachment' button is clicked in 'Send Email' window
    $(".send_email_window #add_attachment_button").click(function(){
    	
    	$(".send_email_window #email_attachment_upload").trigger("click");
    });
	
/*========================================================================================*/
	// detect if file has been selected in the 'add_member_profile_left_sidebar' file input
	$(".add_member_left_sidebar #add_member_upload").change(function(){
		
		readPictureURL(this, $(this).attr("name"));
	});
	
	
	// detect if file has been selected in the 'member_profile_left_sidebar' file input
	$(".member_profile_left_sidebar #member_profile_upload").change(function(){
		
		readPictureURL(this, $(this).attr("name"));
	});
	
	// detect if file has been selected in the 'Email Window' 'Add Attachment' file input
	$(".send_email_window #email_attachment_upload").change(function(){
		
		readPictureURL(this, $(this).attr("name"));
	});
/*========================================================================================*/
	$("#remove_attachment_button").click(function(){
		
		$("#attachments_area").prepend("<img src='resources/images/no_photo.png' />");
	});
	
});

function readPictureURL(input, action) {  // action: 'add_member', 'member_profile', etc show in for uploading picture
	
    if (input.files && input.files[0]) {
    	
        var reader = new FileReader();

        reader.onload = function (e) {
        	
        	if(action.localeCompare("newMemberImage") === 0){
        		
        		$(".add_member_left_sidebar .image img").attr('src', e.target.result);
        		
        	}else if(action.localeCompare("memberProfileImage") === 0){
        		
        		$(".member_profile_left_sidebar .image img").attr('src', e.target.result);
        		
        	}else if(action.localeCompare("newProductImage") === 0){  // value from 'products_sales.js' file
        		
        		// display the picture in 'upload picture' section in 'Add New Product'
        		$("#add_new_product_block .image img").attr('src', e.target.result);
        		// display the picture in pop-up confirmation window
        		$(".confirm_settings_window .top_image img").attr("src", e.target.result);
        		// display picture in pop-up window after successfully completed
        		$(".popup_window #check_in_image").attr("src", e.target.result);
        	
        	}else if(action.localeCompare("updateProductImage") === 0){  // value from 'products_sales.js' file
        		
        		// display the picture in 'upload picture' section in 'Update'
        		$("#update_product_block .image img").attr('src', e.target.result);
        		// display the picture in pop-up confirmation window
        		$(".confirm_settings_window .top_image img").attr("src", e.target.result);
        		// display picture in pop-up window after successfully completed
        		$(".popup_window #check_in_image").attr("src", e.target.result);
        	
        	}else if(action.localeCompare("emailAttachment") === 0){
        		
        		$(".send_email_window #attachments_area").append("<img src='" + e.target.result + "' />"); //attr("src", e.target.result);
        		
        	}
        }
        reader.readAsDataURL(input.files[0]);
    }
}