package com.tomas.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.tomas.bean.Admin;
import com.tomas.hashPassword.HashPassword;

/*----------- ADD OR AUTHENTICATE ADMIN ---------------------------------------------------------------------------------------------*/

@RestController
// This annotation eliminates the need of annotating each method with
// @ResponseBody, and can be considered as combination of @Controller and
// @ResponseBody.
@RequestMapping(value = "/admin")
public class AdminController {

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
	HashPassword hashPassword;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ModelAndView authenticate(@RequestBody Admin admin) {

		logger.info("Printing something..!" + admin.getUsername() + " "
				+ admin.getPassword());
		logger.info("Hashed password received: "
				+ hashPassword.getHashPassword(admin.getPassword()));

		return new ModelAndView("index", "msg", "working!");
	}

}
