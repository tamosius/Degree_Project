package com.tomas.service;

import java.util.List;

import com.tomas.model.Member;

public interface BottomPanelReportsService {
	
    public int getVisitsCount();                                             // get the count of today's visits in the gym
	
	public List<Member> getTodaysVisitedMembers(String idName);              // get names and details of todays visited members, and by ID or name also
	
	public List<Member> getProgrammeTypeMembers(String programmeType, String name);// get members by specified programme type 
	                                                                         // ('1 Month Membership', '3 Months Membership', etc)
	                                                                         // and also by ID or name
	
	public List<Member> getPayAsYouGoMembers(String programmeType);          // get members who have 'Pay as You Go' programme
	
	public List<Member> getOtherProgrammesMembers(String programmeType);     // get 'Other' programmes members
	
	public int getCountProgrammesTypes(String programme);                    // get members counts grouped by the programme type
	
	public List<Member> getVisitedMembersBySpecifiedWeeks(String startDate, String idName); // get visited members by the specified period of weeks (1 Week, 2 Weeks, 4 Weeks, etc..) 
	
	public int getVisitedMembersCountBySpecifiedWeeks(int numberOfDays);     // get visited members count by the specified period of weeks (days)
}
