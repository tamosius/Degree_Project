package com.tomas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.model.Member;
import com.tomas.model.Statistics;
import com.tomas.service.ReportsService;

@RestController
@RequestMapping(value="/reportsController")
public class ReportsController{
	
	// wired to 'ReportsImplementation' class
	@Autowired
	ReportsService reportsService;

/*===========================================================================================================================================*/
/*--------- NEW MEMBERS SIGNUPS -------------------------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getNewMembers", method=RequestMethod.POST, headers="Accept=application/json")
    public List<Member> getNewMembers(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){       // get new members list who joined in specified period of time
		
		return reportsService.getNewMembers(startDate, endDate);
	}
	
/*--------- NEW SIGNUPS STATISTICS ----------------------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getNewMembersStatistics", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Statistics> getNewMembersStatistics(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
			
		return reportsService.getNewMembersStatistics(startDate, endDate);
	}
	
/*============================================================================================================================================*/
	@RequestMapping(value="/getMembersBookings", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getMembersBookings(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){  // get members booking made in the specified period of time
		
		return reportsService.getMembersBookings(startDate, endDate);
	}
	
	@RequestMapping(value="/getMembersBookingsStatistics", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Statistics> getMembersBookingsStatistics(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){  // get members booking made in the specified period of time
		
		return reportsService.getMembersBookingsStatistics(startDate, endDate);
	}
	
/*===========================================================================================================================================*/
	@RequestMapping(value="/getValidMembersBookings", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getValidMembersBookings(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){  // get members booking made in the specified period of time
		
		return reportsService.getValidMembersBookings(startDate, endDate);
	}
	
	@RequestMapping(value="/getBirthdayList", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getBirthdayList(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){    // get members booking made in the specified period of time
		
		return reportsService.getBirthdayList(startDate, endDate);
	}
	
	@RequestMapping(value="/getExpireMemberships", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getExpiredMemberships(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){    // get members booking made in the specified period of time
		
		return reportsService.getExpireMemberships(startDate, endDate);
	}
	
	@RequestMapping(value="/getMissingMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getMissingMembers(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {    // get members who haven't attended in the specified period of time
		
		return reportsService.getMissingMembers(startDate, endDate);
	}
	
	@RequestMapping(value="/getMemberVisitedDatesTimes", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getMemberVisitedDatesTimes(@RequestParam("id") String id){
		
		return reportsService.getMemberVisitedDatesTimes(id);
	}
	
	@RequestMapping(value="/getValuedMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getValuedMembers(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
		
		return reportsService.getValuedMembers(startDate, endDate);
	}
	
/*----- GET VALUED MEMBERS (mostly spent on programmes and products) BY ID OR NAME --------------------------------------------------------*/
	@RequestMapping(value="/getValuedMembersByIDName", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getValuesMembersByIDNames(@RequestParam("name") String name){
		
		return reportsService.getValuedMembersByIDName(name);
	}
	

	
/*--------- PERSONAL TRAINER TYPE QUERIES ----------------------------------------------------------------------------------------------*/
	/*@RequestMapping(value="/getTrainerPerformance", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getTrainerPerformance(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){ // get members booking made in the specified period of time
		
		return reportsService.getTrainerPerformance(startDate, endDate);
	}
	
	@RequestMapping(value="/getTrainerSessions", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getTrainerSessions(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){   // get members booking made in the specified period of time
		
		return reportsService.getTrainerSessions(startDate, endDate);
				
	}*/
}
