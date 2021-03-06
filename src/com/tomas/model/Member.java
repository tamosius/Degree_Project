package com.tomas.model;

import java.text.SimpleDateFormat;
import java.util.Date;


public class Member {
	
	private int id;
	private String firstName;
	private String lastName;
	private String phNumber;
	private String address;
	private String password;
	private String email;
	private String dateOfBirth;
	private String dateJoined;
	private int memberAge;
	private String imagePath;
	
	private Offer offer;     // member has an offer

/*===================================================*/
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
	
	private String visitedTimestamp;
	private String weekDay;
	private int countVisits;
	
	private Programme programmeDetails;   // membership_status has a Programme
	
	
	// no-args constructor
	public Member() {
		
		offer = new Offer();
		programmeDetails = new Programme();
	}

/*===================================================*/
	// getters and setters
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getPhNumber() {
		return phNumber;
	}

	public void setPhNumber(String phNumber) {
		this.phNumber = phNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	
	public String getDateJoined(){
		return dateJoined;
	}
	
	public void setDateJoined(String dateJoined){
		this.dateJoined = dateJoined;
	}
	
	public int getMemberAge() {
		return memberAge;
	}

	public void setMemberAge(int memberAge) {
		this.memberAge = memberAge;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	
	/*------ GET OFFER DETAILS -------------------------------*/
	public void setOfferPercentage(int offerPercentage){
		offer.setOfferPercentage(offerPercentage);
	}
	public float getOfferPercentage(){
		return offer.getOfferPercentage();
	}

	/*=========================================================================================*/
	/*----------------- PROBABLY SHOULD BE EXTENDED....----------------------------------- */
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
    
	public float getDuePayment() {
		return duePayment;
	}

	public void setDuePayment(float duePayment) {
		this.duePayment = duePayment;
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

	
/*==========================================================================================*/	
	/*----------------- 'MEMBER_ATTENDANCE' TABLE ------------------------------------------*/
	public String getVisitedTimestamp() {
		return visitedTimestamp;//@Entity  // tells hibernate that the class is an entity to persist or hold data to or from database
		//@Table(name="MEMBERS")  // specify table name to read/write data
	}

	public void setVisitedTimestamp(String visitedTimestamp) {
		this.visitedTimestamp = visitedTimestamp;
	}
	
	public String getWeekDay() {
		return weekDay;
	}

	public void setWeekDay(String weekDay) {
		this.weekDay = weekDay;
	}

	public int getCountVisits() {
		return countVisits;
	}

	public void setCountVisits(int countVisits) {
		this.countVisits = countVisits;
	}
	
	
	
	
	public String getCurrentasDate(){
		
		Date date = new Date();
		SimpleDateFormat sf = new SimpleDateFormat("dd-MM-YYYY HH:mm:ss");
		
		return sf.format(date);
	}
}
