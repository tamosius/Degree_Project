package com.tomas.controller;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.tomas.model.Admin;
import com.tomas.service.AdminService;

@RestController
// This annotation eliminates the need of annotating each method with
// @ResponseBody, and can be considered as combination of @Controller and
// @ResponseBody.
@RequestMapping(value = "/admin")
public class AdminController{

	/*
	 * public class Authentication implements Controller{
	 * 
	 * protected final Log logger = LogFactory.getLog(getClass());
	 * 
	 * // just added a new line here
	 * 
	 * public ModelAndView handleRequest(HttpServletRequest request,
	 * HttpServletResponse response) throws ServletException, IOException{
	 * 
	 * logger.info("Authenticating page"); System.out.println("request: " +
	 * request); return new ModelAndView("index"); }
	 * 
	 * 
	 * }
	 */

	protected final Log logger = LogFactory.getLog(getClass());

	// wired to 'AdminImplementation' class
	@Autowired
	AdminService adminService;
	

/*------ AUTHENTICATE THE ADMIN USER ON LOGIN PAGE -----------------------------------------------------------------------------------*/
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ModelAndView authenticate(@RequestBody Admin admin) {
		
		return adminService.authenticate(admin);
	}
	
/*------ ADD NEW ADMIN USER TO THE DATABASE ------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/addAdmin", method=RequestMethod.POST, headers="Accept=application/json")
	public Admin addAdmin(@RequestBody Admin admin){
		
		return adminService.addAdmin(admin);
	}
	
/*------ GET ADMIN DETAILS BY ID -----------------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getAdminDetails", method=RequestMethod.POST, headers="Accept=application/json")
	public Admin getAdminDetails(@RequestParam("id") int id){
		
		return adminService.getAdminDetails(id);
	}
	
/*------ GET ALL ADMIN'S --------------------------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getAllAdmin", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Admin> getAllAdmin(@RequestParam ("name") String name){
		
		return adminService.getAllAdmin(name);
	}
	
/*------- LEAVE A MESSAGE FOR OTHER ADMINS, ('Leave Message' button) SAVE IN THE DATABASE ---------------------------------*/
	@RequestMapping(value="/addAdminMessage", method=RequestMethod.POST, headers="Accept=application/json")
	public Admin addAdminMessage(@RequestParam ("messageTo") int messageTo,
			@RequestParam ("message") String message, @RequestParam ("messageFrom") int messageFrom){
		
		return adminService.addAdminMessage(messageTo, message, messageFrom);
	}

}
