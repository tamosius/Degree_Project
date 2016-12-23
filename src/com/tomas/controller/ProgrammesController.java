package com.tomas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.model.Programme;
import com.tomas.service.ProgrammeService;

@RestController
@RequestMapping(value="/programmes")
public class ProgrammesController {
	
	@Autowired
	ProgrammeService programmeService;

	@RequestMapping(value="/getProgrammesDetails", method=RequestMethod.GET, headers="Accept=application/json")
	public List<Programme> getProgrammesDetails(){
		
		return programmeService.getProgrammesDetails();
	}
}
