package com.tomas.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.tomas.dao.SettingsDAO;
import com.tomas.model.Member;
import com.tomas.model.Settings;

public class SettingsServiceImplementation implements SettingsService{
	
	@Autowired
	SettingsDAO settingsDAO;

	/*-------- GET ADMIN DETAILS BY ID ------------------------------------------------------------------------------------------------------------*/
	@Override
	public Member getAdminDetails(String id){
		
		return settingsDAO.getAdminDetails(id);
	}
	
/*-------- ADD NEW PROGRAMME TO THE DATABASE --------------------------------------------------------------------------------------------------*/
	@Override
	public Settings addProgramme(Settings programme){
		
		return settingsDAO.addProgramme(programme);
	}

/*-------- GET PROGRAMME SETTINGS DETAILS BY ID -----------------------------------------------------------------------------------------------*/
	@Override
	public Settings getProgrammeDetails(int id){
		
		return settingsDAO.getProgrammeDetails(id);
	}
	
/*------- UPDATE PARTICULAR PROGRAMME SETTINGS BY PROGRAMME ID (price, discount, etc.) ---------------------------------------------------------*/
	@Override
	public Settings updateProgrammeSettings(Settings programme){
	
		return settingsDAO.updateProgrammeSettings(programme);
	}
	
/*------- GET SALES SETTINGS DETAILS ----------------------------------------------------------*/
	@Override
	public Settings getSalesDetails(String id){
		
		return settingsDAO.getSalesDetails(id);
	}
}
