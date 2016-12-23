package com.tomas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import com.tomas.dao.ReportsDAO;
import com.tomas.model.Member;
import com.tomas.model.Statistics;

public class ReportsServiceImplementation implements ReportsService{
	
	@Autowired
	ReportsDAO reportsDAO;

	/*--------- MEMBER TYPE QUERIES --------------------------------------------------------------------------------------------------------*/
	/*----- get new members list who joined in specified period of time ----------------------------------------------------------------*/
	@Override
    public List<Member> getNewMembers(String startDate, String endDate){  
		
		return reportsDAO.getNewMembers(startDate, endDate);
	} 

/*--------- NEW SIGNUPS STATISTICS ----------------------------------------------------------------------------------------------------------*/
	public List<Statistics> getNewMembersStatistics(String startDate, String endDate){
		
		return reportsDAO.getNewMembersStatistics(startDate, endDate);
	}
	
/*===========================================================================================================================================*/
	/*------ get members booking made in the specified period of time -----------------------------------------------------------------------*/
	@Override
	public List<Member> getMembersBookings(String startDate, String endDate){   
		
		return reportsDAO.getMembersBookings(startDate, endDate);
	}
	
/*--------- NEW BOOKINGS MADE STATISTICS ------------------------------------------------------------------------------------------------*/
	public List<Statistics> getMembersBookingsStatistics(String startDate, String endDate){
		
		return reportsDAO.getMembersBookingsStatistics(startDate, endDate);
	}
	
	/*------ get members with the valid memberships in the specified period of time -------------------------------------*/
	@Override
	public List<Member> getValidMembersBookings(@RequestBody String startDate, String endDate){   
		
		return reportsDAO.getValidMembersBookings(startDate, endDate);
	}
	
	/*------ get members birthdays in the specified period of time --------------------------------------------------------------------*/
	@Override
	public List<Member> getBirthdayList(@RequestBody String startDate, String endDate){   
		
		return reportsDAO.getBirthdayList(startDate, endDate);
	}
	
	/*------ get members with the expiring memberships in the specified period of time -------------------------------------------------*/
	@Override
	public List<Member> getExpireMemberships(@RequestBody String startDate, String endDate){  
		
		return reportsDAO.getExpireMemberships(startDate, endDate);
	}
	
	/*------ get members who haven't attended in the specified period of time ----------------------------------------------------------*/
	@Override
	public List<Member> getMissingMembers(String startDate, String endDate){
		
		return reportsDAO.getMissingMembers(startDate, endDate);
	}
	
    /*--------- get member visited dates and times by ID -------------------------------------------------------------------------------*/
	@Override
	public List<Member> getMemberVisitedDatesTimes(String id){
		
		return reportsDAO.getMemberVisitedDatesTimes(id);
	}
	
	/*----- get valued members (mostly spent on programmes and products) ---------------------------------------------------------------*/
	@Override
	public List<Member> getValuedMembers(String startDate, String endDate){
		
		return reportsDAO.getValuedMembers(startDate, endDate);
	}
	
	/*----- GET VALUED MEMBERS (mostly spent on programmes and products) BY ID OR NAME -------------------------------------------------*/
	@Override
	public List<Member> getValuedMembersByIDName(String name){
		
		return reportsDAO.getValuedMembersByIDName(name);
	}
	
/*--------- PERSONAL TRAINER TYPE QUERIES ----------------------------------------------------------------------------------------------*/
	/*@Override
	public List<Member> getTrainerPerformance(@RequestBody String startDate, String endDate){ // get members booking made in the specified period of time
		
		
	}
	
	@Override
	public List<Member> getTrainerSessions(@RequestBody String startDate, String endDate){   // get members booking made in the specified period of time
		
        
	}*/
}
