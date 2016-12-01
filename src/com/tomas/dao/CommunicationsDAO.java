package com.tomas.dao;

import java.util.List;

import com.tomas.model.Member;

public interface CommunicationsDAO {

	public List<Member> getEmailMembers(String name);  // get members by name, to whom email is intended
}
