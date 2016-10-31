<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Insert title here</title>
<script src="resources/javascript/reports.js"></script>
<!-- <script src="resources/javascript/load_report_values.js"></script>-->
</head>
<body>
	<div class="reports_content_block">
		<!------------ LEFT SIDE CONTAINER --------------------------------------------------------------------------------->
		<div class="reports_left_container">

			<!-------- BUTTON 'view report' ON SELECTED DATES AND REPORT TYPE -------------------------------------------------->
			<button type="button" id="view_report_button">View Report</button>

			<!-------- REPORT TYPE SELECTION MENU -------------------------------------------------------------------------->
			<div class="report_selection">
				 <label id="report_selected_type">Please select report...</label>
				 <img id="reports_drop_down_arrow" src="resources/images/drop_down.png" alt="photo">
				<div class="report_selection_types">
					<div>
						Member<input type="hidden" value="member" />
					</div>
					<div>
						Personal Trainer<input type="hidden" value="personal_trainer" />
					</div>
					<div>
						Financial<input type="hidden" value="financial" />
					</div>
					<div>
						Sales<input type="hidden" value="sales" />
					</div>
				</div>
			</div>

			<!-------- REPORT NAMES BLOCK AND TABLE ------------------------------------------------------------------------>
			<div class="report_name_block">
				<div id="report_name_label">Report Names:</div>

				<div id="block_scroll_report_table">
					<table id="report_name_table">

					</table>
				</div>
			</div>
			<!-- END OF 'REPORT_TYPES_NAMES_BLOCK -->

			<!-------- REPORT DESCRIPTION AREA --------------------------------------------------------------------------->
			<div class="report_description">
				 <div id="report_description_label">Report Description:</div>
				 <div id="report_description"></div>
			</div>


		<!-- REPORT DATES AND STATISTICS FIELDS IN THE LEFT CONTAINER ---------------------------------------------------->
		<div id="report_dates_statistics">

			<div>
				<label>Report Start Date:</label> <input type="text"
					id="report_start_date_input" value="" autocomplete="off"
					placeholder="Please select date..." />
			</div>
			<div>
				<label>Report End Date:</label> <input type="text"
					id="report_end_date_input" value="" autocomplete="off"
					placeholder="Please select date..." />
			</div>
			<div>
				<label>Number of Days (report):</label> <input type="text"
					id="number_of_days" disabled="disabled" value="0" />
			</div>
			<div>
				<label>Showing Total Members:</label> <input type="text"
					id="showing_total_members" disabled="disabled" value="0" />
			</div>

		</div><!-- END OF REPORT DATES AND STATISTICS FIELDS IN THE LEFT CONTAINER -->
		
		</div><!-- END OF LEFT SIDE CONTAINER -->

    <!-------- RIGHT SIDE CONTAINER IN 'reports.jsp' --------------------------------------------------------------------->
		<div class="reports_right_container">
		
			<div class="reports_right_container_content">
			
				<div class="report_table_header">
					<table></table>
				</div>

				<div class="report_table_body_height">
					<!-- set window size depending on monitor size -->
					<table class="report_table_body" border="1">


					</table>
				</div>

			</div>
		</div><!-- END OF RIGHT SIDE CONTAINER -->

	</div>
</body>
</html>