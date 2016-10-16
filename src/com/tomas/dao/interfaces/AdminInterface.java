package com.tomas.dao.interfaces;

import java.util.List;

import org.springframework.web.servlet.ModelAndView;

import com.tomas.bean.Admin;


public interface AdminInterface {

	public ModelAndView authenticate(Admin admin);  // authenticate admin user on login page
	
	public Admin addAdmin(Admin admin);             // add new admin into the database
	
	public Admin getAdminDetails(int id);           // get admin details by ID
	
	public List<Admin> getAllAdmin(String name);    // get all Admin's
	
	public Admin addAdminMessage(int messageTo, String message, int messageFrom); // add new message from Admin
}
