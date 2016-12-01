package com.tomas.dao;

import java.util.List;

import com.tomas.model.Member;

/**
 * 
 * Interface containing unimplemented methods to perform Reports queries
 * from 'reports.jsp' and 'reports.js' pages
 *
 */

public interface ReportsDAO{
	
/*--------- MEMBER TYPE QUERIES --------------------------------------------------------------------------------------------------------*/
	public List<Member> getNewMembers(String startDate, String endDate);          // get new members list who joined in specified period of time
	
	public List<Member> getMembersBookings(String startDate, String endDate);     // get members booking made in the specified period of time
	
	public List<Member> getValidMembersBookings(String startDate, String endDate);// get members with the valid memberships in the specified period of time
	
	public List<Member> getBirthdayList(String startDate, String endDate);        // get members booking made in the specified period of time
	
	public List<Member> getExpireMemberships(String startDate, String endDate);   // get members booking made in the specified period of time
	
	public List<Member> getMissingMembers(String startDate, String endDate);      // get members who haven't attended in the specified period of time
	
	public List<Member> getMemberVisitedDatesTimes(String id);                    // get all visited dates and times by ID
	
	public List<Member> getValuedMembers(String startDate, String endDate);       // get valued members (mostly spent on programmes and products)
	
/*--------- PERSONAL TRAINER TYPE QUERIES ----------------------------------------------------------------------------------------------*/
	//public List<Member> getTrainerPerformance(String startDate, String endDate); // get members booking made in the specified period of time
	
	//public List<Member> getTrainerSessions(String startDate, String endDate);    // get members booking made in the specified period of time
	
/*--------- FINANCIAL TYPE QUERIES -----------------------------------------------------------------------------------------------------*/
	//public List<Member> getMembersBookings(String startDate, String endDate); // get members booking made in the specified period of time
	
	//public List<Member> getMembersBookings(String startDate, String endDate); // get members booking made in the specified period of time
	
	//public List<Member> getMembersBookings(String startDate, String endDate); // get members booking made in the specified period of time
	
	//public List<Member> getMembersBookings(String startDate, String endDate); // get members booking made in the specified period of time
	
	//public List<Member> getMembersBookings(String startDate, String endDate); // get members booking made in the specified period of time
	
	//public List<Member> getMembersBookings(String startDate, String endDate); // get members booking made in the specified period of time
}
