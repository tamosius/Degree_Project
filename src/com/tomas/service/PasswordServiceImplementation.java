package com.tomas.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

	

public class PasswordServiceImplementation implements PasswordService{
	
	protected final Log logger = LogFactory.getLog(getClass());	

	
/*------ GET ENCODED USER PASSWORD TO STORE IN THE DATABASE --------------------------------------------------*/
	public String getHashPassword(String password){
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
		
		String hashedPassword = passwordEncoder.encode(password);
		
		logger.info("Password encrypted to: " + hashedPassword);
		
		return hashedPassword;
	}
	
	
/*------ GET INITIAL PASSWORD FOR USERS WHEN THEY SIGN IN FOR THE FIRST TIME ---------------------------------*/
	public String getInitialPassword(){
		
		int passwordLength = 7;  // length will be ('passwordLength' * 2)
		
		StringBuilder password = new StringBuilder();  // store initial password
		
		for(int i = 0; i < passwordLength; i++){
			
			char character = (char)((Math.random() * 26) + 97);  // random generate (a - z)
			
			password.append(character);
			
			character = (char)((Math.random() * 26) + 65);       // random generate (A - Z)
			
			password.append(character);
		}
		return password.toString();
	}
}
	