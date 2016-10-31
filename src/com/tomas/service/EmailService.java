package com.tomas.service;

import com.tomas.model.Email;

public interface EmailService {

	public String sendEmail(Email composedEmail);  // send email
}
