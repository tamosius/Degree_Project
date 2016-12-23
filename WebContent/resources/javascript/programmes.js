// get programmes current details: prices, discounts, etc.
function getProgrammesDetails(){
	
	$.ajax({
		
		type : "GET",
		url  : serverPath + "/programmes/getProgrammesDetails",  // 'serverPath' in 'global_variables.js'
		dataType : "json",
		success: function(data, status, e){
			
			// 'programmesDetails' variable in 'global_variables.js'
			programmesDetails = data;
		},
		error: function(e){
			
			//alert()
		}
	});
}

// get current details of programme by ID
function getProgrammeDetails(programmeId){
	
	var programmeDetails = "";
	
	// 'programmesDetails' variable in 'global_variables.js'
	for(var property in programmesDetails){
		
		if(programmesDetails.hasOwnProperty(property)){
			
			if(parseInt(programmesDetails[property].programmeId) === parseInt(programmeId)){
				
				programmeDetails = {
						
						programmeId                 : programmesDetails[property].programmeId,
						programmeName               : programmesDetails[property].programmeName,
						programmePrice              : programmesDetails[property].programmePrice,
						programmeDiscount           : programmesDetails[property].programmeDiscount,
						programmeDiscountPercentage : programmesDetails[property].programmeDiscountPercentage,
						finalPrice                  : programmesDetails[property].finalPrice
				}
				return programmeDetails;
			}
			
		}else{
			return "";
		}
		
	}
}
