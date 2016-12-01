package com.tomas.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public interface EmailService {
	
	public void sendWelcomeEmail(String name, String username, String password);  // send welcome email when person join the club

	public String sendEmail(HttpServletRequest request, CommonsMultipartFile emailAttachment);  // send regular email with attachments if required
	
	public String sendOfferEmail(String subject, String name, String recipientEmail, String product, int offerPercentage, int offerDays);
}
