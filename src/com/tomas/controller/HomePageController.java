package com.tomas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.bean.Member;
import com.tomas.dao.MemberDao;

/**
 * 
 * This is spring MVC controller class to hold code for flowing data across application.
 *
 */

@RestController // This annotation eliminates the need of annotating each method with @ResponseBody, and can be considered as combination of @Controller and @ResponseBody.
@RequestMapping(value="/contr")
public class HomePageController {
	
	// wired to 'MemberDaoImplementation' class
	@Autowired
	MemberDao memberDao;		
	
/*------------- GET TOTAL NUMBER OF MEMBERS IN THE DATABASE ------------------------------------------------*/
	@RequestMapping(value="/getTotalMembers", method=RequestMethod.GET)
	public int getTotalMembers(){
		
		return memberDao.getTotalMembers();
	}

/*--------------- ADD A NEW MEMBER TO THE DATABASE ---------------------------------------------------------*/
	@RequestMapping(value="/addMember", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> addMember(@RequestBody Member member) {
		
		memberDao.addMember(member);
	
		return getMembersList();
	}
	
/*--------------- INSERT RECENTLY VISITED MEMBER -----------------------------------------------------------*/
	@RequestMapping(value="/insertRecentlyVisited", method=RequestMethod.POST, headers="Accept=application/json")
	public int insertRecentlyVisited(@RequestParam("memberId") String id){
		
		return memberDao.insertRecentlyVisited(id);
	}

/*--------------- RETRIEVE ALL MEMBERS ---------------------------------------------------------------------*/
	@RequestMapping(value="/getAllMembers", method=RequestMethod.GET, headers="Accept=application/json")
	public List<Member> getMembersList() {
		System.out.println("first");
		return memberDao.getMembersList();  // return all members list from the database
	}

/*-------------- RETRIEVE A MEMBER BY ID -------------------------------------------------------------------*/
	@RequestMapping(value="/memberProfile", method=RequestMethod.POST, headers="Accept=application/json")
	public Member getMemberProfile(@RequestParam("id") int id) {
		
		return memberDao.getMemberProfile(id);
	}
	
/*-------------- RETRIEVE A MEMBER(S) BY NAME -----------------------------------------------------------------*/
	@RequestMapping(value="/searchMember", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> searchMember(@RequestBody String name){
		
		return memberDao.searchMember(name);
	}

/*-------------- UPDATE A MEMBER ---------------------------------------------------------------------------*/
	@RequestMapping(value="/updateMember", method=RequestMethod.POST, headers="Accept=application/json")
	public Member updateMember(@RequestBody Member member) {
		
		return memberDao.updateMember(member);
	}

/*-------------- DELETE A MEMBER ---------------------------------------------------------------------------*/
	@RequestMapping(value="/deleteMember", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> deleteMember(@RequestParam String id) {
		System.out.println("id = " + id);
		return memberDao.deleteMember(id);
	}
	
/*-------------- RETRIEVE LAST ATTENDED MEMBER TO THE GYM --------------------------------------------------*/
	@RequestMapping(value="/lastAttendedMember", method=RequestMethod.GET, headers="Accept=application/json")
	public Member getLastAttendedMember(){
		
		return memberDao.getLastAttendedMember();
	}
	
/*-------------- RETRIEVE RECENTLY BOOKED MEMBERSHIP -------------------------------------------------------*/
	@RequestMapping(value="/recentlyBookedMembership", method=RequestMethod.GET, headers="Accept=application/json")
	public Member getRecentlyBookedMembership(){
		
		return memberDao.getRecentlyBookedMembership();
	}
	
/*-------------- RETRIEVE RECENTLY JOINED MEMBER -----------------------------------------------------------*/
	@RequestMapping(value="/recentlyJoined", method=RequestMethod.GET, headers="Accept=application/json")
	public Member getRecentlyJoined(){
		
		return memberDao.getRecentlyJoined();
	}
}
