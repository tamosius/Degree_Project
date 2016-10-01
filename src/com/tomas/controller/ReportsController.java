package com.tomas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.bean.Member;
import com.tomas.dao.ReportsInterface;

@RestController
@RequestMapping(value="/reportsController")
public class ReportsController{
	
	// wired to 'ReportsImplementation' class
	@Autowired
	ReportsInterface reports;
	
/*--------- MEMBER TYPE QUERIES --------------------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getNewMembers", method=RequestMethod.POST, headers="Accept=application/json")
    public List<Member> getNewMembers(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){       // get new members list who joined in specified period of time
		
		return reports.getNewMembers(startDate, endDate);
	}      
	
	@RequestMapping(value="/getMembersBookings", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getMembersBookings(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){  // get members booking made in the specified period of time
		
		return reports.getMembersBookings(startDate, endDate);
	}
	
	@RequestMapping(value="/getValidMembersBookings", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getValidMembersBookings(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){  // get members booking made in the specified period of time
		
		return reports.getValidMembersBookings(startDate, endDate);
	}
	
	@RequestMapping(value="/getBirthdayList", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getBirthdayList(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){    // get members booking made in the specified period of time
		
		return reports.getBirthdayList(startDate, endDate);
	}
	
	@RequestMapping(value="/getExpireMemberships", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getExpiredMemberships(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){    // get members booking made in the specified period of time
		
		return reports.getExpireMemberships(startDate, endDate);
	}
	
	@RequestMapping(value="/getMissingMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getMissingMembers(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {    // get members who haven't attended in the specified period of time
		
		return reports.getMissingMembers(startDate, endDate);
	}
	
	@RequestMapping(value="/getMemberVisitedDatesTimes", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getMemberVisitedDatesTimes(@RequestParam("id") String id){
		
		return reports.getMemberVisitedDatesTimes(id);
	}
	
	@RequestMapping(value="/getValuedMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getMemberVisitedDatesTimes(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
		
		return reports.getValuedMembers(startDate, endDate);
	}
	
	
/*--------- PERSONAL TRAINER TYPE QUERIES ----------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getTrainerPerformance", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getTrainerPerformance(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){ // get members booking made in the specified period of time
		
		return reports.getTrainerPerformance(startDate, endDate);
	}
	
	@RequestMapping(value="/getTrainerSessions", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getTrainerSessions(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){   // get members booking made in the specified period of time
		
		return reports.getTrainerSessions(startDate, endDate);
				
	}
}
