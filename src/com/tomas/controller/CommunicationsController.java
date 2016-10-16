package com.tomas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tomas.bean.Member;
import com.tomas.dao.interfaces.CommunicationsInterface;

@RestController
@RequestMapping(value="/communications")
public class CommunicationsController {

	@Autowired
	CommunicationsInterface communications;
	
/*--------- GET MEMBERS BY NAME, TO WHOM EMAIL IS INTENDED TO SEND -------------------------------------------------*/
	@RequestMapping(value="/getEmailMembers", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> getEmailMembers(@RequestParam("name") String name){
		
		return communications.getEmailMembers(name);
	}
}
