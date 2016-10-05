package com.tomas.bean;

public class Settings {

	private int programmeId;                               // id of the 'Admin', 'Programme', 'Sales', etc.
	//private String firstName;  // 'Admin' first name
	//private String lastName;   // 'Admin' last name
	private String programmeName;                 // 'Programme' name
	private float programmePrice;                 // 'Programme' current price
	private float programmeDiscount;              // 'Programme' discount price
	private float programmeDiscountPercentage;    // 'Programme' discount percentage
	private String programmePromotionStart;       // 'Programme' promotion start date
	private String programmePromotionEnd;         // 'Programme' promotion end date
	private String programmePromotionDescription; // description of the promotion made
	private String programmeUpdateDate;           // 'Programme' update date when it has been updated
	private float finalPrice;                     // 'Programme' final price including promotions, etc.
	private String programmeDescription;          // 'Programme' description
	
	
	public int getProgrammeId() {
		return programmeId;
	}
	public void setProgrammeId(int programmeId) {
		this.programmeId = programmeId;
	}
	
	public String getProgrammeName() {
		return programmeName;
	}
	public void setProgrammeName(String programmeName) {
		this.programmeName = programmeName;
	}
	
	public float getProgrammePrice() {
		return programmePrice;
	}
	public void setProgrammePrice(float programmePrice) {
		this.programmePrice = programmePrice;
	}
	
	public float getProgrammeDiscount() {
		return programmeDiscount;
	}
	public void setProgrammeDiscount(float programmeDiscount) {
		this.programmeDiscount = programmeDiscount;
	}
	
	public float getProgrammeDiscountPercentage() {
		return programmeDiscountPercentage;
	}
	public void setProgrammeDiscountPercentage(float programmeDiscountPercentage) {
		this.programmeDiscountPercentage = programmeDiscountPercentage;
	}
	
	public String getProgrammePromotionStart() {
		return programmePromotionStart;
	}
	public void setProgrammePromotionStart(String programmePromotionStart) {
		this.programmePromotionStart = programmePromotionStart;
	}
	
	public String getProgrammePromotionEnd() {
		return programmePromotionEnd;
	}
	public void setProgrammePromotionEnd(String programmePromotionEnd) {
		this.programmePromotionEnd = programmePromotionEnd;
	}
	
	public String getProgrammePromotionDescription() {
		return programmePromotionDescription;
	}
	public void setProgrammePromotionDescription(String programmePromotionDescription) {
		this.programmePromotionDescription = programmePromotionDescription;
	}
	public String getProgrammeUpdateDate() {
		return programmeUpdateDate;
	}
	public void setProgrammeUpdateDate(String programmeUpdateDate) {
		this.programmeUpdateDate = programmeUpdateDate;
	}
	public float getFinalPrice() {
		return finalPrice;
	}
	public void setFinalPrice(float finalPrice) {
		this.finalPrice = finalPrice;
	}
	public String getProgrammeDescription() {
		return programmeDescription;
	}
	public void setProgrammeDescription(String programmeDescription) {
		this.programmeDescription = programmeDescription;
	}
	
	
}
