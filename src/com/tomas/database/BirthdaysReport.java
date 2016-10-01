package com.tomas.database;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;

import com.tomas.bean.Member;

public class BirthdaysReport implements RowMapper<Member>{

public Member mapRow(ResultSet resultSet, int line) throws SQLException, DataAccessException {
		
		Member member = new Member();

		member.setId(resultSet.getInt(1));
		member.setFirstName(resultSet.getString(2));
		member.setLastName(resultSet.getString(3));
		member.setDateOfBirth(resultSet.getString(4));
		member.setMemberAge(resultSet.getInt(5));
		member.setMembershipTo(resultSet.getString(6));
		member.setCountVisits(resultSet.getInt(7));
		
		return member;
	}
}
