package com.tomas.service;

import com.tomas.bean.Email;

public interface EmailService {

	public String sendEmail(Email composedEmail);  // send email
}
