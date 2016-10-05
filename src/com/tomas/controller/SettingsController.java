package com.tomas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.bean.Member;
import com.tomas.bean.Settings;
import com.tomas.dao.interfaces.SettingsInterface;

@RestController
@RequestMapping(value="/settings")	
public class SettingsController {
	
	// wired to 'SettingsImplementation' class
	@Autowired
	SettingsInterface settings;
	
/*------ GET ADMIN DETAILS BY ID ----------------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getAdminDetails", method=RequestMethod.POST, headers="Accept=application/json")
	public Member getAdminDetails(@RequestParam("id") String id){
		
		return settings.getAdminDetails(id);
	}
	
/*------ ADD NEW PROGRAMME TO THE DATABASE ------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/addProgramme", method=RequestMethod.POST, headers="Accept=application/json")
	public Settings addProgramme(@RequestBody Settings programme){
		
		return settings.addProgramme(programme);
	}
	
/*------ GET PROGRAMMES DETAILS BY ID -----------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getProgrammeDetails", method=RequestMethod.POST, headers="Accept=application/json")
	public Settings getProgrammeDetails(@RequestParam("id")int id){
		
		return settings.getProgrammeDetails(id);
	}
	
/*------- UPDATE PARTICULAR PROGRAMME SETTINGS BY PROGRAMME ID (price, discount, etc.) ----------------------------------------------*/
	@RequestMapping(value="/updateProgrammeSettings", method=RequestMethod.POST, headers="Accept=application/json")
	public Settings updateProgrammeDetails(@RequestBody Settings programme){
		
		return settings.updateProgrammeSettings(programme);
	}
	
/*------ GET SALES DETAILS BY ID ----------------------------------------------------------------------------------------------------*/
	@RequestMapping(value="/getSalesDetails", method=RequestMethod.POST, headers="Accept=application/json")
	public Settings getSalesDetails(@RequestParam("id") String id){
		
		return settings.getSalesDetails(id);
	}
}
