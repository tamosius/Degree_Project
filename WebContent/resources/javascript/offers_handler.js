
$.ajax({
	
	//type : "",
	//url  : "",
	success: function(data, status, e){
		
		console.log("this function is working!");
	},
	error : function(e){
		
		alert("Unsuccessfully handled an offers!! Please re-try!");
	}
});