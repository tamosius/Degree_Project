package com.tomas.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;


public class Authentication implements Controller{
	
	protected final Log logger = LogFactory.getLog(getClass());
	
	// just added a new line here 

	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response)
	         throws ServletException, IOException{
		
		logger.info("Authenticating page");
		System.out.println("request: " + request);
		return new ModelAndView("index");
	}
	
	
}
