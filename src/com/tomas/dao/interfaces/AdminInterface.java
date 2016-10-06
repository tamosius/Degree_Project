package com.tomas.dao.interfaces;

import org.springframework.web.servlet.ModelAndView;

import com.tomas.bean.Admin;


public interface AdminInterface {

	public ModelAndView authenticate(Admin admin);  // authenticate admin user on login page
	
	public Admin addAdmin(Admin admin);             // add new admin into the database
	
	public Admin getAdminDetails(int id);           // get admin details by ID
}
