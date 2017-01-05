package com.tomas.model;

public class MembershipStatus {

	private String bookedTimestamp;
	private String membershipFrom;
	private String membershipTo;
	private String programme;
	private float paid;
	private float duePayment;
	private float programmesTotalPaid;
	private float productsTotalPaid;
	private float totalPaid;
	private String membershipDaysLeft;
	private String programmeState;
	private String updateDescription;
	private int programmeBooked;  // '1' if new programmes has been booked, '0' if not
	
	private Programme programmeDetails;   // membership_status has a Programme
	
	public MembershipStatus(){
		
		programmeDetails = new Programme();
	}

	public String getBookedTimestamp() {
		return bookedTimestamp;
	}

	public void setBookedTimestamp(String bookedTimestamp) {
		this.bookedTimestamp = bookedTimestamp;
	}

	public String getMembershipFrom() {
		return membershipFrom;
	}

	public void setMembershipFrom(String membershipFrom) {
		this.membershipFrom = membershipFrom;
	}

	public String getMembershipTo() {
		return membershipTo;
	}

	public void setMembershipTo(String membershipTo) {
		this.membershipTo = membershipTo;
	}

	public String getProgramme() {
		return programme;
	}

	public void setProgramme(String programme) {
		this.programme = programme;
	}

	public float getPaid() {
		return paid;
	}

	public void setPaid(float paid) {
		this.paid = paid;
	}

	public float getDuePayment() {
		return duePayment;
	}

	public void setDuePayment(float duePayment) {
		this.duePayment = duePayment;
	}

	public float getProgrammesTotalPaid() {
		return programmesTotalPaid;
	}

	public void setProgrammesTotalPaid(float programmesTotalPaid) {
		this.programmesTotalPaid = programmesTotalPaid;
	}

	public float getProductsTotalPaid() {
		return productsTotalPaid;
	}

	public void setProductsTotalPaid(float productsTotalPaid) {
		this.productsTotalPaid = productsTotalPaid;
	}

	public float getTotalPaid() {
		return totalPaid;
	}

	public void setTotalPaid(float totalPaid) {
		this.totalPaid = totalPaid;
	}

	public String getMembershipDaysLeft() {
		return membershipDaysLeft;
	}

	public void setMembershipDaysLeft(String membershipDaysLeft) {
		this.membershipDaysLeft = membershipDaysLeft;
	}

	public String getProgrammeState() {
		return programmeState;
	}

	public void setProgrammeState(String programmeState) {
		this.programmeState = programmeState;
	}

	public String getUpdateDescription() {
		return updateDescription;
	}

	public void setUpdateDescription(String updateDescription) {
		this.updateDescription = updateDescription;
	}

	public int getProgrammeBooked() {
		return programmeBooked;
	}

	public void setProgrammeBooked(int programmeBooked) {
		this.programmeBooked = programmeBooked;
	}


	public Programme getProgrammeDetails() {
		return programmeDetails;
	}

	public void setProgrammeDetails(Programme programmeDetails) {
		this.programmeDetails = programmeDetails;
	}
	/*----------------*/
	public int getProgrammeId(){
		return programmeDetails.getProgrammeId();
	}
	public void setProgrammeId(int programmeId){
		programmeDetails.setProgrammeId(programmeId);
	}
	public float getProgrammeDiscountPercentage() {
		return programmeDetails.getProgrammeDiscountPercentage();
	}
	public void setProgrammeDiscountPercentage(float programmeDiscountPercentage) {
		programmeDetails.setProgrammeDiscountPercentage(programmeDiscountPercentage);
	}
	public float getFinalPrice() {
		return programmeDetails.getFinalPrice();
	}
	public void setFinalPrice(float finalPrice) {
		programmeDetails.setFinalPrice(finalPrice);
	}
	
}
