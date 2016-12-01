package com.tomas.service;

import com.tomas.model.Member;
import com.tomas.model.Settings;

public interface SettingsService {

    public Member getAdminDetails(String id);                   // get 'Admin' details by id
	
	public Settings addProgramme(Settings programme);           // add new 'Programme' to the database
	
	public Settings getProgrammeDetails(int id);                // get 'Programme' details by id
	
	public Settings getSalesDetails(String id);                 // get 'Sales' details by id
	
	public Settings updateProgrammeSettings(Settings settings); // update particular programme settings by programme ID (price, discount, etc.)
}
