package com.tomas.service;

import java.util.List;

import com.tomas.model.Member;

public interface CommunicationsService {

	public List<Member> getEmailMembers(String name);  // get members by name, to whom email is intended
}
