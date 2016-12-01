package com.tomas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.model.Member;
import com.tomas.service.CommunicationsService;

@RestController
@RequestMapping(value="/communications")
public class CommunicationsController {

	@Autowired
	CommunicationsService communicationsService;
	
/*--------- GET MEMBERS BY NAME, TO WHOM EMAIL IS INTENDED TO SEND -------------------------------------------------*/
	@RequestMapping(value="/getEmailMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getEmailMembers(@RequestParam("name") String name){
		
		return communicationsService.getEmailMembers(name);
	}
}
