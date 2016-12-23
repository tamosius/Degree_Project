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

			<div id="sold_product">
				Sold Products<input type="hidden" value="2" />
			</div>
			<div id="reserved_product">
				Reserved Products<input type="hidden" value="3" />
			</div>

			<!--<div id="view_sales">View Sales<input type="hidden" value="3" /></div>

			<div id="sales_details">Set Products Sales<input type="hidden" value="4" /></div>-->

		</div>

		<!-- RIGHT PRODUCTS BLOCK ----------------------------------------------------------------------------------------------------->
		<div id="right_products_block">
		
		
		<!--=========================================================================================================================-->
		<!-- ADD NEW PRODUCT BLOCK ---------------------------------------------------------------------------------------------------->
		<div id="add_new_product_block">

			<div>
				<span>Add New Product:</span>
			</div>
			<form>
				<div id="add_new_product_fields">

					<div class="image_block">
							<div class="image">
								<img src="resources/images/productsImages/no_image.jpg" alt="foto" />
							</div>

							
								<button type="button" class="upload_picture_button">Upload
									Picture</button>
							
							<input type="file" id="add_new_product_upload"
								name="newProductImage" />
					</div>
					<div>
							<label>Category:</label> 
							<select name="productCategory" id="productCategory">
								<option value="protein">Protein</option>
								<option value="vitamins">Vitamins</option>
								<option value="food supplement">Food Supplement</option>
								<option value="accessories">Accessories</option>
								<option value="gymEquipment">Gym Equipment</option>
							</select>
					</div>
					<div>
						<label>Product Name:</label> <input type="text"
							id="product_name" name="productName" autocomplete="off"
							placeholder="Please enter the Name..." />
					</div>
					<div>
						<label>Manufacturer:</label> <input type="text" id="manufacturer"
							name="productManufacturer" autocomplete="off"
							placeholder="Manufacturer..." />
					</div>
					<div>
						<label>Price:</label> <input type="text" id="price"
							name="productPrice" autocomplete="off"
							placeholder="Please enter the Price..." />
					</div>
					<div>
						<label>Units in Stock:</label> <input type="text" id="stock"
							name="unitsStock" autocomplete="off" placeholder="Units in Stock..." />
					</div>
					<div>
						<label>Status:</label> 
						<div class="radio_buttons"><input type="radio" name="status" value="inactive" /><div>Inactive</div></div>
						<div class="radio_buttons"><input type="radio" name="status" value="active" checked/><div>Active</div></div>
					</div>
					
					<div id="product_description_block">
						<label>Product Description:</label>
						<textarea name="productDescription"></textarea>
					</div>

				</div>
				<button type="button" id="add_new_product_submit_button">Add New Product</button>
				<input type="submit" id="confirm_add_new_product_submit_button" value="Add New Product" />
			</form>
		</div>
		<!-- END OF 'add_new_product_block' -->
		
		<!--========================================================================================================================-->
		<!-- UPDATE PRODUCT BLOCK ---------------------------------------------------------------------------------------------------->
		<div id="update_product_block">

			<div>
				<span>Update Product:</span>
			</div>
			<form>
				<div id="update_product_fields">

					<div class="image_block">
							<div class="image">
								<img src="resources/images/productsImages/no_image.jpg" alt="foto" />
							</div>

							
								<button type="button" class="upload_picture_button">Upload
									Picture</button>
							
							<input type="file" id="update_product_upload"
								name="updateProductImage" />
					</div>
					<div>
							<label>Category:</label> 
							<select name="productCategory" id="productCategory">
								<option value="protein">Protein</option>
								<option value="vitamins">Vitamins</option>
								<option value="food supplement">Food Supplement</option>
								<option value="accessories">Accessories</option>
								<option value="gym equipment">Gym Equipment</option>
							</select>
					</div>
					<div>
						<input type="hidden" id="product_id" name="productId" />
						<label>Product Name:</label> <input type="text"
							id="product_name" name="productName" autocomplete="off"
							placeholder="Please enter the Name..." />
					</div>
					<div>
						<label>Manufacturer:</label> <input type="text" id="manufacturer"
							name="productManufacturer" autocomplete="off"
							placeholder="Manufacturer..." />
					</div>
					<div>
						<label>Price:</label> <input type="text" id="price"
							name="productPrice" autocomplete="off"
							placeholder="Please enter the Price..." />
					</div>
					<div>
						<label>Units in Stock:</label> <input type="text" id="stock"
							name="unitsStock" autocomplete="off" placeholder="Units in Stock..." />
					</div>
					<div>
						<label>Status:</label> 
						<div class="radio_buttons"><input type="radio" name="status" id="inactive" value="inactive" /><div>Inactive</div></div>
						<div class="radio_buttons"><input type="radio" name="status" id="active" value="active" /><div>Active</div></div>
					</div>
					
					<div id="product_description_block">
						<label>Product Description:</label>
						<textarea name="productDescription"></textarea>
					</div>

				</div>
				<button type="button" id="update_product_submit_button">Update Product</button>
				<input type="submit" id="confirm_update_product_submit_button" value="Update Product" />
			</form>
		</div>
		<!-- END OF 'update_product_block' -->
		
		<!--=========================================================================================-->
		<!-- DISPLAY PRODUCTS BLOCK ------------------------------------------------------------------->
			<div id="display_products_block">
				<div id="products_types">
					<input type="text" autocomplete="off" id="product_category"
						value="All Categories" disabled="disabled" /> <span
						style="display: none;" id="product_id"></span> <img
						id="products_drop_down_arrow"
						src="resources/images/drop_down.png" alt="photo">
					<div id="products_dropdown">
						<div>
							Protein
							<p style="display: none;">Protein</p>
							<span style="display: none;">1</span>
						</div>
						<div>
							Vitamins
							<p style="display: none;">Vitamins</p>
							<span style="display: none;">2</span>
						</div>
						<div>
							Food Supplement
							<p style="display: none;">Food Supplement</p>
							<span style="display: none;">3</span>
						</div>
						<div>
							Accessories
							<p style="display: none;">Accessories</p>
							<span style="display: none;">4</span>
						</div>
						<div>
							Gym Equipment
							<p style="display: none;">Gym Equipment</p>
							<span style="display: none;">5</span>
						</div>
						<div>
							All Categories
							<p style="display: none;">All Categories</p>
							<span style="display: none;">5</span>
						</div>
					</div>
				</div>

				<div class="products_displayed">

				</div>
				
			</div>
			<!-- END OF 'display_products_block' -->
		
		<!--==============================================================================-->
		<!-- DISPLAY SOLD PRODUCTS ALONG WITH CUSTOMER DETAILS ----------------------------->
		<div id="sold_products_block">
			
			<div class="products_displayed">

			</div>
		</div>
		<!-- END OF 'sold_products_block' -->

		<!--==============================================================================-->
		<!-- RESERVED PRODUCTS BLOCK ------------------------------------------------------->
		<div id="reserved_products_block">
		
			<div class="products_displayed">

			</div>
		</div>
		<!-- END OF 'reserved_products_block' -->

	</div>
	<!-- END OF 'right_settings_block' -->
	</div>
	<!-- END OF 'products_content' ------>

</body>
</html>