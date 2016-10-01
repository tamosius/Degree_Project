<%@ page language="java" contentType="text/html; charset=UTF-8"%>
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
<link href="resources/css/delete_member.css" rel="stylesheet"
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

<!-- EXTRA CSS FOR 'dashboard.jsp' TEMPLATE 
<link href="resources/dashboard_template/styles.css" rel="stylesheet" type="text/css" />
<link href="resources/dashboard_template/nivo-slider.css" rel="stylesheet" type="text/css" media="screen" /> -->

<script type="text/javascript"
	src="resources/javascript/jquery-1.11.3.js"></script>
<script src="resources/javascript/add_update_member.js"></script>

<script src="resources/javascript/bottom_panel.js"></script>
<script src="resources/javascript/member_profile.js"></script>
<script src="resources/javascript/search_member.js"></script>
<script src="resources/javascript/insert_recently_visited.js"></script>
<script src="resources/javascript/calendar.js"></script>

<script src="resources/javascript/products_sales.js"></script>
<script src="resources/javascript/delete_member.js"></script>
<script src="resources/javascript/tooltips.js"></script>
<script src="resources/javascript/visits_popup.js"></script>
<script src="resources/javascript/loading_content.js"></script>
<script src="resources/javascript/swfobject.js"></script>
<script src="resources/javascript/scriptcam.js"></script>


<title>DashBoard</title>
</head>
<body>
	<!------------------ WELCOME WINDOW --------------------------------------------------------------------------------------------------------------->
	<div class="welcome_window">
		<div class="welcome_block">
			<img id="logo_image" src="resources/images/sparta.jpg" /> <img
				id="loading_image" src="resources/images/loading3.jpg" />
			<h3>Loading...</h3>
		</div>
	</div>
	<!------------------ POP-UP WINDOW FOR SUCCESSFULLY ADDED/UPDATED/DELETED MEMBER PROFILE MESSAGE ------------------------------------------------------->
	<div class="popup_window"></div>
	<!------------------ BACKGROUND OVERLAY, ON PRESS 'delete' BUTTON (confirm) ---------------------------------------------------------------------------->
	<div class="confirm_window_background_overlay"></div>
	<!------------------ CONFIRM WINDOW WHEN (deleting member, updating details, etc) ---------------------------------------------------------------------->
	<div class="confirm_window">
		<img src="resources/images/error.jpg" alt="confirm_image" /><span
			id="confirm_message"></span>
		<hr>
		<div>
			<button type="button" id="confirm_button">Yes</button>
			<button type="button" id="cancel_button">No</button>
		</div>
	</div>
	<div class="confirm_settings_window">
	    <div class="top_image">
		    <img src="resources/images/error.jpg" alt="confirm_image" width="50px;" height="50px;"/>
		    <div id="top_message"> - Are you sure you want to update the following? :</div>
		</div>
		
		<div class="details_message"></div>
		
		<hr>
		<div>
			<button type="button" id="confirm_button">Yes</button>
			<button type="button" id="cancel_button">No</button>
		</div>
	</div>
	<!------------------ BACKGROUND OVERLAY, WHEN SHOWING 'add_member' or 'update_member' ------------------------------------------------------------------>
	<div class="background_overlay"></div>
	<!------------------ BACKGROUND OVERLAY, WHEN SHOWING 'visited dates times' ---------------------------------------------------------------------------->
	<div class="background_overlay_visits"></div>
	<!------------------ ERROR WINDOW ---------------------------------------------------------------------------------------------------------------------->
	<div class="error_window"></div>
	<!------------------ POPUP TO SHOW VISITED DATES AND TIMES WHEN CLICKED ON 'Visits' COLUMN ---------------->
	<div class="popup_visits">                          <!-- <img src="resources/images/exit_window.jpg" /> 	 -->
	<div class="popup_visits_header"><div class="exit_popup"></div><table><tr><td colspan="3" id="visitor_name"></td></tr>
	                                        <tr><td id="visited_date">Visited Date</td><td id="visited_time">Visited Time</td>
	                                        <td id="week_day">Week Day</td></tr></table></div>
	<div class="popup_visits_body"><table></table></div>
	</div>
	
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
					<script language="JavaScript">
			
		</script>

	<!--   	<div style="width: 330px; float: left;">
			<div id="webcam"></div>
			<div style="margin: 5px;">
				<img src="webcamlogo.png" style="vertical-align: text-top" /> <select
					id="cameraNames" size="1" onChange="changeCamera()"
					style="width: 245px; font-size: 10px; height: 25px;">
				</select>
			</div>
		</div>
		<div style="width: 135px; float: left;">
			<p>
				<button class="btn btn-small" id="btn1" onclick="base64_tofield()">Snapshot
					to form</button>
			</p>
			<p>
				<button class="btn btn-small" id="btn2" onclick="base64_toimage()">Snapshot
					to image</button>
			</p>
		</div>
		<div style="width: 200px; float: left;">
			<p>
				<textarea id="formfield" style="width: 190px; height: 70px;"></textarea>
			</p>
			<p>
				<img id="image" style="width: 200px; height: 153px;" />
			</p>
		</div> -->
					<div id="take_photo">
						<button type="button" name="take_photo" id="photo_button">Update
							Photo</button>
						<button type="button" name="take_photo" id="shoot_button">Take
							a Snapshot</button>
					</div>
					<div id="generate_code">
						<button type="button" name="generate_code" id="generate_button">Generate
							Barcode</button>
					</div>
				</div>

				<!-- member profile right sidebar ------------------->
				<div class="member_profile_right_sidebar">

					<!-- first block -------------------------------->
					<div id="first_block">
						<div class="member_data">
							<span>Member ID:</span><label>1001</label> <input type="hidden"
								id="member_id" name="member_id" value="" /> <input
								type="hidden" id="action" value="update_member" /> <input
								type="hidden" name="membership_to_before_update"
								id="membership_to_before_update" value="" />
						</div>
						<div class="member_data">
							<span>First Name:</span><input id="first_name" type="text" autocomplete="off"
								name="first_name" value="" disabled="disabled"
								placeholder="enter First Name here.." />
						</div>
						<div class="member_data">
							<span>Last Name:</span> <input id="last_name" type="text" autocomplete="off"
								name="last_name" value="" disabled="disabled"
								placeholder="enter Last Name here.." />
						</div>
						<div class="member_data">
							<span>Address:</span> <input id="address" type="text" autocomplete="off"
								name="address" value="" disabled="disabled"
								placeholder="enter Address here.." />
						</div>
						<div class="member_data">
							<span>Phone No.:</span> <input id="ph_number" type="text" autocomplete="off"
								name="ph_number" value="" disabled="disabled"
								placeholder="enter Ph.No. here.." />
						</div>
						<div class="member_data">
							<span>Date of Birth:</span> <input id="date_of_birth" type="text" autocomplete="off"
								name="date_of_birth" value="" disabled="disabled"
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
							<span>Programme:</span> <input id="programme" type="text" autocomplete="off"
								name="programme" value="" disabled="disabled"
								placeholder="e.g. '3 Months Mbsh'"/>
								<img id="programme_drop_down_arrow" src="resources/images/drop_down.png" alt="photo">
							<div id="programme_type">
							    <div>'Pay as You Go'<span style="display: none;">'Pay as You Go'</span><p style="display: none;">31</p></div>
								<div>'1 Month Membership'<span style="display: none;">'1 Month Mbsh'</span><p style="display: none;">31</p></div>
								<div>'3 Months Membership'<span style="display: none;">'3 Month Mbsh'</span><p style="display: none;">92</p></div>
								<div>'6 Months Membership'<span style="display: none;">'6 Month Mbsh'</span><p style="display: none;">184</p></div>
								<div>'12 Months Membership'<span style="display: none;">'12 Month Mbsh'</span><p style="display: none;">365</p></div>
							</div>
						</div>
						<div class="member_data">
							<span>From:</span> <input id="from" type="text" name="from" autocomplete="off"
								value="" disabled="disabled"
								placeholder="e.g. format '01-06-2016'" />
						</div>
						<div class="member_data">
							<span>To:</span> <input id="to" type="text" name="to" autocomplete="off"
								disabled="disabled" placeholder="e.g. format '01-06-2016'" />
						</div>
						<div class="member_data">
							<span>Paid €:</span> <input id="paid" type="text" name="paid" autocomplete="off"
								value="" disabled="disabled" placeholder="Paid.." />
						</div>
						<div class="member_data">
							<span>Joined on:</span> <input id="date_joined" type="text" autocomplete="off"
								name="date_joined" value="" disabled="disabled"
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
								<td id="fifth_column">Visits</td>
								<td id="sixth_column">State</td>
							</tr>
						</table>
					</div>

					<div id="table_body">
						<table>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
							<tr id="header_row">
								<td id="first_column">12 Months Mbsh</td>
								<td id="second_column">01-06-2016</td>
								<td id="third_column">01-06-2017</td>
								<td id="fourth_column">300</td>
								<td id="fifth_column">198</td>
								<td id="sixth_column">Active</td>
							</tr>
						</table>
					</div>

				</div>
				<!---------- end of 'membership_details_table_block -------------->

			</form>
		</div>
		<!------------------ end of 'member_profile_content' --------------------->

		<!------------------ member profile bottom panel ------------------------->
		<div class="member_profile_bottom_panel">
			<button type="button" id="update_button" name="update_button">Update
				Profile</button>
			<button type="button" id="delete_button" name="delete_button">Delete
				Profile</button>
			<button type="button" id="back_button" name="back_button"><<<
				Back</button>
		</div>
		<!------------------ end of 'member_pfofile_bottom_panel ----------------->
	</div>
	<!-------------------------- END OF MEMBER PROFILE PANEL ---------------------------------------------------->
	
	<!------------------ ADD MEMBER CONTENT ---------------------------------------------------------------------------------------------------------------->
	<div class="add_member_content">
		<form>
			<div class="add_member_top_panel">
				<h1>New Member</h1>
				<h3>Please fill out the form:</h3>
			</div>
			<hr>
			<div class="add_member_left_sidebar">
				<div id="image">
					<img src="resources/images/no_photo.png" alt="foto" />
				</div>
				<div id="photo_camera"></div>
				<div id="take_photo">
					<button type="button" name="take_photo" id="photo_button">New
						Photo</button>
					<button type="button" name="take_photo" id="shoot_button">Take
						a Snapshot</button>

				</div>
				<div id="generate_code">
					<button type="button" name="generate_code" id="generate_button">Generate
						Barcode</button>
				</div>
			</div>

			<div class="add_member_right_sidebar">
				<input type="hidden" id="action" value="new_member" />
				<input type="hidden" id="member_id" value="" />
				<div class="add_member_data">
					<span>First Name:<strong style="color: red;"> *</strong></span>  
					 <input id="first_name" type="text" placeholder="enter First Name here.." autofocus />
				</div>
				<div class="add_member_data">
					<span>Last Name:<strong style="color: red;"> *</strong></span> <input
						id="last_name" type="text" name="lastName"
						placeholder="enter Last Name here.." />
				</div>
				<div class="add_member_data">
					<span>Address:</span> <input id="address" type="text"
						name="address" placeholder="enter Address here.." />
				</div>
				<div class="add_member_data">
					<span>Phone No.:</span> <input id="ph_number" type="text"
						name="phNumber" placeholder="enter Ph.No. here.." />
				</div>
				<div class="add_member_data">
					<span>Date of Birth:</span> <input id="date_of_birth" type="text"
						name="dateOfBirth" placeholder="e.g. format '01-06-2016'" />
				</div>
				<div class="add_member_data">
					<span>Email:</span> <input id="email" type="text" name="email"
						placeholder="e.g. format 'tomas@gmail.com'" />
				</div>
				<div class="add_member_data">
					<span>From:</span> <input id="from" type="text"
						name="membershipFrom" placeholder="e.g. format '01-06-2016'" />
				</div>
				<div class="add_member_data">
					<span>To:</span> <input id="to" type="text" name="membershipTo"
						placeholder="e.g. format '01-06-2016'" />
				</div>
				<div class="add_member_data">
					<span>Programme:</span> <input id="programme" type="text"
						name="programme" placeholder="programme..." />
				</div>

				<div class="add_member_data">
					<span>Paid €:</span> <input id="paid" type="text" name="paid"
						placeholder="Paid.." />
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
		<span class="total_members_count"></span><div id="description_middle_top_panel"></div><div class="search"><input
			type="text" name="search_text" id="search_text"
			placeholder="Search Member..." /></div>
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
				<button type="button" id="help">Help</button>
			</div>
			<div class="right_block">
				<button type="button" id="add_member">Add Member</button>
				<button type="button" id="display_members">Display Members</button>
			</div>
		</div>

		<!------------------ LAST ATTENDED MEMBER ---------------------------------------------------------------->
		<div class="last_attended_member">
			<img src="resources/images/loading1.jpg" alt="foto" /> <label
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
			<img src="resources/images/loading1.jpg" alt="foto" /> <label
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
			<img src="resources/images/loading1.jpg" alt="foto" /> <label
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
				<div><p class="programme">'Other'</p><p><span class="first_span"></span><span class="second_span"></span></p></div>
			</div>
			<div class="no_membership_members">
				<label id=""><span>Programmes</span> booked:</label> <label id="no_membership_members"> </label> <label
					id="total"> </label> <label id="percentage_no_membership">
				</label>
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