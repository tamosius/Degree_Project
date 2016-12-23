package com.tomas.service.runnable;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.dao.MemberDAO;
import com.tomas.service.EmailService;
import com.tomas.service.EmailServiceImplementation;
import com.tomas.service.SaveImageService;

public class TaskClass implements Runnable {
	
	@Autowired
	MemberDAO memberDAO;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	SaveImageService saveImageService;

	private int memberId;
	private String firstName;
	private String email;
	private String password;
	
	private CommonsMultipartFile image;
	private HttpServletRequest request;

	public TaskClass() {

	}

	public TaskClass(int memberId, String firstName, String email, String password, CommonsMultipartFile image, HttpServletRequest request) {

		this.memberId = memberId;
		this.firstName = firstName;
		this.email = email;
		this.password = password;
		
		this.image = image;
		this.request = request;
	}

	@Override
	public void run() {
		
		
        EmailService emailService = new EmailServiceImplementation();
		// send composed welcome email message
		emailService.sendWelcomeEmail(firstName, email, password);

		// determine if there is an upload picture
		String imageName = image.getOriginalFilename();
		if (!imageName.equals("")) {

			// save path for image
			memberDAO.insertImagePath(memberId, memberId + ".jpg");
			// save picture
			saveImageService.saveImage(image, memberId, "members", request);

		} else {

			memberDAO.insertImagePath(memberId, "no_photo.jpg");
		}
	}
}
