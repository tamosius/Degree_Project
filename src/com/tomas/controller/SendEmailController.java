package com.tomas.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.service.EmailService;

@RestController
@RequestMapping(value="/sendEmail")
public class SendEmailController {

	@Autowired
	private EmailService emailService;
	
	@RequestMapping(value="/send", method=RequestMethod.POST)
	public String sendEmail(HttpServletRequest request,final @RequestParam CommonsMultipartFile emailAttachment){
		
		return emailService.sendEmail(request, emailAttachment);
	}
}
