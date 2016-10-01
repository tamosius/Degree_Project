package com.tomas.database;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;

import com.tomas.bean.Member;

public class NewMembers implements RowMapper<Member> {

	public Member mapRow(ResultSet resultSet, int line) throws SQLException, DataAccessException {

		Member member = new Member();

		member.setId(resultSet.getInt(1));
		member.setFirstName(resultSet.getString(2));
		member.setLastName(resultSet.getString(3));
		member.setDateJoined(resultSet.getString(4));
		member.setMembershipTo(resultSet.getString(5));
		member.setPaid(resultSet.getFloat(6));
		member.setCountVisits(resultSet.getInt(7));
		// member.setVisitedTimestamp(resultSet.getString(7));
		// member.setNumberOfVisits(resultSet.getNumberOfVisits(8));

		return member;
	}
}
