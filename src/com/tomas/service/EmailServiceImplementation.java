package com.tomas.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.Scanner;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.messaging.MessagingException;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class EmailServiceImplementation implements EmailService {

	@Autowired
	private JavaMailSender mailSender;

	/*------- SEND WELCOME EMAIL WHEN PERSON JOIN THE CLUB ----------------------------------------------------*/
	public void sendWelcomeEmail(String name, String username, String password) {
		

		
		// send an email
		mailSender.send(new MimeMessagePreparator() {

			@Override
			public void prepare(MimeMessage mimeMessage) throws MessagingException, javax.mail.MessagingException {

				MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");

				try {

					message.setFrom(new InternetAddress("t.mikoliunas@gmail.com", "Tomas"));

				} catch (UnsupportedEncodingException e) {

					e.printStackTrace();
				}
				message.setTo(username);
				message.setSubject("Welcome to ToMi Gym Club!!");
				message.setText(getWelcomeTemplate(name, username, password), true);
			}
		});
	}

	/*------ SEND REGULAR EMAIL WITH ATTACHMENTS IF REQUIRED --------------------------------------------------*/
	@Override
	public String sendEmail(HttpServletRequest request, CommonsMultipartFile emailAttachment) {

		// takes inputs from e-mail form
		String[] recipients = request.getParameterValues("recipients");
		String subject = request.getParameter("subject");
		String emailMessage = request.getParameter("message");

		// loop through all selected recipients in 'select' option
		for (int i = 0; i < recipients.length; i++) {

			// get the email address of recipient
			String recipient = recipients[i];

			// send an email
			mailSender.send(new MimeMessagePreparator() {

				@Override
				public void prepare(MimeMessage mimeMessage) throws MessagingException, javax.mail.MessagingException {

					MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");

					try {

						message.setFrom(new InternetAddress("t.mikoliunas@gmail.com", "Tomas"));

					} catch (UnsupportedEncodingException e) {

						e.printStackTrace();
					}
					message.setTo(recipient);
					message.setSubject(subject);
					message.setText(emailMessage, true);
					// message.addInline("myLogo", new
					// ClassPathResource("bg.jpg"));
					// message.addAttachment("skill.pdf", new
					// ClassPathResource("skill.pdf"));

					// determines if there is an upload file, attach it to the
					// e-mail
					String attachName = emailAttachment.getOriginalFilename();

					if (!attachName.equals("")) {

						message.addAttachment(attachName, new InputStreamSource() {

							@Override
							public InputStream getInputStream() throws IOException {
								return emailAttachment.getInputStream();
							}
						});
					}
				}
			});
		}

		return "Successfully sent an email!!!";
	}
	
/*---------- READ WELCOME EMAIL TEMPLATE FROM A FILE ----------------------------------------------------------------------*/
	public String getWelcomeTemplate(String name, String username, String password){
		
		String message = "";
		
		String pathToFile = "email_templates" + File.separator + "welcomeEmail.txt";
		
		try(Scanner input = new Scanner(new BufferedReader(new InputStreamReader(getClass().getResourceAsStream(pathToFile))))){
			
			String getTemplate = input.useDelimiter("\\Z").next();  // read whole template into String with one call to 'next()'
			
			// replace String 'MEMBERNAME', 'MEMBERSUSERNAME', 'MEMBERPASSWORD' with appropriate values
			message = getTemplate.replaceAll("MEMBERNAME", name);
			message = message.replaceAll("MEMBERUSERNAME", username);
			message = message.replaceAll("MEMBERPASSWORD", password);
			
			
		}catch (Exception e) {
			
			e.printStackTrace();
		}
						
		return message;
	}
}
