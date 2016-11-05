<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script src="resources/javascript/products_sales.js"></script>
<title>Insert title here</title>
</head>
<body>
	<!-- THE WHOLE CONTENT OF PRODUCTS / SALES PAGE ------------------------------------------------------------------------------------------->
	<div class="products_content">

		<div id="left_products_block">

			<div id="admin_name">
				Admin User:
				<div id="admin_user_name">Tomas Mikoliunas</div>
			</div>

			<div id="add_new_product">
				Add New Product<input type="hidden" value="0" />
			</div>

			<div id="display_products">
				Display Products<input type="hidden" value="1" />
			</div>

			<div id="update_product">
				Update Product<input type="hidden" value="2" />
			</div>

			<!--<div id="view_sales">View Sales<input type="hidden" value="3" /></div>

			<div id="sales_details">Set Products Sales<input type="hidden" value="4" /></div>-->

		</div>

		<!-- RIGHT PRODUCTS BLOCK ----------------------------------------------------------------------------------------------------->
		<div id="right_products_block">
		
		<!-- ADD NEW PRODUCT BLOCK ---------------------------------------------------------------------------------------------------->
		<div id="add_new_product_block">

			<div>
				<span>Add New Product:</span>
			</div>
			<form>
				<div id="add_new_product_fields">

					<div class="image_block">
							<div class="image">
								<img src="resources/images/no_photo.png" alt="foto" />
							</div>

							
								<button type="button" class="upload_picture_button">Upload
									Picture</button>
							
							<input type="file" id="add_new_product_upload"
								name="add_new_product" />
					</div>
					<div>
						<label>Category:</label> 
				
						<div class="radio_buttons"><input type="radio" name="category" value="gymEquipments" /><div>Gym Equipments</div></div>
						<div class="radio_buttons"><input type="radio" name="category" value="accessories" /><div>Accessories</div></div>
						<div class="radio_buttons"><input type="radio" name="category" value="protein" checked/><div>Protein</div></div>
						
					</div>
					<div>
						<label>Product Name:</label> <input type="text"
							id="product_name" value="" autocomplete="off"
							placeholder="Please enter the Name..." />
					</div>
					<div>
						<label>Manufacturer:</label> <input type="text" id=manufacturer
							value="" autocomplete="off"
							placeholder="Manufacturer..." />
					</div>
					<div>
						<label>Price:</label> <input type="text" id="price"
							value="" autocomplete="off"
							placeholder="Please enter the Price..." />
					</div>
					<div>
						<label>Units in Stock:</label> <input type="text" id="stock"
							autocomplete="off" placeholder="Units in Stock..." />
					</div>
					<div>
						<label>Status:</label> 
						<div class="radio_buttons"><input type="radio" name="status" value="inactive" /><div>Inactive</div></div>
						<div class="radio_buttons"><input type="radio" name="status" value="active" /><div>Active</div></div>
					</div>
					
					<div id="product_description_block">
						<label>Product Description:</label>
						<textarea></textarea>
					</div>

				</div>

				<input type="submit" id="add_new_product_submit_button" value="Add New Product" />
			</form>
		</div>
		<!-- END OF 'add_new_product_block' -->

		<!-- DISPLAY PRODUCTS BLOCK ------------------------------------------------------------------->
			<div id="display_products_block">
				<div id="products_types">
					<input type="text" autocomplete="off"
						value="Please select products category...." disabled="disabled" /> <span
						style="display: none;" id="programme_id"></span> <img
						id="products_drop_down_arrow"
						src="resources/images/drop_down.png" alt="photo">
					<div id="products_dropdown">
						<div>
							1 Month Membership
							<p style="display: none;">1 Month Membership</p>
							<span style="display: none;">1</span>
						</div>
						<div>
							3 Months Membership
							<p style="display: none;">3 Months Membership</p>
							<span style="display: none;">2</span>
						</div>
						<div>
							6 Months Membership
							<p style="display: none;">6 Months Membership</p>
							<span style="display: none;">3</span>
						</div>
						<div>
							12 Months Membership
							<p style="display: none;">12 Months Membership</p>
							<span style="display: none;">4</span>
						</div>
						<div>
							Pay as You Go
							<p style="display: none;">Pay as You Go</p>
							<span style="display: none;">5</span>
						</div>
					</div>
				</div>
				
				<div id="products_displayed">
				
				<div class="product_info">
				
				
				</div>
				
				</div>
			</div>
			<!-- END OF 'display_products_block' -->

		<!-- ADD ADMIN BLOCK --------------------------------------------------------------->
		<div id="update_product_block">
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
						<label>Last Name:</label> <input type="text" id="admin_last_name"
							value="" autocomplete="off"
							placeholder="Please enter last name..." />
					</div>
					<div>
						<label>Username:</label> <input type="text" id="admin_username"
							value="" autocomplete="off"
							placeholder="Please enter username..." />
					</div>
					<div>
						<label>Email:</label> <input type="text" id="admin_email"
							autocomplete="off" placeholder="Please enter email..." />
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

				<input type="submit" id="add_admin_submit_button" value="Add Admin" />
			</form>
		</div>
		<!-- END OF 'add_admin_block' -->

		


		<!-- PRODUCTS SETTINGS BLOCK ------------------------------------------------------->
		<div id="products_settings_block"></div>
		<!-- END OF 'products_settings_block' -->

	</div>
	<!-- END OF 'right_settings_block' -->
	</div>

</body>
</html>