package com.tomas.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
	@Override
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
	
/*------- SEND A THANK YOU AND AN OFFER EMAIL ----------------------------------------------------------------------------------------*/
	@Override
	public String sendOfferEmail(String subject, String name, String recipientEmail, String product, int offerPercentage, int offerDays) {
		
		// pass the number of days the offer will be available
		String offerEndDate = getOfferEndDate(offerDays);  
		
		// get an offer email template
		String emailTemplate = getOfferTemplate(name, product, offerEndDate, String.valueOf(offerPercentage));
		
		// send an email
		mailSender.send(new MimeMessagePreparator() {

			@Override
			public void prepare(MimeMessage mimeMessage) throws MessagingException, javax.mail.MessagingException {

				MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");  // 'true' denotes that email can be send in html format

				try {

					message.setFrom(new InternetAddress("t.mikoliunas@gmail.com", "Tomas"));

				} catch (UnsupportedEncodingException e) {

					e.printStackTrace();
				}
				message.setTo(recipientEmail);
				message.setSubject(subject);
				message.setText(emailTemplate, true);  // 'true' denotes that email can be send in html format
			}
		});
		return emailTemplate;
	}

/*------ SEND REGULAR EMAIL WITH ATTACHMENTS IF REQUIRED -------------------------------------------------------------------------------*/
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
	public String getWelcomeTemplate(String name, String emailAddress, String password){
		
		String template = "";
		
		String pathToFile = "email_templates" + File.separator + "welcomeEmail.txt";
		
		try(Scanner input = new Scanner(new BufferedReader(new InputStreamReader(getClass().getResourceAsStream(pathToFile))))){
			
			String getTemplate = input.useDelimiter("\\Z").next();  // read whole template into String with one call to 'next()'
			
			// replace String 'MEMBERNAME', 'MEMBERSUSERNAME', 'MEMBERPASSWORD' with appropriate values
			template = getTemplate.replaceAll("MEMBERNAME", name);
			template = template.replaceAll("MEMBERUSERNAME", emailAddress);
			template = template.replaceAll("MEMBERPASSWORD", password);
			
			
		}catch (Exception e) {
			
			e.printStackTrace();
		}
						
		return template;
	}
	
/*---------- READ AN OFFER EMAIL TEMPLATE FROM A FILE ----------------------------------------------------------------------*/
	public String getOfferTemplate(String name, String product, String offerEndDate, String offerPercentage){
		
		String template = "";
		
		String pathToFile = "email_templates" + File.separator + "productsOffer.txt";
		
		try(Scanner input = new Scanner(new BufferedReader(new InputStreamReader(getClass().getResourceAsStream(pathToFile))))){
			
			String getTemplate = input.useDelimiter("\\Z").next();  // read whole template into String with one call to 'next()'
			
			// replace String 'MEMBERNAME', 'MEMBERSUSERNAME', 'MEMBERPASSWORD' with appropriate values
			template = getTemplate.replaceAll("MEMBERNAME", name);
			template = template.replaceAll("PRODUCT", product);
			template = template.replaceAll("OFFERDATE", offerEndDate);
			template = template.replaceAll("OFFERPERCENTAGE", offerPercentage);
			
			
		}catch (Exception e) {
			
			e.printStackTrace();
		}
						
		return template;
	}
	
/*--------- GET AN OFFER END DATE BY A SPECIFIED OFFER DAYS NUMBER -----------------------------------------------------------*/
	public String getOfferEndDate(int offerDays){
		
		// get today's date
		Date today = new Date();
		
		// set date format
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		
		// get instance of calendar
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(today);
		calendar.add(Calendar.DATE, offerDays);
		
		return dateFormat.format(calendar.getTime());
	}
}
