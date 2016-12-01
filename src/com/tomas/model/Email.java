package com.tomas.model;

public class Email {

	private String recipient;
	private String subject;
	private String emailMessage;
	private String initialMessage;
	
	// getters and setters
	public String getRecipient() {
		return recipient;
	}
	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getEmailMessage() {
		return emailMessage;
	}
	public void setEmailMessage(String emailMessage) {
		this.emailMessage = emailMessage;
	}
	public String getInitialMessage() {
		return initialMessage;
	}
	public void setInitialMessage(String name, String userName, String password) {
		this.initialMessage = getInitialText(name, userName, password);
	}
	
	
/*----- GET TEXT FOR INITIAL EMAIL --------------------------------------------*/
	public String getInitialText(String name, String userName, String password){
		
		return "<!DOCTYPE html>"
		+ "<html>"
		+ "<head>"
		+ "<style>"
		+ "h2{"
		    + "color: #2e4c84;"
			+ "font-size: 22px;"
			+ "font-weight: bold;"

		+"}"
		+ "span{"
			+ "color: #2e4c84;"
			+ "font-size: 22px;"
			+ "font-weight: bold;"
		+ "}"
		+ "</style>"
		+ "</head>"
		+ "<body>"
			+ "<h2>Hi " + name + ",</h2>"
			
			+ "<p>Thank you for joining our <span>'TM'</span> gym.</p>"
			+ "<p>We appreciate to provide you use of our website, where you can login and view"
			+ "your status, our products and many more</p>"
			
			+ "<p>To see you status and details, please login at:<br>"
			+ "<a href='http://www.google.ie'>Visit out website: 'TM'</a></p>"
			
			+ "<p>Your username: " + userName + "</p>"
			+ "<p>Your password: " + password + "</p>"
		+ "</body>"
		+ "</html>";
	}
	
}
