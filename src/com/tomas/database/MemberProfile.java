package com.tomas.database;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;

import com.tomas.bean.Member;

public class MemberProfile implements RowMapper<Member> {

	@Override
	public Member mapRow(ResultSet resultSet, int line) throws SQLException, DataAccessException {
		
		Member member = new Member();

		member.setId(resultSet.getInt(1));
		member.setFirstName(resultSet.getString(2));
		member.setLastName(resultSet.getString(3));
		member.setAddress(resultSet.getString(4));
		member.setPhNumber(resultSet.getString(5));
		member.setDateOfBirth(resultSet.getString(6));
		member.setEmail(resultSet.getString(7));
		member.setMembershipFrom(resultSet.getString(8));
		member.setMembershipTo(resultSet.getString(9));
		member.setPaid(resultSet.getFloat(10));
		member.setDateJoined(resultSet.getString(11));
		
		return member;
	}

}