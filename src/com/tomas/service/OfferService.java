package com.tomas.service;

public interface OfferService {
	
	public String addOffer(int memberId, String offerSubject, String offerTemplate, int offerDays);  // add new offer to database with specified days of expiring
}
