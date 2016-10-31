package com.tomas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.tomas.model.Admin;
import com.tomas.dao.AdminDAO;

public class AdminServiceImplementation implements AdminService{
	
	@Autowired
	AdminDAO adminDAO;

	/*------ RETURN MODELANDVIEW IF AUTHENTICATION IS SUCCESSFUL -----------------------------------------------------------------*/
	@Override
	public ModelAndView authenticate(Admin admin){
		
		Admin adminUser = adminDAO.authenticate(admin);
		
		if(adminUser != null){
			
			return new ModelAndView("index", "adminUser", adminUser);
		}
		else{
			
			return null;
		}
	}
	
/*------ ADD NEW ADMIN USER TO THE DATABASE ----------------------------------------------------------------------------------*/
	@Override
	public Admin addAdmin(Admin admin){
		
		return adminDAO.addAdmin(admin);
	}
	
/*------ GET ADMIN DETAILS BY ID ---------------------------------------------------------------------------------------------*/
	@Override
	public Admin getAdminDetails(int id){
		
		return adminDAO.getAdminDetails(id);
	}
	
/*-------- GET ALL ADMIN'S ------------------------------------------------------------------------------------*/
	@Override
	public List<Admin> getAllAdmin(String name){
		
		return adminDAO.getAllAdmin(name);
	}
	
/*------- LEAVE A MESSAGE FOR OTHER ADMINS, ('Leave Message' button) SAVE IN THE DATABASE ---------------------------------*/
	@Override
	public Admin addAdminMessage(int recipientId, String message, int senderId){
		
		adminDAO.addAdminMessage(recipientId, message, senderId);
		
		return getAdminDetails(recipientId);
	}
}
