package com.tomas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.model.Member;
import com.tomas.service.BottomPanelReportsService;

@RestController
@RequestMapping(value="/bottomPanelReportsController")
public class BottomPanelReportsController {

	// wired to 'BottomPanelReports' class
	@Autowired
	BottomPanelReportsService bottomPanelReportsService;
	
/*-------- GET COUNT OF TODAY'S VISITS IN THE GYM ---------------------------------------------------------------------------*/
	@RequestMapping(value="/getVisitsCount", method=RequestMethod.GET)
	public int getVisitsCount(){
		
		return bottomPanelReportsService.getVisitsCount();
	}
	
/*-------- GET NAMES AND DETAILS OF TODAYS VISITED MEMBERS ------------------------------------------------------------------*/
	@RequestMapping(value="/getTodaysVisitedMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getTodaysVisitedMembers(@RequestParam("name") String idName){
		
		return bottomPanelReportsService.getTodaysVisitedMembers(idName);
	}
	
/*-------- GET MEMBERS BY SPECIFIED PROGRAMME TYPE ('1 Month Membership', '3 Months Membership', etc.) ----------------------*/
	@RequestMapping(value="/getProgrammeTypeMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getProgrammeTypeMembers(@RequestParam("programmeType") String programmeType,
			@RequestParam("name") String name)	{
		
		return bottomPanelReportsService.getProgrammeTypeMembers(programmeType, name);	
	}
	
/*-------- GET 'Pay as You Go' MEMBERS --------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getPayAsYouGoMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getPayAsYouGoMembers(@RequestParam("programmeType") String programmeType){
		
		return bottomPanelReportsService.getPayAsYouGoMembers(programmeType);
	}
	
/*-------- GET 'Other' PROGRAMMES MEMBERS -----------------------------------------------------------------------------------*/
	@RequestMapping(value="/getOtherProgrammesMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getOtherProgrammesMembers(@RequestParam("programmeType") String programmeType){
		
		return bottomPanelReportsService.getOtherProgrammesMembers(programmeType);
	}
	
/*-------- GET MEMBERS COUNT GROUPED BY THE MEMBERSHIP/PROGRAMME TYPE -------------------------------------------------------*/
	@RequestMapping(value="/getCountProgrammesTypes", method=RequestMethod.POST)
	public int getCountProgrammesTypes(@RequestParam("programme") String programme){
		System.out.println("programme: " + programme);
		return bottomPanelReportsService.getCountProgrammesTypes(programme);
	}
	
	
/*-------- GET VISITED MEMBERS BY THE SPECIFIED PERIOD OF WEEKS (1 Week, 2 Weeks, 4 Weeks, etc..) ---------------------------*/
	@RequestMapping(value="/getVisitedMembersBySpecifiedWeeks", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getVisitedMembersBySpecifiedWeeks(@RequestParam("startDate") String startDate,
			@RequestParam("name") String idName){
		
		return bottomPanelReportsService.getVisitedMembersBySpecifiedWeeks(startDate, idName);
	}
	
/*------------ GET VISITED MEMBER COUNT BY THE SPECIFIED PERIOD OF WEEKS (DAYS) ---------------------------------------------*/
	@RequestMapping(value="/getVisitedMembersCountBySpecifiedWeeks", method=RequestMethod.POST)
	public int getVisitedMembersCountBySpecifiedWeeks(@RequestParam("numberOfDays") int numberOfDays){
		
		return bottomPanelReportsService.getVisitedMembersCountBySpecifiedWeeks(numberOfDays);
	}
}
