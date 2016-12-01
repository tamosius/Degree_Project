package com.tomas.dao;

public interface OfferDAO {

	public String addOffer(int memberId, String offerSubject, String offerTemplate, 
			int offerDays, float offerPercentage, boolean accepted);  // add new offer to database with specified days of expiring
	
	public String acceptOffer(int memberId, boolean accepted);        // update details in 'Offers' table if member accepted offer within the specified period of time
}
