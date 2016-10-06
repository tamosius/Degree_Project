package com.tomas.hashPassword;

public interface HashPasswordInterface {

	public String getHashPassword(String password);   // get encoded user password to store to the database
}
