package com.tomas.model;

public class Programme {

	private int programmeId;
	private String programmeName;
	private float programmePrice;
	private float programmeDiscount;
	private float programmeDiscountPercentage;
	private float finalPrice;
	private String programmePromotionStart;
	private String programmePromotionEnd;
	private String programmePromotionDescription;
	private String updatedTimestamp;
	
	
	
	// setters and getters
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
	public float getFinalPrice() {
		return finalPrice;
	}
	public void setFinalPrice(float finalPrice) {
		this.finalPrice = finalPrice;
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
	public String getUpdatedTimestamp() {
		return updatedTimestamp;
	}
	public void setUpdatedTimestamp(String updatedTimestamp) {
		this.updatedTimestamp = updatedTimestamp;
	}
}
