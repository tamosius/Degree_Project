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
				<div id="admin_user_name"></div>
			</div>

			<div id="show_messages">Show Messages<input type="hidden" value="1" /></div>
			
			<div id="leave_message">Leave Admin Message<input type="hidden" value="2" /></div>
			
			<div id="email_members">Email All Members<input type="hidden" value="3" /></div>

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

		</div><!-- END OF 'right_communications_block' -->
		
	</div><!-- end of 'communications_content' -->
   </body>
</html>