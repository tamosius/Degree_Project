package com.tomas.dao;

import java.util.List;

import com.tomas.model.Member;

public interface BottomPanelReportsDAO {

	public int getVisitsCount();                                             // get the count of today's visits in the gym
	
	public List<Member> getTodaysVisitedMembers();                           // get names and details of todays visited members
	
	public List<Member> getProgrammeTypeMembers(String programmeType);       // get members by specified programme type 
	                                                                         // ('1 Month Membership', '3 Months Membership', etc)
	
	public List<Member> getPayAsYouGoMembers(String programmeType);          // get members who have 'Pay as You Go' programme
	
	public List<Member> getOtherProgrammesMembers(String programmeType);     // get 'Other' programmes members
	
	public int getCountProgrammesTypes(String programme);                    // get members counts grouped by the programme type
	
	public List<Member> getVisitedMembersBySpecifiedWeeks(String startDate); // get visited members by the specified period of weeks (1 Week, 2 Weeks, 4 Weeks, etc..) 
	
	public int getVisitedMembersCountBySpecifiedWeeks(int numberOfDays);     // get visited members count by the specified period of weeks (days)
}
