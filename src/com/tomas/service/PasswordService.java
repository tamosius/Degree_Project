package com.tomas.service;

public interface PasswordService {

	public String getHashPassword(String password);   // get encoded user password to store to the database
	
	public String getInitialPassword();                  // get initial password for users when they sign in for the first time
}
