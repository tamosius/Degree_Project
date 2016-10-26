package com.tomas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.bean.Email;
import com.tomas.service.EmailService;

@RestController
@RequestMapping(value="/sendEmail")
public class SendEmailController {

	@Autowired
	private EmailService emailService;
	
	@RequestMapping(value="/send", method=RequestMethod.POST)
	public String sendEmail(@RequestBody Email composedEmail){
		
		return emailService.sendEmail(composedEmail);
	}
}
