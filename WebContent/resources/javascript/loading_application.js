


/*===================================================================================================================*/
/*---------- JQUERY READY -------------------------------------------------------------------------------------------*/
$(document).ready(function(){
	
	document.getElementById("loading-mask").style.display = "none";
	//$("#loading-mask").delay(1000).fadeOut(50);
	
	// get programmes current details: prices, discounts, etc.
	getProgrammesDetails();
});