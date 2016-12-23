
$(document).ready(function(){
	
	// 'reports.jsp' page
	var progress = $("#report_dates_statistics .statistics_barcharts .barchart"); // outer 'div'
	var progressLabel = $("#report_dates_statistics .statistics_barcharts .barchart_label"); // inner 'div'
	
	
	var rate = 10;
	$(function(){
		progress.progressbar({
	
		value: true,
		change: function(){
			progressLabel.text(rate + "% Attendance rate");
		},
		complete: function(){
			progressLabel.text(rate + "% Retentions rate");
		}
	    });
	});
	
	$(".reports_left_container").delegate("button", "click", function(){
		
		console.log("click!!");
		progress.progressbar("value", rate);
	});
	
});

function progressBar(){
	
	
	// 'reports.jsp' page
	var progress = $("#report_dates_statistics .statistics_barcharts .barchart"); // outer 'div'
	var progressLabel = $("#report_dates_statistics .statistics_barcharts .barchart_label"); // inner 'div'
	
	var rate = 100;
	
	progress.progressbar({
		
		value: true,
		change: function(){
			progressLabel.text();
		}
	});
}