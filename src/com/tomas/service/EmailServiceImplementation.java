package com.tomas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.tomas.model.Email;

public class EmailServiceImplementation implements EmailService{

	@Autowired
	private JavaMailSender mailSender;
	
	@Override
	public String sendEmail(Email composedEmail){
		
		// takes input from e-mail form
        String recipient = composedEmail.getRecipient();
        String subject = composedEmail.getSubject();
        String emailMessage = composedEmail.getEmailMessage();
         
        // prints debug info
        System.out.println("To: " + recipient);
        System.out.println("Subject: " + subject);
        System.out.println("Message: " + emailMessage);
         
        // creates a simple e-mail object
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipient);
        email.setSubject(subject);
        email.setText(emailMessage);
         
        // sends the e-mail
        mailSender.send(email); 
		
		return "Successfully sent an email!!!";
	}
}
