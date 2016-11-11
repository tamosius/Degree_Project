package com.tomas.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.model.Email;

public interface EmailService {

	public String sendEmail(HttpServletRequest request, CommonsMultipartFile emailAttachment);  // send email with attachments if required
}
