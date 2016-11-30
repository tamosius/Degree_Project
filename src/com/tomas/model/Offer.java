package com.tomas.model;

// this class represents what offer been made to particular members
public class Offer {
	
	private int memberId;
	private String offerSubject;
	private String offerTemplate;
	private float offerPercentage;
	private String startDate;
	private String endDate;
	private boolean accepted;
	private String acceptedDate;
	
	
	// getters and setters
	public int getMemberId() {
		return memberId;
	}
	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}
	public String getOfferSubject() {
		return offerSubject;
	}
	public void setOfferSubject(String offerSubject) {
		this.offerSubject = offerSubject;
	}
	public String getOfferTemplate() {
		return offerTemplate;
	}
	public void setOfferTemplate(String offerTemplate) {
		this.offerTemplate = offerTemplate;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public float getOfferPercentage() {
		return offerPercentage;
	}
	public void setOfferPercentage(int offerPercentage) {
		this.offerPercentage = offerPercentage;
	}
	public boolean isAccepted() {
		return accepted;
	}
	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}
	public String getAcceptedDate() {
		return acceptedDate;
	}
	public void setAcceptedDate(String acceptedDate) {
		this.acceptedDate = acceptedDate;
	}
	
	
}
