package com.tomas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tomas.dao.BottomPanelReportsDAO;
import com.tomas.dao.MemberDAO;
import com.tomas.model.Member;

public class MemberServiceImplementation implements MemberService{
	
	@Autowired
	MemberDAO memberDAO;
	
	@Autowired
	BottomPanelReportsDAO bottomPanelReportsDAO;

	/*------------- GET TOTAL NUMBER OF MEMBERS IN THE DATABASE ------------------------------------------------------------------*/
	@Override
	public int getTotalMembers(){
		
		return memberDAO.getTotalMembers();
	}
	
/*------------- ADD A NEW MEMBER TO THE DATABASE -----------------------------------------------------------------------------*/
	@Override
	public void addMember(Member member) {
		
		memberDAO.addMember(member);
	}
	
/*------------ INSERT RECENTLY VISITED MEMBER ------------------------------------------------------------*/
	@Override
	public int insertRecentlyVisited(String id){
		
		// insert visited member into the database
		memberDAO.insertRecentlyVisited(id);
		
		// get updated number of the visits count in the gym
		return bottomPanelReportsDAO.getVisitsCount();
	}
	
/*------------ RETRIEVE ALL MEMBERS ----------------------------------------------------------------------*/
	@Override
	public List<Member> getMembersList() {
		
		return memberDAO.getMembersList();
	}
	
/*----------- RETRIEVE A MEMBER BY ID ---------------------------------------------------------------------*/
	@Override
	public Member getMemberProfile(int id) {
		
		return memberDAO.getMemberProfile(id);
	}
	
/*-------------- RETRIEVE A MEMBER BY NAME -----------------------------------------------------------------*/
	@Override
	public List<Member> searchMember(String name){
		
		return memberDAO.searchMember(name);
	}
	
/*-------------- UPDATE A MEMBER --------------------------------------------------------------------------*/
	@Override
	public Member updateMember(Member member) {
		
		// get updated member profile
		return memberDAO.updateMember(member);
	}

/*------------ DELETE A MEMBER ---------------------------------------------------------------------------*/
	@Override
	public List<Member> deleteMember(String id) {
		
		return memberDAO.deleteMember(id);
		
		//return getMembersList();
	}
	
/*------------ RETRIEVE LAST ATTENDED MEMBER TO THE GYM --------------------------------------------------*/
	@Override
	public Member getLastAttendedMember(){
		
		return memberDAO.getLastAttendedMember();
	}
	
/*------------ RETRIEVE RECENTLY BOOKED MEMBERSHIP MEMBER ------------------------------------------------*/
	@Override
	public Member getRecentlyBookedMembership(){
		
		return memberDAO.getRecentlyBookedMembership();
	}
/*------------ RETRIEVE RECENTLY JOINED MEMBER -----------------------------------------------------------*/
	@Override
	public Member getRecentlyJoined(){
		
		return memberDAO.getRecentlyJoined();
	}
}
