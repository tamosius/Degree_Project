package com.tomas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tomas.dao.ProgrammeDAO;
import com.tomas.model.Programme;

public class ProgrammeServiceImplementation implements ProgrammeService{
	
	@Autowired
	ProgrammeDAO programmeDAO;

/*---------- GET PROGRAMMES CURRENT DETAILS (prices, discounts, etc.) -----------------------------------------*/
	@Override
	public List<Programme> getProgrammesDetails(){
		
		return programmeDAO.getProgrammesDetails();
	}
}
