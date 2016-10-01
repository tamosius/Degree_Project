package com.tomas.database;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;


import com.tomas.bean.Member;

/**
 * 
 * 'ResultSetExtractor' is an useful interface provided by Spring JDBC, 
 * it accept a 'resultset' as input parameter and returns list implementation of extracted data from database.
 *
 */

public class MemberExtractor implements ResultSetExtractor<Member> {

	public Member extractData(ResultSet resultSet) throws SQLException, DataAccessException {
		
		
		ResultSetMetaData rsmd = resultSet.getMetaData();

		int columnsNumber = rsmd.getColumnCount();
		System.out.println("length: " + columnsNumber);
		Member member = new Member();

		member.setId(resultSet.getInt(1));
		member.setFirstName(resultSet.getString(2));
		member.setLastName(resultSet.getString(3));
		member.setPhNumber(resultSet.getString(4));
		member.setAddress(resultSet.getString(5));
		member.setEmail(resultSet.getString(6));
		//member.setDateOfBirth(resultSet.getString(7));
		//member.setDateJoined(resultSet.getString(8));
		//member.setMembershipFrom(resultSet.getString(9));
		//member.setMembershipTo(resultSet.getString(10));
		//member.setPaid(resultSet.getFloat(11));

		return member;
	}

}
