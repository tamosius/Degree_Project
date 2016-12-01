package com.tomas.model;

public class ProductReserved extends Product{

	private int memberId;         // member's ID who purchased the product
	private String firstName;     // member's first name who purchased the product
	private String lastName;      // member's last name who purchased the product
	
	private int quantity;         // purchased product quantity
	private float totalPrice;     // paid in total by the member
	private String reservedDate;  // date the customer has purchased the product
	private String expireDate;    // date when the reservation expires
	
	
	// getters and setters
	public int getMemberId() {
		return memberId;
	}
	public void setMemberId(int memberId) {
		this.memberId = memberId;
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
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public float getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getReservedDate() {
		return reservedDate;
	}
	public void setReservedDate(String reservedDate) {
		this.reservedDate = reservedDate;
	}
	public String getExpireDate() {
		return expireDate;
	}
	public void setExpireDate(String expireDate) {
		this.expireDate = expireDate;
	}
	
	
}
