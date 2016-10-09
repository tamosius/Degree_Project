package com.tomas.hashPassword;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

	

public class HashPassword implements HashPasswordInterface{
	
	protected final Log logger = LogFactory.getLog(getClass());	

	public String getHashPassword(String password){
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
		
		String hashedPassword = passwordEncoder.encode(password);
		
		logger.info("Password encrypted to: " + hashedPassword);
		
		return hashedPassword;
	}
}
	