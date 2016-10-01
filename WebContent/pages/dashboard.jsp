<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Dashboard</title>
<script src="resources/javascript/dashboard.js"></script>

</head>
<body>
  <div class="dashboard_main_content">
  
	<!-------- DASHBOARD INITIALS MIDDLE BLOCK ------------------------------------------------------------------>
	<div class="dashboard_top_block">
		<!--<div class="picture">
			<img src="resources/images/vitalija_zalia.jpeg" alt="no foto"></img>
		</div>-->
		<div class="initials_description">
			Gym Managements System
			<!--<p>Tomas su Vitalija kuria...:)</p>-->
		
		</div>
	</div>

	<!-------- DASHBOARD 'Member' TOP-LEFT BLOCK ---------------------------------------------------------------->
	<div class="dashboard_top_left">
		<div class="dashboard_content">
			<label id="member_label">Members</label> <label
				id="add_manage_member_label">Add and display members</label>
			<button id="add_button">Add Member</button>
			<button id="display_button">Display Members</button>
			<button id="missing_members_button"></button>
			<div id="retention_rate_div">
				<div id="retention_rate_label"></div>
			</div>
		</div>
	</div>

	<!-------- DASHBOARD 'Tasks' TOP-MIDDLE BLOCK --------------------------------------------------------------->
	<div class="dashboard_top_middle">
		<div class="dashboard_content">
			<label id="tasks_label">Tasks</label> <label
				id="actions_tasks_label">Actions on your to-do list</label>
			<button id="new_to_do_list_button">Create To-do List</button>
			<button id="to_do_list_button">To-do List's (all)</button>
			<button id="today_to_do_list_button">Today's To-do List <span>(01-09-2016)</span></button>
		</div>
	</div>

	<!-------- DASHBOARD 'point of sales' TOP-RIGHT BLOCK --------------------------------------------------------------------->
	<div class="dashboard_top_right">
		<div class="dashboard_content">
			<label id="point_of_sale_label">Point of Sales</label> <label
				id="sells_label">Sell a product over the counter</label>
			<button id="make_sale_button">Make a Sale</button>
			<button id="sold_today_button">Sold Today</button>
			<button id="popular_products_button">Popular Products</button>
		</div>
	</div>

	<!-------- DASHBOARD 'memberships and bookings' BOTTOM-LEFT BLOCK ------------------------------------------------------------------->
	<div class="dashboard_bottom_left">
		<div class="dashboard_content">
			<label id="mshp_bookings_label">Memberships and Bookings</label> <label
				id="view_manage_mshp_bookings">View and manage memberships
				and bookings</label>
			<button id="mshp_booked_extended_button">Memberships
				booked (only valid)</button>
			<button id="classes_booked_button">Memberships Booked (all)</button>
			<button id="valued_members_button">Valued Members</button>
		</div>
	</div>

	<!-------- DASHBOARD '' BOTTOM-MIDDLE BLOCK ----------------------------------------------------------------->
	<div class="dashboard_bottom_middle">
		<div class="dashboard_content"></div>
	</div>

	<!-------- DASHBOARD 'products' BOTTOM-RIGHT BLOCK ------------------------------------------------------------------>
	<div class="dashboard_bottom_right">
		<div class="dashboard_content">
			<label id="products_label">Products</label> <label
				id="add_display_products_label">Add and display products</label>
			<button id="add_product_button">Add Product</button>
			<button id="display_products_button">Display Products</button>
			<button id="last_added_products_button">Last added Products</button>
		</div>
	</div>
	
  </div><!-- END OF 'dashboard_content' -->
</body>
</html>
