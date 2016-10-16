package com.tomas.dao.interfaces;

import java.util.List;

import com.tomas.bean.Member;

public interface CommunicationsInterface {

	public List<Member> getEmailMembers(String name);  // get members by name, to whom email is intended
}
