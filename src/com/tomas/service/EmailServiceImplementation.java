package com.tomas.service;

import java.io.IOException;
import java.io.InputStream;

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

						// message.setFrom("me@mail.com");
						message.setTo(recipient);
						message.setSubject(subject);
						message.setText(emailMessage, true);
						// message.addInline("myLogo", new
						// ClassPathResource("bg.jpg"));
						// message.addAttachment("skill.pdf", new
						// ClassPathResource("skill.pdf"));
						
						// determines if there is an upload file, attach it to the e-mail
		                String attachName = emailAttachment.getOriginalFilename();
		                if (!emailAttachment.equals("")) {
		 
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

}
