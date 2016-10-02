package com.tomas.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


/*public class Authentication implements Controller{
	
	protected final Log logger = LogFactory.getLog(getClass());
	
	// just added a new line here 

	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response)
	         throws ServletException, IOException{
		
		logger.info("Authenticating page");
		System.out.println("request: " + request);
		return new ModelAndView("index");
	}
	
	
}*/
@RestController // This annotation eliminates the need of annotating each method with @ResponseBody, and can be considered as combination of @Controller and @ResponseBody.
//@RequestMapping(value="/authentication")
public class Authentication{
	
	protected final Log logger = LogFactory.getLog(getClass());
	
		@RequestMapping(value="/authenticate", method=RequestMethod.POST)
		public ModelAndView authenticate(){
			
			logger.info("Printing something..!");
			
			return new ModelAndView("index");
		}
	
	/*@RequestMapping(value="/authenticate", method=RequestMethod.POST)
	public void authenticate(){
		
		logger.info("Printing something..!");
		
		authenticat();
	}*/
}
