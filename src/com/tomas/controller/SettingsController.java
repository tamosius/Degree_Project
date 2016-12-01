package com.tomas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.model.Member;
import com.tomas.model.Settings;
import com.tomas.service.SettingsService;

@RestController
@RequestMapping(value="/settings")	
public class SettingsController {
	
	// wired to 'SettingsImplementation' class
	@Autowired
	SettingsService settingsService;
	
/*------ GET ADMIN DETAILS BY ID ----------------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getAdminDetails", method=RequestMethod.POST, headers="Accept=application/json")
	public Member getAdminDetails(@RequestParam("id") String id){
		
		return settingsService.getAdminDetails(id);
	}
	
/*------ ADD NEW PROGRAMME TO THE DATABASE ------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/addProgramme", method=RequestMethod.POST, headers="Accept=application/json")
	public Settings addProgramme(@RequestBody Settings programme){
		
		return settingsService.addProgramme(programme);
	}
	
/*------ GET PROGRAMMES DETAILS BY ID -----------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getProgrammeDetails", method=RequestMethod.POST, headers="Accept=application/json")
	public Settings getProgrammeDetails(@RequestParam("id")int id){
		
		return settingsService.getProgrammeDetails(id);
	}
	
/*------- UPDATE PARTICULAR PROGRAMME SETTINGS BY PROGRAMME ID (price, discount, etc.) ----------------------------------------------*/
	@RequestMapping(value="/updateProgrammeSettings", method=RequestMethod.POST, headers="Accept=application/json")
	public Settings updateProgrammeDetails(@RequestBody Settings programme){
		
		return settingsService.updateProgrammeSettings(programme);
	}
	
/*------ GET SALES DETAILS BY ID ----------------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getSalesDetails", method=RequestMethod.POST, headers="Accept=application/json")
	public Settings getSalesDetails(@RequestParam("id") String id){
		
		return settingsService.getSalesDetails(id);
	}
}
