
/*===================================================================================================================================*/
/*----------- GET TODAY'S DATE -----------------------------------------------------------------------------*/
function getTodaysDate(){
	
	var today = new Date();
	
	return appendZero(today.getDate()) + "-" + appendZero(today.getMonth() + 1) + "-" + today.getFullYear();
}

// subtract numberOfDays from today's date
// and return in date format
function subtractDate(numberOfDays){
	
	var date = new Date();
	
	date.setDate(date.getDate() - numberOfDays);
	
	return appendZero(date.getDate()) + "-" + appendZero(date.getMonth() + 1) + "-" + date.getFullYear();
}

function appendZero(value){
	
	if(value < 10){
		
		return "0" + value;
	}
	else{
		
		return value;
	}
}

/*======================================================================================================================================*/

/*--------- ADD CLASSES WITH COLORS FOR 'no membership', 'N / A', 'membership days left' (display_members.css)----*/
function addClass(value){
	
    if(value.localeCompare("N / A") === 0 ){
		
		value = "<div class='no_membership'>" + value + "</div>";  // css style in 'display_members.css' file
	}
    else if(value.localeCompare("present") === 0){
    	
    	value = "<div class='expired_membership'>N / A</div>";
    }
	else if(value == 0.00){
		
		value = "<div class='no_paid'>" + value + "</div>";        // css style in 'display_members.css' file
	}
	
	return value;	
}

/*-------- DISPLAY IN THE BIG TABLE DAYS LEFT UNTIL THE END OF MEMBERSHIP ---------------------------------------*/
function addClassDaysLeft(value){
	
    if(value >= 5){
		
		value = "<div class='membership_available'>(" + value + " days left)</div>"; // css style in 'display_members.css' file
	}
	else if(value < 5 && value > 1){
		
		value = "<div class='membership_ending'>(" + value + " days left)</div>";    // css style in 'display_members.css' file
	}
	else if(value == 1){
		
		value = "<div class='membership_last_day'>(" + value + " day left)</div>";   // css style in 'display_members.css' file
	}
	else if(value == 0){
		
		value = "<div class='membership_last_day'>Last Day!</div>";                  // css style in 'display_members.css' file
	}else {
		
		value = "<div class='expired_membership'>N / A</div>";                     // css style in 'display_members.css' file
	}
    return value;
}

/*==========================================================================================================================================*/
/*---------- CHANGE FONTS IN 'Reports' TABLE -----------------------------------------------------------------------------------------------*/
function reportsTableFonts(value){
	
	if((value.localeCompare("'1 Month Mbsh'") === 0) || (value.localeCompare("'3 Months Mbsh'") === 0) || (value.localeCompare("'6 Months Mbsh'") === 0) ||
			(value.localeCompare("'12 Months Mbsh'") === 0)){
		
		value = "<div class='programme'>" + value + "</div>";
		
	}else if(value.localeCompare("'Pay as You Go'") === 0){
		
		value = "<div class='pay_as_you_go'>" + value + "</div>";
		
	}else if(value.localeCompare("present") === 0){
		
		value = "<div class='membership_present'>" + value + "</div>";
	}
	
	return value;
}

/*===========================================================================================================================================*/
/*-------- CHANGE FONTS IN 'Reports_big_table' ----------------------------------------------------------------------------------------------*/
function reportsBigTableFonts(value){
	
	if((value.localeCompare("'1 Month Mbsh'") === 0) || (value.localeCompare("'3 Months Mbsh'") === 0) || (value.localeCompare("'6 Months Mbsh'") === 0) ||
			(value.localeCompare("'12 Months Mbsh'") === 0)){
		
		value = "<div class='programme'>" + value + "</div>";
		
	}else if(value.localeCompare("'Pay as You Go'") === 0){
		
		value = "<div class='pay_as_you_go'>" + value + "</div>";
		
	}else if(value.localeCompare("present") === 0){
		
		value = "<div class='membership_present'>" + value + "</div>";
	}
	
	return value;	
}






