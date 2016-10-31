package com.tomas.service;

public interface HashPasswordService {

	public String getHashPassword(String password);   // get encoded user password to store to the database
}
