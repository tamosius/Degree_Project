package com.tomas.dao;

import java.util.List;

import com.tomas.model.Member;

/**
 * 
 *  Java interface containing unimplemented methods to perform insert, update and delete functionality in DB
 *
 */

public interface MemberDAO {
	
	public int getTotalMembers();                  // get total number of members in the database

	public Member addMember(Member member);        // add member to the database
	
	public void insertImagePath(int id, String path); // insert image path 
	
	public int insertRecentlyVisited(String id);   // insert recently visited member's ID and the time stamp

	public List<Member> getMembersList();          // get whole members list
	
	public Member getMemberProfile(int id);        // get member details by ID
	
	public List<Member> searchMember(String name); // search member(s) by name
	
	public List<Member> searchByNameOrId(String nameOrId); // search members by name or id

	public Member updateMember(Member member);     // update member details or status

	public List<Member> deleteMember(String id);   // delete member from the database
	
	public Member getLastAttendedMember();         // get last attended member to the gym

	public Member getRecentlyJoined();             // get recently joined member details
    
	public Member getRecentlyBookedMembership();   // get recently booked membership member details
}
