package com.tomas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tomas.dao.BottomPanelReportsDAO;
//import com.tomas.dao.BottomPanelReportsDAO;
import com.tomas.model.Member;

public class BottomPanelReportsServiceImplementation implements BottomPanelReportsService{
	
	@Autowired
	BottomPanelReportsDAO bottomPanelReportsDAO;

	/*-------- GET COUNT OF TODAY'S VISITS IN THE GYM --------------------------------------------------------------------------*/
	@Override
	public int getVisitsCount(){
		
		return bottomPanelReportsDAO.getVisitsCount();
	}
	
/*------- GET NAMES AND DETAILS OF TODAYS VISITED MEMBERS ------------------------------------------------------------------*/
	@Override
	public List<Member> getTodaysVisitedMembers(String idName){
		
		return bottomPanelReportsDAO.getTodaysVisitedMembers(idName);
	}
	
/*---------- GET MEMBERS BY SPECIFIED PROGRAMME TYPE ('1 Month Membership', '3 Months Membership', etc.) -------------------*/
	@Override
	public List<Member> getProgrammeTypeMembers(String programmeType, String name){
		
		return bottomPanelReportsDAO.getProgrammeTypeMembers(programmeType, name);
	}

/*--------- GET 'Pay as You Go' MEMBERS ------------------------------------------------------------------------------------*/
	@Override
	public List<Member> getPayAsYouGoMembers(String programmeType){
		
		return bottomPanelReportsDAO.getPayAsYouGoMembers(programmeType);
	}
	
/*-------- GET 'Other' PROGRAMMES MEMBERS -----------------------------------------------------------------------------------*/
	@Override
	public List<Member> getOtherProgrammesMembers(String programmeType){
		
		return bottomPanelReportsDAO.getOtherProgrammesMembers(programmeType);
	}
	
/*---------- GET MEMBERS COUNT GROUPED BY THE MEMBERSHIP/PROGRAMME TYPE ---------------------------------------------------------------*/
	@Override
	public int getCountProgrammesTypes(String programme){
		
		return bottomPanelReportsDAO.getCountProgrammesTypes(programme);
	}
	
/*---------- GET VISITED MEMBERS BY THE SPECIFIED PERIOD OF WEEKS (1 Week, 2 Weeks, 4 Weeks, etc..) -----------------------------------*/
	@Override
	public List<Member> getVisitedMembersBySpecifiedWeeks(String startDate, String idName){
		
		return bottomPanelReportsDAO.getVisitedMembersBySpecifiedWeeks(startDate, idName);
	}
	
/*------------ GET VISITED MEMBER COUNT BY THE SPECIFIED PERIOD OF WEEKS (DAYS) -----------------------------------------------------------*/
	@Override
	public int getVisitedMembersCountBySpecifiedWeeks(int numberOfDays){
		
		return bottomPanelReportsDAO.getVisitedMembersCountBySpecifiedWeeks(numberOfDays);
	}
}

