package com.tomas.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.model.Member;

public interface MemberService {

	public int getTotalMembers();                  // get total number of members in the database

	public Member addMember(HttpServletRequest request, CommonsMultipartFile image);        // add member to the database
	
	public Member updateMember(HttpServletRequest request, CommonsMultipartFile image);     // update member details or status
	
	public int insertRecentlyVisited(String id, float toPay);   // insert recently visited member's ID and the time stamp

	public List<Member> getMembersList(String idName);          // get whole members list
	
	public Member getMemberProfile(int id);        // get member details by ID
	
	public List<Member> searchMember(String name); // search member(s) by name
	
	public List<Member> searchByNameOrId(String nameOrId);          // search members by name or id

	public String deleteMember(HttpServletRequest request, int id); // delete member from the database
	
	public Member getLastAttendedMember();         // get last attended member to the gym

	public Member getRecentlyJoined();             // get recently joined member details
    
	public Member getRecentlyBookedMembership();   // get recently booked membership member details
	
	public List<Member> getProgrammesHistory(int id);
}
