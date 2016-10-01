package com.tomas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.bean.Member;
import com.tomas.dao.BottomPanelReports;

@RestController
@RequestMapping(value="/bottomPanelReportsController")
public class BottomPanelReportsController {

	// wired to 'BottomPanelReports' class
	@Autowired
	BottomPanelReports bottomPanelReports;
	
/*-------- GET COUNT OF TODAY'S VISITS IN THE GYM ---------------------------------------------------------------------------*/
	@RequestMapping(value="/getVisitsCount", method=RequestMethod.GET)
	public int getVisitsCount(){
		
		return bottomPanelReports.getVisitsCount();
	}
	
/*-------- GET NAMES AND DETAILS OF TODAYS VISITED MEMBERS ------------------------------------------------------------------*/
	@RequestMapping(value="/getTodaysVisitedMembers", method=RequestMethod.GET, headers="Accept=application/json")
	public List<Member> getTodaysVisitedMembers(){
		
		return bottomPanelReports.getTodaysVisitedMembers();
	}
	
/*-------- GET MEMBERS BY SPECIFIED PROGRAMME TYPE ('1 Month Membership', '3 Months Membership', etc.) ----------------------*/
	@RequestMapping(value="/getProgrammeTypeMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getProgrammeTypeMembers(@RequestParam("programmeType") String programmeType)	{
		
		return bottomPanelReports.getProgrammeTypeMembers(programmeType);	
	}
	
/*-------- GET 'Pay as You Go' MEMBERS --------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getPayAsYouGoMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getPayAsYouGoMembers(@RequestParam("programmeType") String programmeType){
		
		return bottomPanelReports.getPayAsYouGoMembers(programmeType);
	}
	
/*-------- GET 'Other' PROGRAMMES MEMBERS -----------------------------------------------------------------------------------*/
	@RequestMapping(value="/getOtherProgrammesMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getOtherProgrammesMembers(@RequestParam("programmeType") String programmeType){
		
		return bottomPanelReports.getOtherProgrammesMembers(programmeType);
	}
	
/*-------- GET MEMBERS COUNT GROUPED BY THE MEMBERSHIP/PROGRAMME TYPE -------------------------------------------------------*/
	@RequestMapping(value="/getCountProgrammesTypes", method=RequestMethod.POST)
	public int getCountProgrammesTypes(@RequestParam("programme") String programme){
		System.out.println("programme: " + programme);
		return bottomPanelReports.getCountProgrammesTypes(programme);
	}
	
	
/*-------- GET VISITED MEMBERS BY THE SPECIFIED PERIOD OF WEEKS (1 Week, 2 Weeks, 4 Weeks, etc..) ---------------------------*/
	@RequestMapping(value="/getVisitedMembersBySpecifiedWeeks", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getVisitedMembersBySpecifiedWeeks(@RequestParam("startDate") String startDate){
		
		return bottomPanelReports.getVisitedMembersBySpecifiedWeeks(startDate);
	}
	
/*------------ GET VISITED MEMBER COUNT BY THE SPECIFIED PERIOD OF WEEKS (DAYS) ---------------------------------------------*/
	@RequestMapping(value="/getVisitedMembersCountBySpecifiedWeeks", method=RequestMethod.POST)
	public int getVisitedMembersCountBySpecifiedWeeks(@RequestParam("numberOfDays") int numberOfDays){
		
		return bottomPanelReports.getVisitedMembersCountBySpecifiedWeeks(numberOfDays);
	}
}
