package com.tomas.dao.interfaces;

import com.tomas.bean.Member;
import com.tomas.bean.Settings;

public interface SettingsInterface {

	public Member getAdminDetails(String id);                   // get 'Admin' details by id
	
	public Settings getProgrammeDetails(int id);                // get 'Programme' details by id
	
	public Settings getSalesDetails(String id);                 // get 'Sales' details by id
	
	public Settings updateProgrammeSettings(Settings settings); // update particular programme settings by programme ID (price, discount, etc.)
}
