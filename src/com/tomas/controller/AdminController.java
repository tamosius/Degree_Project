package com.tomas.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.tomas.bean.Admin;
import com.tomas.dao.interfaces.AdminInterface;
import com.tomas.hashPassword.HashPassword;

@RestController
// This annotation eliminates the need of annotating each method with
// @ResponseBody, and can be considered as combination of @Controller and
// @ResponseBody.
@RequestMapping(value = "/admin")
public class AdminController implements com.tomas.dao.interfaces.AdminInterface{

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

	@Autowired
	AdminInterface admin;
	
	@Autowired
	HashPassword hashPassword;

/*------ AUTHENTICATE THE ADMIN USER ON LOGIN PAGE -----------------------------------------------------------------------------------*/
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ModelAndView authenticate(@RequestBody Admin admin) {

		logger.info("Printing something..!" + admin.getUsername() + " "
				+ admin.getPassword());
		logger.info("Hashed password received: "
				+ hashPassword.getHashPassword(admin.getPassword()));

		return new ModelAndView("index", "msg", "working!");
	}
	
/*------ ADD NEW ADMIN USER TO THE DATABASE ------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/addAdmin", method=RequestMethod.POST, headers="Accept=application/json")
	public Admin addAdmin(@RequestBody Admin admin){
		
		return this.admin.addAdmin(admin);
	}
	
/*------ GET ADMIN DETAILS BY ID -----------------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getAdminDetails", method=RequestMethod.POST, headers="Accept=application/json")
	public Admin getAdminDetails(@RequestParam("id") int id){
		
		return admin.getAdminDetails(id);
	}

}
