<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1">


<link href="resources/css/body.css" rel="stylesheet" type="text/css" />
<link href="resources/css/bottom_panel_blocks.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/add_member.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/member_profile.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/popup_windows.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/welcome_window.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/display_members.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/left_sidebar_content.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/dashboard.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/reports.css" rel="stylesheet" type="text/css" />
<link href="resources/css/calendar.css" rel="stylesheet" type="text/css" />
<link href="resources/css/products_sales.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/reports_big_table.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/settings.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/communications.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/send_email_window.css" rel="stylesheet"
	type="text/css" />
<link href="resources/css/sell_reserve.css" rel="stylesheet"
	type="text/css" />
	<link href="resources/css/to_do_list.css" rel="stylesheet"
	type="text/css" />


<!-- EXTRA CSS FOR 'dashboard.jsp' TEMPLATE 
<link href="resources/dashboard_template/styles.css" rel="stylesheet" type="text/css" />
<link href="resources/dashboard_template/nivo-slider.css" rel="stylesheet" type="text/css" media="screen" /> -->

<script type="text/javascript"
	src="resources/javascript/jquery-1.11.3.js"></script>

<script src="resources/javascript/global_variables.js"></script>
<script src="resources/javascript/useful_functions.js"></script>
<script src="resources/javascript/offers_handler.js"></script>
<script src="resources/javascript/add_update_member.js"></script>
<script src="resources/javascript/programmes.js"></script>

<script src="resources/javascript/bottom_panel.js"></script>
<script src="resources/javascript/member_profile.js"></script>
<script src="resources/javascript/search_member.js"></script>
<script src="resources/javascript/insert_recently_visited.js"></script>
<script src="resources/javascript/calendar.js"></script>
<script src="resources/javascript/popup_confirmation_windows.js"></script>
<script src="resources/javascript/delete_member.js"></script>
<script src="resources/javascript/tooltips.js"></script>
<script src="resources/javascript/visits_popup.js"></script>
<script src="resources/javascript/loading_content.js"></script>
<script src="resources/javascript/send_email.js"></script>
<script src="resources/javascript/sell_reserve.js"></script>
<script src="resources/javascript/charts.js"></script>
<script src="resources/javascript/file_upload.js"></script>
<script src="resources/javascript/loading_application.js"></script>

<script src="resources/javascript/to_do_list.js"></script>


<title>DashBoard</title>
</head>
<body>

    <div id="loading-mask">
            <div class="loading-img"><img src="" alt="MyPassionas" /></div>
    </div>
    
    <!------------------ ADMIN USER FOR CURRENT SESSION ----------------------------------------------------------------------------------------------->
	<div id="admin_user_session" style="display: none;">
		<input type="hidden" id="admin_id" value="${ adminUser.id }" /> 
		<input type="hidden" id="admin_firstName" value="${ adminUser.firstName }" /> 
		<input type="hidden" id="admin_lastName" value="${ adminUser.lastName }" />
	</div>

	<!------------------ WELCOME WINDOW --------------------------------------------------------------------------------------------------------------->
	<div class="welcome_window">
		<div class="welcome_block">
			<img id="logo_image" src="" /> <img
				id="loading_image" src="" />
			<h3>Loading...</h3>
		</div>
	</div>
	<!------------------ POP-UP WINDOW FOR SUCCESSFULLY ADDED/UPDATED/DELETED MEMBER PROFILE MESSAGE ------------------------------------------------------->
	<div class="popup_window"><img id='check_in_image' src='resources/images/membersImages/no_photo.jpg' /><div class="messages"></div></div>
	<!------------------ BACKGROUND OVERLAY, ON 'Delete Profile', 'All Settings', 'Remove Products' -------------------------------------------------------->
	<div class="confirm_window_background_overlay"></div>
	<!------------------ CONFIRM WINDOW ON ('Delete Profile', 'Remove Product') ---------------------------------------------------------------------------->
	<div class="confirm_window">
	
		<!-- specifies which submit button to be triggered on confirmation 'Yes' -->
		<input type="hidden" id="trigger_submit" value="" />
		
		<img class="top_image" src="resources/images/error.jpg" alt="confirm_image" />
		<span id="confirm_message"></span>
		<!--<div class="content">
			<div class="left_content">
				<img src="" alt="picture" />
			</div>
			<div class="right_content"></div>
		</div>-->
		<hr>
		<div>
			<button type="button" id="confirm_button">Yes</button>
			<button type="button" id="cancel_button">No</button>
		</div>
	</div>
	<!------------------ CONFIRM WINDOW WHEN UPDATING 'Programmes Details', 'Products Details' ------------------------------------------------------------->
	<div class="confirm_settings_window">
	
	    <!-- specifies which submit button to be triggered on confirmation 'Yes' -->
		<input type="hidden" id="trigger_submit" value="" />
		
	    <div class="top_image">
		    <img src="resources/images/error.jpg" alt="confirm_image" />
		    <div id="top_message"></div>
		</div>
		
		<div class="details_message"></div>
		
		<hr>
		<div>
			<button type="button" class="confirm_button">Yes</button>
			<button type="button" class="cancel_button">No</button>
		</div>
	</div>
	<!------------------ BACKGROUND OVERLAY, WHEN SHOWING 'add_member' or 'update_member' ------------------------------------------------------------------>
	<div class="background_overlay"></div>
	<!------------------ BACKGROUND OVERLAY, WHEN SHOWING 'visited dates times' ---------------------------------------------------------------------------->
	<div class="background_overlay_visits"></div>
	
	<!--==================================================================================================================================================-->
	<!------------------ CHECK-IN WINDOW ------------------------------------------------------------------------------------------------------------------->
	<div class="check_in_window">

		<form>

			<div class="top_panel"><label></label><input type="text" class="search_customer" placeholder="Search by ID or name..." /></div>

			<div class="middle_panel">
			<input type="hidden" id="member_id" value="" />
			   <div class="image">
			      <img src="resources/images/membersImages/no_photo.jpg"/>
			   </div>
			<div class="customer_names">
			     <div class="table_header"><table><tr><td class="first">ID</td><td class="second">Name</td><td class="third">Membership</td><td class="fourth">To Pay</td></tr></table></div>
			     <div class="table_body"><table></table></div>
			
			</div>
			
			
			</div>

			<div class="bottom_panel">
				<button type="button" class="back_button">Back</button>
			</div>

		</form>


	</div>
	
	<!--==================================================================================================================================================-->
	<!------------------ WINDOW ('Sell', 'Order', 'sell_reserve.css', 'sell_reserve.js' -------------------------------------------------------------------->
	<div class="window">

		<form>

			<div class="top_panel"><input type="text" class="search_customer" placeholder="Search by ID or name..."/></div>

			<div class="middle_panel">
			<input type="hidden" id="product_id" value="" />
			<div class="image">
			<img src="resources/images/productsImages/no_image.jpg"/>
			</div>
			<div class="customer_names">
			<div class="table_header"><table><tr><td class="first">Select</td><td class="second">Customer ID</td><td class="third">Name</td></tr></table></div>
			<div class="table_body"><table></table></div>
			
			</div>
			
			
			</div>

			<div class="bottom_panel">

				<div class="first_top"><div>Available:</div><span></span></div>
				<div class="second_top"><div>Qty:</div><input type="text" id="qty" value="1"/></div>
				<div class="first_bottom"><div>Unit Price €:</div><span></span></div>
				<div class="second_bottom"><div>Total Price €:</div><span></span></div>
				
				<input type="submit" class="sell_button" value="Sell"/>
				<input type="submit" class="reserve_button" value="Reserve"/>
				<button type="button" class="cancel_button">Cancel</button>
				



			</div>

		</form>


	</div>
	
	
	<!------------------ ERROR WINDOW ---------------------------------------------------------------------------------------------------------------------->
	<div class="error_background_overlay"></div>
	<div class="error_window"></div>
	
	<!--==================================================================================================================================================-->
	<!------------------ POPUP TO SHOW VISITED DATES AND TIMES WHEN CLICKED ON 'Visits' COLUMN ---------------->
	<div class="popup_visits">                          <!-- <img src="resources/images/exit_window.jpg" /> 	 -->
	<div class="popup_visits_header"><div class="exit_popup"></div><table><tr><td colspan="3" id="visitor_name"></td></tr>
	                                        <tr><td id="visited_date">Visited Date</td><td id="visited_time">Visited Time</td>
	                                        <td id="week_day">Week Day</td></tr></table></div>
	<div class="popup_visits_body"><table></table></div>
	</div>
	
	<!-- =========================================================================================================== -->
	<!------------------ SEND EMAIL WINDOW -------------------------------------------------------------------->
	<div class="send_email_window">
	<form method="post" action="sendEmail/sendo" enctype="multipart/form-data">
		<div id="recipients">
			<label>Recipients:</label><select name="recipients" multiple ></select>
		</div>
		<div id="subject">
			<label>Subject:</label><input type="text" id="subject_field" name="subject"/>
		</div>
		<div id="from_email">
			<label>From Email:</label><input type="text" />
		</div>

		<div id="text_area_block">
			<textarea name="message"></textarea>
		</div>
		<div id="attachments_area">
			
		</div>
		<div id="bottom_panel">
			<button type="button" id="add_attachment_button">Add
				Attachment</button>
			<button type="button" id="remove_attachment_button">Remove
				Attachment</button>
			<input type="file" id="email_attachment_upload" name="emailAttachment" size="60" />
 			
			<button type="submit" id="send_email_button">Send Email</button>
			<button type="button" id="cancel_email_button">Cancel Email</button>
		</div>
	</form>
	</div>
	<!-- =========================================================================================================== -->
	
	<!----------------------------- MEMBER PROFILE PANEL ------------------------------------------------------>
	<div class="member_profile_panel">
		<div class="member_profile_top_panel">
			<h1>Member Profile</h1>
		</div>

		<!-- member profile content --------------------------------->
		<div class="member_profile_content">

			<form>

				<!-- member profile left sidebar -------------------->
				<div class="member_profile_left_sidebar">

					<div class="image">
						<img src="resources/images/membersImages/no_photo.jpg" alt="foto" />
					</div>

					<div id="take_photo">
						<button type="button" name="take_photo" style="display:none;" class="photo_button">New
							Photo</button>
						<button type="button" name="take_photo" class="shoot_button">Take
							a Snapshot</button>
						<button type="button" class="upload_picture_button">Upload
							Picture</button>
					</div>
					<input type="file" id="member_profile_upload" name="memberProfileImage"/>
					<div id="generate_code">
						<button type="button" name="generate_code" class="generate_button">Generate
							Barcode</button>
					</div>
				</div>

				<!-- member profile right sidebar ------------------->
				<div class="member_profile_right_sidebar">

					<!-- first block -------------------------------->
					<div id="first_block">
						<div class="member_data">
							<span>Member ID:</span><label id="id_label"></label> <input type="hidden"
								id="member_id" name="memberId" value="" /> <input
								type="hidden" id="action" value="update_member" /> <input
								type="hidden" name="membership_to_before_update"
								id="membership_to_before_update" value="" />
						</div>
						<div class="member_data">
							<span>First Name:</span><input id="first_name" type="text" autocomplete="off"
								name="firstName" value="" disabled="disabled"
								placeholder="enter First Name here.." />
						</div>
						<div class="member_data">
							<span>Last Name:</span> <input id="last_name" type="text" autocomplete="off"
								name="lastName" value="" disabled="disabled"
								placeholder="enter Last Name here.." />
						</div>
						<div class="member_data">
							<span>Address:</span> <input id="address" type="text" autocomplete="off"
								name="address" value="" disabled="disabled"
								placeholder="enter Address here.." />
						</div>
						<div class="member_data">
							<span>Phone No.:</span> <input id="ph_number" type="text" autocomplete="off"
								name="phNumber" value="" disabled="disabled"
								placeholder="enter Ph.No. here.." />
						</div>
						<div class="member_data">
							<span>Date of Birth:</span> <input id="date_of_birth" type="text" autocomplete="off"
								name="dateOfBirth" value="" disabled="disabled"
								placeholder="e.g. format '01-06-2016'" />
						</div>
					</div>
					<!-- end of 'first block' ------------------------------------->

					<!-- second block --------------------------------------------->
					<div id="second_block">
						<div class="member_data">
							<span>Email:</span> <input id="email" type="text" name="email" autocomplete="off"
								value="" disabled="disabled"
								placeholder="e.g. format 'tomas@gmail.com'" />
						</div>
						
						<div class="member_data">
						    <input type="hidden" id="programme_id" />
							<span>Programme:</span> <input id="programme" type="text" autocomplete="off"
								name="programme" value="" disabled
								placeholder="Select Membership programme.."/>
								<img id="programme_drop_down_arrow" src="resources/images/drop_down.png" alt="photo">
							<div id="programme_type">
							    <div>'Pay as You Go'<span style="display: none;">'Pay as You Go'</span><p style="display: none;">0</p><input type="hidden" id="prog_id" value="5" /></div>
								<div>'1 Month Membership'<span style="display: none;">'1 Month Mbsh'</span><p style="display: none;">31</p><input type="hidden" id="prog_id" value="1" /></div>
								<div>'3 Months Membership'<span style="display: none;">'3 Months Mbsh'</span><p style="display: none;">92</p><input type="hidden" id="prog_id" value="2" /></div>
								<div>'6 Months Membership'<span style="display: none;">'6 Months Mbsh'</span><p style="display: none;">184</p><input type="hidden" id="prog_id" value="3" /></div>
								<div>'12 Months Membership'<span style="display: none;">'12 Months Mbsh'</span><p style="display: none;">365</p><input type="hidden" id="prog_id" value="4" /></div>
							</div>
						</div>
						<div class="member_data">
							<span>From:</span> <input id="from" type="text" name="membershipFrom" autocomplete="off"
								value="" disabled
								placeholder="e.g. format '01-06-2016'" />
						</div>
						<div class="member_data">
							<span>To:</span> <input id="to" type="text" name="membershipTo" autocomplete="off"
								disabled placeholder="e.g. format '01-06-2016'" />
						</div>
						<div class="member_data">
							<span>To Pay €:</span> <input id="price" type="text" name="price" value="0" disabled
						placeholder="price..." /><span id="profile_discount" style="display:none;"> - (<i style ="color: #ffffff; font-weight: bold;">0%</i>) =</span>
						<input id="paid" type="text" name="paid" />
						<input id="to_pay" type="hidden" name="toPay" />
						</div>
						<div class="member_data">
							<span>Joined on:</span> <input id="date_joined" type="text" autocomplete="off"
								name="dateJoined" value="" disabled="disabled"
								placeholder="e.g. format '01-06-2015'" />
						</div>
					</div>
					<!------ end of 'second block' ------------------------------->

					<!------ bottom update panel --------------------------------->
					<div id="bottom_update_panel">
						<button type="button" id="cancel_update" name="cancel_update">Cancel</button>
						<button type="submit" id="submit_update" name="submit_update">Submit</button>
					</div>
					<!------ end of 'bottom_update_panel' ------------------------>



				</div>
				<!-------------- end of 'member_profile_right_sidebar' --------------->

				<!---------- member profile membership details table block ------->
				<div id="membership_details_table_block">

					<div id="table_header">
						<table>
							<tr id="header_row">
								<td id="first_column">Programme</td>
								<td id="second_column">Start Date</td>
								<td id="third_column">End Date</td>
								<td id="fourth_column">Paid</td>
								<td id="fifth_column">Due Pay</td>
								<td id="sixth_column">State</td>
							</tr>
						</table>
					</div>

					<div id="table_body">
						<table>
							
						</table>
					</div>

				</div>
				<!---------- end of 'membership_details_table_block -------------->

			</form>
		</div>
		<!------------------ end of 'member_profile_content' --------------------->

		<!------------------ member profile bottom panel ------------------------->
		<div class="member_profile_bottom_panel">
			<button type="button" id="update_button" name="update_button">Click To
				Update</button>
			<button type="button" id="delete_button" name="delete_button">Delete
				Profile</button>
			<button type="button" id="confirm_delete_button"></button>
			<button type="button" id="back_button" name="back_button"><<<
				Back</button>
		</div>
		<!------------------ end of 'member_pfofile_bottom_panel ----------------->
	</div>
	<!-------------------------- END OF MEMBER PROFILE PANEL ---------------------------------------------------->

	<!------------------ ADD MEMBER CONTENT ---------------------------------------------------------------------------------------------------------------->
	<div class="add_member_content">
		<form enctype="multipart/form-data">
			<div class="add_member_top_panel">
				<h1>New Member</h1>
				<h3>Please fill out the form:</h3>
			</div>
			<hr>
			<div class="add_member_left_sidebar">
				<div class="image">
					<img src="resources/images/membersImages/no_photo.jpg" alt="foto" />
				</div>
				
				<div id="take_photo">
					<button type="button" name="take_photo" style="display:none;" class="photo_button">New
						Photo</button>
					<button type="button" name="take_photo" class="shoot_button">Take
						a Snapshot</button>
                    <button type="button" class="upload_picture_button">Upload Picture</button>
				</div>
				<input type="file" id="add_member_upload" name="newMemberImage"/>
				<div id="generate_code">
					<button type="button" name="generate_code" class="generate_button">Generate
						Barcode</button>
				</div>
			</div>

			<div class="add_member_right_sidebar">
				<input type="hidden" id="action" value="new_member" />
				<input type="hidden" id="member_id" value="" />
				<div class="add_member_data">
					<span>First Name:<strong style="color: red;"> *</strong></span>  
					 <input id="first_name" name="firstName" type="text" placeholder="enter First Name here.." autofocus />
				</div>
				<div class="add_member_data">
					<span>Last Name:<strong style="color: red;"> *</strong></span> <input
						id="last_name" name="lastName" type="text" name="lastName"
						placeholder="enter Last Name here.." />
				</div>
				<div class="add_member_data">
					<span>Email:<strong style="color: red;"> *</strong></span> <input id="email" type="text" name="email"
						placeholder="e.g. format 'tomas@gmail.com'" />
				</div>
				<div class="add_member_data">
				            <input type="hidden" id="programme_id" />
							<span>Programme:<strong style="color: red;"> *</strong></span> <input id="programme" type="text" autocomplete="off"
								name="programme" value="" disabled
								placeholder="e.g. select programme.."/>
								<img id="programme_drop_down_arrow" src="resources/images/drop_down.png" alt="photo">
							<div id="programme_type">
							    <div>'Pay as You Go'<span style="display: none;">'Pay as You Go'</span><p style="display: none;">0</p><label style="display: none;">5</label></div>
								<div>'1 Month Membership'<span style="display: none;">'1 Month Mbsh'</span><p style="display: none;">31</p><label style="display: none;">1</label></div>
								<div>'3 Months Membership'<span style="display: none;">'3 Months Mbsh'</span><p style="display: none;">92</p><label style="display: none;">2</label></div>
								<div>'6 Months Membership'<span style="display: none;">'6 Months Mbsh'</span><p style="display: none;">184</p><<label style="display: none;">3</label></div>
								<div>'12 Months Membership'<span style="display: none;">'12 Months Mbsh'</span><p style="display: none;">365</p><label style="display: none;">4</label></div>
							</div>
						</div>
				<div class="add_member_data">
					<span>From:</span> <input id="from" type="text" disabled
						name="membershipFrom" placeholder="e.g. format '01-06-2016'" />
				</div>
				<div class="add_member_data">
					<span>To:</span> <input id="to" type="text" name="membershipTo" disabled
						placeholder="e.g. format '01-06-2016'" />
				</div>
				<div class="add_member_data">
					<span>To Pay €:</span> <input id="price" type="text" name="price" value="0" disabled
						placeholder="price..." /> - (<i style ="color: #ffffff; font-weight: bold;">0%</i>) =
						<input id="paid" type="text" name="paid" value="0"
						placeholder="Paid.." />
						<input id="to_pay" type="hidden" name="toPay" />
				</div>
				<div class="add_member_data">
					<span>Date of Birth:</span> <input id="date_of_birth" type="text"
						name="dateOfBirth" placeholder="e.g. format '01-06-2016'" />
				</div>
				<div class="add_member_data">
					<span>Address:</span> <input id="address" type="text"
						name="address" placeholder="enter Address here.." />
				</div>
				<div class="add_member_data">
					<span>Phone No.:</span> <input id="ph_number" type="text"
						name="phNumber" placeholder="enter Ph.No. here.." />
				</div>
			</div>
			<!-- end right_sidebar -->
			<div class="show_error_message">
				<span style="font-size: 12px;"><strong
					style="color: red; font-size: 18px;">*</strong> - mandatory fields</span>
			</div>
			<div class="add_member_bottom_panel">
				<hr>
				<button type="submit" id="submit_add_member"
					name="submit_add_member">Submit</button>
				<button type="button" id="back_button" name="back_button"><<<
					Back</button>
			</div>
		</form>
		<!-- end form -->
	</div>
	<!-- end content -->
	<!----------------------------- END OF ADD MEMBER CONTENT --------------------------------------------------->
	

	<!-------------------------- TOP PANEL ------------------------------------------------------------------------>
	<div class="top_panel">
		<span class="total_members_count"></span><div id="description_middle_top_panel"></div><div class="search" id=""><input
			type="text" name="search_text" id="search_text"
			placeholder="Type ID or name..." /></div>
	</div>
	<!-------------------------- END OF TOP PANEL ----------------------------------------------------------------->

	<!-------------------------- LEFT SIDE BAR -------------------------------------------------------------------->
	<div class="left_sidebar">

		<div class="buttons_block">
			<div class="left_block">
				<button type="button" id="dashboard">DashBoard</button>
				<button type="button" id="reports">Reports</button>
				<button type="button" id="communication">Communication</button>
				<button type="button" id="sales">Products / Sales</button>
				<button type="button" id="settings">Settings</button>
				<!--<button type="button" id="help">Help</button>-->
			</div>
			<div class="right_block">
				<button type="button" id="add_member">Add Member</button>
				<button type="button" id="display_members">Display Members</button>
				<button type="button" id="check_in">Check-in</button>
			</div>
		</div>

		<!------------------ LAST ATTENDED MEMBER ---------------------------------------------------------------->
		<div class="last_attended_member">
			<div class="image"><img src="resources/images/membersImages/no_photo.jpg" alt="foto" /></div> <label
				id="last_visited_today">Last attended member:</label>
			<div id="name">
				<input type="hidden" id="member_id" value="" /> <span>Name:</span>
				<label id="full_name"></label>
			</div>
			<div id="time">
				<span>Visited On:</span> <label id="date_visited"></label> <label
					id="at">at</label><label id="time_visited"></label>
			</div>
			<div id="membership">
				<span>Membership until:</span> <label id="membership_status">
				</label><label id="membership_status_days_left"> </label>
			</div>
			<label id="full_attendance"></label>
		</div>
		<!------------------- RECENTLY BOOKED MEMBERSHIP ----------------------------------------------------------->
		<div class="last_updated_member">
			<div class="image"><img src="resources/images/membersImages/no_photo.jpg" alt="foto" /></div> <label
				id="last_updated">Recently booked membership:</label>
			<div id="name">
				<input type="hidden" id="member_id" value="" /> <span>Name:</span>
				<label id="full_name"> </label>
			</div>
			<div id="time">
				<span>Booked on:</span> <label id="date_updated"></label><label
					id="at">paid €:</label><label id="paid_membership"> </label>
			</div>
			<div id="membership">
				<span>Membership until:</span> <label id="membership_status">

				</label><label id="membership_status_days_left"> </label>
			</div>
			<label id="show_all_updated_memberships">Show all booked
				memberships</label>
		</div>
		<!------------------- RECENTLY JOINED MEMBER ------------------------------------------------------------->
		<div class="recently_joined_member">
			<div class="image"><img src="resources/images/membersImages/no_photo.jpg" alt="foto" /></div> <label
				id="recently_joined">Recently joined:</label>
			<div id="name">
				<input type="hidden" id="member_id" value="" /> <span>Name:</span>
				<label id="full_name"> </label>
			</div>
			<div id="time">
				<span>Joined on:</span> <label id="date_updated"> </label><label
					id="at">paid €:</label><label id="paid_membership"> </label>
			</div>
			<div id="membership">
				<span>Membership until:</span> <label id="membership_status">

				</label><label id="membership_status_days_left"></label>
			</div>
			<label id="show_all_recently_joined">Show all joined</label>
		</div>
	</div>
	<!----------------------- END OF LEFT SIDEBAR ---------------------------------------------------------------->

	<!----------------------- LOADING CONTENT -------------------------------------------------------------------->

	<div class="loading_content">

		

	</div>

	<!----------------------- END OF LOADING CONTENT ------------------------------------------------------------->
	<!----------------------- BOTTOM PANEL ----------------------------------------------------------------------->
	<div class="bottom_panel">

		<div class="reports">
			<div class="today_visits" >
				<label id="today_visits">Today's visits:</label> <label
					id="num_visits"> </label>
			</div>
		</div>
		<div class="reports">
			<div id="programme_booked">
				<div><p class="programme">'1 Month Mbsh'</p><p><span class="first_span"></span><span class="second_span"></span></p></div>
				<div><p class="programme">'3 Months Mbsh'</p><p><span class="first_span"></span><span class="second_span"></span></p></div>
				<div><p class="programme">'6 Months Mbsh'</p><p><span class="first_span"></span><span class="second_span"></span></p></div>
				<div><p class="programme">'12 Months Mbsh'</p><p><span class="first_span"></span><span class="second_span"></span></p></div>
				<div><p class="programme">'Pay as You Go'</p><p><span class="first_span"></span><span class="second_span"></span></p></div>
			</div>
			<div class="programmes_booked">
				<label id=""><span>Programmes</span> booked:</label> 
			</div>
		</div>

		<div class="reports">
		    <div id="last_visitors">
		        <div><p class="number_weeks">24 Weeks<span style="display: none;">168</span></p><p><span class="first_span">235</span><span> visitors</span></p></div>
		        <div><p class="number_weeks">12 Weeks<span style="display: none;">84</span></p><p><span class="first_span">235</span><span> visitors</span></p></div>
		        <div><p class="number_weeks">8 Weeks<span style="display: none;">56</span></p><p><span class="first_span">235</span><span> visitors</span></p></div>
		        <div><p class="number_weeks">4 Weeks<span style="display: none;">28</span></p><p><span class="first_span">235</span><span> visitors</span></p></div>
		        <div><p class="number_weeks">2 Weeks<span style="display: none;">14</span></p><p><span class="first_span">235</span><span> visitors</span></p></div>
		        <div><p class="number_weeks">1 Week<span style="display: none;">7</span></p><p><span class="first_span">235</span><span> visitors</span></p></div>
		    </div>
			<div class="last_visitors">
				<label id="show_last_visitors">Show visitors for last:</label>
			</div>
		</div>

		<div class="reports">
			<div class="most_visited_days">
				<ul>
					<li>12 Weeks<input type="hidden" value="84" /></li>
					<li>8 Weeks<input type="hidden" value="56" /></li>
					<li>4 Weeks<input type="hidden" value="28" /></li>
					<li>2 Weeks<input type="hidden" value="14" /></li>
					<li>1 Week<input type="hidden" value="7" /></li>
				</ul>
				<label id="most_visited_days">Most visited days for last:</label>
			</div>
		</div>

	</div>
	<!--------------------- END OF BOTTOM PANEL ------------------------------------------------------------------>
	
	<!------------------------- END OF MAIN CONTAINER ---------------------------------------------------------------->

</body>
</html>