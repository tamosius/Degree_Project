package com.tomas.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.model.Member;
import com.tomas.service.MemberService;

@RestController // This annotation eliminates the need of annotating each method with @ResponseBody, and can be considered as combination of @Controller and @ResponseBody.
@RequestMapping(value="/contr")
public class MemberController {
	
	// wired to 'MemberDaoImplementation' class
	@Autowired
	MemberService memberService;		
	
/*------------- GET TOTAL NUMBER OF MEMBERS IN THE DATABASE ------------------------------------------------*/
	@RequestMapping(value="/getTotalMembers", method=RequestMethod.GET)
	public int getTotalMembers(){
		
		return memberService.getTotalMembers();
	}

/*--------------- ADD A NEW MEMBER TO THE DATABASE ---------------------------------------------------------*/
	@RequestMapping(value="/addMember", method=RequestMethod.POST, headers="Accept=application/json")
	public Member addMember(HttpServletRequest request, @RequestParam CommonsMultipartFile newMemberImage) {
		
		return memberService.addMember(request, newMemberImage);
	}
	
/*-------------- UPDATE A MEMBER ---------------------------------------------------------------------------*/
	@RequestMapping(value="/updateMember", method=RequestMethod.POST, headers="Accept=application/json")
	public Member updateMember(HttpServletRequest request, @RequestParam CommonsMultipartFile memberProfileImage) {
		
		return memberService.updateMember(request, memberProfileImage);
	}
	
/*--------------- INSERT RECENTLY VISITED MEMBER -----------------------------------------------------------*/
	@RequestMapping(value="/insertRecentlyVisited", method=RequestMethod.POST, headers="Accept=application/json")
	public int insertRecentlyVisited(@RequestParam("memberId") String id){
		
		return memberService.insertRecentlyVisited(id);
	}

/*--------------- RETRIEVE ALL MEMBERS ---------------------------------------------------------------------*/
	@RequestMapping(value="/getAllMembers", method=RequestMethod.GET, headers="Accept=application/json")
	public List<Member> getMembersList() {
		
		return memberService.getMembersList();  // return all members list from the database
	}

/*-------------- RETRIEVE A MEMBER BY ID -------------------------------------------------------------------*/
	@RequestMapping(value="/memberProfile", method=RequestMethod.POST, headers="Accept=application/json")
	public Member getMemberProfile(@RequestParam("id") int id) {
		
		return memberService.getMemberProfile(id);
	}
	
/*-------------- RETRIEVE A MEMBER(S) BY NAME -----------------------------------------------------------------*/
	@RequestMapping(value="/searchMember", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> searchMember(@RequestBody String name){
		
		return memberService.searchMember(name);
	}
	
/*-------------- SEARCH MEMBER(S) BY NAME OR ID -/-------------------------------------------------------------*/
	@RequestMapping(value="/searchByNameOrId", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> searchByNameOrId(@RequestParam("name") String nameOrId){
		
		return memberService.searchByNameOrId(nameOrId);
	}

/*-------------- DELETE A MEMBER ---------------------------------------------------------------------------*/
	@RequestMapping(value="/deleteMember", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> deleteMember(@RequestParam String id) {
		
		return memberService.deleteMember(id);
	}
	
/*-------------- RETRIEVE LAST ATTENDED MEMBER TO THE GYM --------------------------------------------------*/
	@RequestMapping(value="/lastAttendedMember", method=RequestMethod.GET, headers="Accept=application/json")
	public Member getLastAttendedMember(){
		
		return memberService.getLastAttendedMember();
	}
	
/*-------------- RETRIEVE RECENTLY BOOKED MEMBERSHIP -------------------------------------------------------*/
	@RequestMapping(value="/recentlyBookedMembership", method=RequestMethod.GET, headers="Accept=application/json")
	public Member getRecentlyBookedMembership(){
		
		return memberService.getRecentlyBookedMembership();
	}
	
/*-------------- RETRIEVE RECENTLY JOINED MEMBER -----------------------------------------------------------*/
	@RequestMapping(value="/recentlyJoined", method=RequestMethod.GET, headers="Accept=application/json")
	public Member getRecentlyJoined(){
		
		return memberService.getRecentlyJoined();
	}
}
