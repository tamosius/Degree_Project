package com.tomas.dao;

import java.util.List;

import com.tomas.model.Admin;


public interface AdminDAO {

	public Admin authenticate(Admin admin);  // authenticate admin user on login page
	
	public Admin addAdmin(Admin admin);             // add new admin into the database
	
	public Admin getAdminDetails(int id);           // get admin details by ID
	
	public List<Admin> getAllAdmin(String name);    // get all Admin's
	
	public Admin addAdminMessage(int messageTo, String message, int messageFrom); // add new message from Admin
}
