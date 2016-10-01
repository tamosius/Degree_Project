<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script src="resources/javascript/display_members.js"></script>
<title>Insert title here</title>
</head>
<body id="content_body">
	<div class="content">
		<table class="outer_table">
			<tr>
				<td>
					<table class="header_table" border="1">
						<tr>
							<th rowspan="2" class="first_name">First Name</th>

							<th rowspan="2" class="last_name">Last Name</th>
							<th colspan="2" class="membership">Membership</th>
							<th rowspan="2" class="paid">Paid €</th>

						</tr>
						<tr id="from_to">
							<th class="from">From</th>
							<th class="to">To</th>
						</tr>

					</table>
				</td>
			</tr>
			<tr>
				<td>
					<div class="size">
						<!-- set window size depending on monitor size -->
						<table class="body_table">

						</table>
					</div>
				</td>
			</tr>
		</table>
	</div>

</body>
</html>