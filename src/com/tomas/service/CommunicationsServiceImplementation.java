package com.tomas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tomas.dao.CommunicationsDAO;
import com.tomas.model.Member;

public class CommunicationsServiceImplementation implements CommunicationsService{
	
	@Autowired
	CommunicationsDAO communicationsDAO;

	/*--------- GET MEMBERS BY NAME, TO WHOM EMAIL IS INTENDED TO SEND -------------------------------------------------*/
	@Override
	public List<Member> getEmailMembers(String name){
		
		return communicationsDAO.getEmailMembers(name);
	}
}
