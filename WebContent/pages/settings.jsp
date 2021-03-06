<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script src="resources/javascript/settings.js"></script>
</head>
<body>
    <!-- THE WHOLE CONTENT OF SETTING PAGE ------------------------------------------------------------------------------------------->
	<div class="settings_content">
	
		<div id="left_settings_block">

			<div id="admin_name">
				Admin User:
				<div id="admin_user_name">Tomas Mikoliunas</div>
			</div>

			<div id="admin_account_details">Admin Account Details<input type="hidden" value="0" /></div>
			
			<div id="add_admin">Add Admin<input type="hidden" value="1" /></div>
			
			<div id="add_programme">Add Programme<input type="hidden" value="2" /></div>

			<div id="membership_details">Set Programmes Prices<input type="hidden" value="3" /></div>

		</div>
		
		<!-- RIGHT SETTINGS BLOCK ----------------------------------------------------------------------------------------------------->
		<div id="right_settings_block">
		
		<!-- ADMIN BLOCK ------------------------------------------------------------------->
		<div id="admin_settings_block">
		
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
						<input type="text" class="promotion_start_date" autocomplete="off" placeholder="Please enter date..." />
					</div>
					<div>
					    <label>Promotion End Date:</label>
						<input type="text" class="promotion_end_date" autocomplete="off" placeholder="Please enter date..." />
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
		
		</div><!-- END OF 'right_settings_block' -->
	</div>

</body>
</html>