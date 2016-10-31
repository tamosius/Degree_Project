package com.tomas.service;

import java.util.List;

import com.tomas.model.Member;

public interface MemberService {

	public int getTotalMembers();                  // get total number of members in the database

	public void addMember(Member member);          // add member to the database
	
	public int insertRecentlyVisited(String id);   // insert recently visited member's ID and the time stamp

	public List<Member> getMembersList();          // get whole members list
	
	public Member getMemberProfile(int id);        // get member details by ID
	
	public List<Member> searchMember(String name); // search member(s) by name

	public Member updateMember(Member member);     // update member details or status

	public List<Member> deleteMember(String id);   // delete member from the database
	
	public Member getLastAttendedMember();         // get last attended member to the gym

	public Member getRecentlyJoined();             // get recently joined member details
    
	public Member getRecentlyBookedMembership();   // get recently booked membership member details
}
