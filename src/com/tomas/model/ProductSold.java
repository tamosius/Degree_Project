package com.tomas.model;

public class ProductSold extends Product{
	
	private int memberId;         // member's ID who purchased the product
	private String firstName;     // member's first name who purchased the product
	private String lastName;      // member's last name who purchased the product
	private String email;         // member's email address who purchased the product
	
	private int quantity;         // purchased product quantity
	private float totalPrice;     // paid in total by the member
	private String purchasedDate; // date the customer has purchased the product
	
	
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
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
	public String getPurchasedDate() {
		return purchasedDate;
	}
	public void setPurchasedDate(String purchasedDate) {
		this.purchasedDate = purchasedDate;
	}
	
	
}
