<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<meta charset="utf-8">
      <title></title>
      <script src="resources/javascript/communications.js"></script>
   </head>
   <body>
       <!-- THE WHOLE CONTENT OF SETTING PAGE ------------------------------------------------------------------------------------------->
	<div class="communications_content">
	
		<div id="left_communications_block">

			<div id="admin_name">
				Admin User:
				<div id="admin_user_name">Tomas Mikoliunas</div>
			</div>

			<div id="show_messages">Show Messages<input type="hidden" value="1" /></div>
			
			<div id="leave_message">Leave Admin Message<input type="hidden" value="2" /></div>
			
			<div id="email_members">Email All Members<input type="hidden" value="3" /></div>

			<div id="membership_details">Set Programmes Prices<input type="hidden" value="4" /></div>

			<div id="sales_details">Set Products Sales<input type="hidden" value="5" /></div>

		</div>
		
		<!-- RIGHT COMMUNICATIONS BLOCK ----------------------------------------------------------------------------------------------------->
		<div id="right_communications_block">

			<!-- SHOW MESSAGES BLOCK ----------------------------------------------------------->
			<div id="show_messages_block"></div>

			<!-- LEAVE MESSAGE BLOCK ----------------------------------------------------------->
			<div id="leave_message_block">
			
			<div id="communications_table_header_block">
					<table id="communications_table_header">
						<tr>
							<td id="first_column">Select All<br><input type="checkbox" id="checkboxes_check_all"></td>
							<td id ="second_column">Name</td>
							<td id="third_column">Joined On:</td>
						</tr>

					</table>
				</div>
				<div id="communications_admin_table_body_block">
					<table id="communications_table_body"></table>
				</div>
				
				<div id="leave_admin_message_block">
				<label>Leave a message for selected Admins:</label>
				<textarea></textarea>
				</div>
				
				<button type="button" id="leave_message_button">Leave a Message</button>
			
			</div>

			<!-- EMAIL MEMBERS BLOCK ----------------------------------------------------------->
			<div id="email_members_block">

				<div id="communications_table_header_block">
					<table id="communications_table_header">
						<tr>
							<td id="first_column">Select All<br><input type="checkbox" id="checkboxes_check_all"></td>
							<td id ="second_column">Name</td>
							<td id="third_column">Email</td>
						</tr>

					</table>
				</div>
				<div id="communications_table_body_block">
					<table id="communications_table_body"></table>
				</div>
				
				<button type="button" id="compose_email_button">Compose Email</button>
				
			</div><!-- end of 'email_members_block' -->

		<!-- ADMIN BLOCK ------------------------------------------------------------------->
		<div id="admin_communications_block">
		
		</div><!-- END OF 'admin_settings_block' -->
		
		<!-- ADD ADMIN BLOCK --------------------------------------------------------------->
		<div id="add_admin_block">
				<div>
					<span>Add New Admin:</span>
				</div>
				<form>
					<div id="add_admin_fields">

						<div>
							<label>First Name:</label> <input type="text"
								id="admin_first_name" value="" autocomplete="off"
								placeholder="Please enter first name..." />
						</div>
						<div>
							<label>Last Name:</label> <input type="text"
								id="admin_last_name" value="" autocomplete="off"
								placeholder="Please enter last name..." />
						</div>
						<div>
							<label>Username:</label> <input type="text"
								id="admin_username" value="" autocomplete="off"
								placeholder="Please enter username..." />
						</div>
						<div>
							<label>Email:</label> <input type="text"
								id="admin_email" autocomplete="off" 
								placeholder="Please enter email..."/>
						</div>
						<div>
							<label>Password:</label> <input type="password"
								id="admin_password" autocomplete="off"
								placeholder="Please enter password..." />
						</div>
						<div>
							<label>Re-type Password:</label> <input type="password"
								id="admin_retype_password" autocomplete="off"
								placeholder="Re-type password..." />
						</div>

					</div>

					<input type="submit" id="add_admin_submit_button"
						value="Add Admin" />
				</form>
			</div><!-- END OF 'add_admin_block' -->
		
		<!-- ADD PROGRAMME BLOCK ----------------------------------------------------------->
			<div id="add_programme_block">
			    <div>
					 <span>Add New Programme:</span>
				</div>
				<form>
					<div id="add_programme_final_price">
						<label>Final Price €:</label> <span>0.00</span>
					</div>
					<div id="add_programme_settings_fields">
					
					<div>
					    <label>Programme Name:</label>
						<input type="text" id="programme_name" value="" autocomplete="off" placeholder="Please enter name..." />
					</div>
					<div>
					    <label>Programme Price €:</label>
						<input type="text" id="programme_price" value="" autocomplete="off" placeholder="Please enter amount..." />
					</div>
					<div>
					    <label>Discount Price €:</label>
						<input type="text" id="programme_discount" value="" autocomplete="off" placeholder="Please enter discount..." />
					</div>
					<div>
					    <label>Discount Percentage (%):</label>
						<input type="text" id="programme_discount_percentage" disabled="disabled" value="0" />
					</div>
					<div>
					    <label>Promotion Start Date:</label>
						<input type="text" id="promotion_start_date" autocomplete="off" placeholder="Please enter date..."/>
					</div>
					<div>
					    <label>Promotion End Date:</label>
						<input type="text" id="promotion_end_date" autocomplete="off" placeholder="Please enter date..."/>
					</div>
					<div id="programme_description_block">
					    <label>Programme Description:</label>
						<textarea></textarea>
					</div>
					<div id="programme_promotion_description_block">
					    <label>Programme Promotion Description:</label>
						<textarea></textarea>
					</div>
					
				</div>
				
				<input type="submit" id="add_programme_submit_button" value="Add Programme" />
				</form>

			</div><!-- END OF 'add_programme_block' -->

		<!-- PROGRAMMES SETTINGS BLOCK ----------------------------------------------------->
		<div id="programmes_settings_block">
		
		<form>
		   <div id="programmes_settings_types">
				<input  type="text" autocomplete="off" value="Please select programme...." disabled="disabled"/>
				                <span style="display: none;" id="programme_id"></span>
								<img id="programmes_drop_down_arrow" src="resources/images/drop_down.png" alt="photo">
							<div id="programmes_settings_dropdown">
								<div>1 Month Membership<p style="display: none;">1 Month Membership</p><span style="display: none;">1</span></div>
								<div>3 Months Membership<p style="display: none;">3 Months Membership</p><span style="display: none;">2</span></div>
								<div>6 Months Membership<p style="display: none;">6 Months Membership</p><span style="display: none;">3</span></div>
								<div>12 Months Membership<p style="display: none;">12 Months Membership</p><span style="display: none;">4</span></div>
								<div>Pay as You Go<p style="display: none;">Pay as You Go</p><span style="display: none;">5</span></div>
							</div>
			</div>
			<div id="programme_final_price">
			<label>Final Price €:</label>
			<span>0.00</span>
			</div>
				<div id="programmes_settings_fields">
				
					<div>
					    <label>Programme Price €:</label>
						<input type="text" id="programme_price" value="" autocomplete="off" placeholder="Please enter amount..." />
					</div>
					<div>
					    <label>Discount Price €:</label>
						<input type="text" id="programme_discount" value="" autocomplete="off" placeholder="Please enter discount..." />
					</div>
					<div>
					    <label>Discount Percentage (%):</label>
						<input type="text" id="programme_discount_percentage" disabled="disabled" value="0" />
					</div>
					<div>
					    <label>Promotion Start Date:</label>
						<input type="text" id="promotion_start_date" autocomplete="off" placeholder="Please enter date..." />
					</div>
					<div>
					    <label>Promotion End Date:</label>
						<input type="text" id="promotion_end_date" autocomplete="off" placeholder="Please enter date..." />
					</div>
					<div id="programme_description_block">
					    <label>Programme Description:</label>
						<textarea></textarea>
					</div>
					<div id="programme_promotion_description_block">
					    <label>Programme Promotion Description:</label>
						<textarea></textarea>
					</div>
					
				</div>
				
				<input type="submit" id="programme_settings_submit_button" value="Update" />
		</form>	
		</div><!-- END OF 'programmes_settings_block' -->
		
		<!-- PRODUCTS SETTINGS BLOCK ------------------------------------------------------->
		<div id="products_settings_block">
		
		</div><!-- END OF 'products_settings_block' -->
		
		</div><!-- END OF 'right_communications_block' -->
	</div>
   </body>
</html>