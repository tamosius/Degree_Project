<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<style>
.chart_content{

position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;

background: #ffffff;
//display: none;

}
#chartContainer{

	position: absolute;
	top: 0;
	bottom: -12px;
	left: 0;
	right: 0;
	
	
}



</style>
<script src="http://canvasjs.com/assets/script/canvasjs.min.js"></script>
<script src="resources/javascript/jquery.canvasjs.min.js"></script>
<script type="text/javascript">

$(document).ready(function(){
	
	var chart = new CanvasJS.Chart("chartContainer", {
		
		animationEnabled: true, 
		animationDuration: 2000,
		theme: 4,
		widht: 500,
		
		title:{
			text: "Members with their current Programmes plans",
			fontSize: 40,
			fontColor: "#00003D" ,
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [
				{ label: "1 Month",  y: 0  },
				{ label: "3 Months", y: 0  },
				{ label: "6 Months", y: 0  },
				{ label: "12 Months",  y: 0  },
				{ label: "Pay as You Go", y: 0}
				
			]
		}
		]
	});
	
	chart.options.data[0].dataPoints[0].y = parseInt(booked[0]); 
	chart.options.data[0].dataPoints[1].y = parseInt(booked[1]); 
	chart.options.data[0].dataPoints[2].y = parseInt(booked[2]); 
	chart.options.data[0].dataPoints[3].y = parseInt(booked[3]); 
	chart.options.data[0].dataPoints[4].y = parseInt(booked[4]); 
	chart.render();
	
	$(".chart_content").slideDown(250);
});
</script>
</head>
<body>
<div class="chart_content">
<div id="chartContainer" ></div>
</div>
</body>
</html>