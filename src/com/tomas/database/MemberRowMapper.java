package com.tomas.database;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import com.tomas.bean.Member;

/**
 * 
 * 'RowMapper' is a useful interface provided by Spring JDBC, 
 * it can be used to map rows in a 'resultset' on per row basis. 
 * 'RowMapper' with 'ResultSetExtractor' can be used as a powerful combination to map relational database rows to domain object.
 *
 */

public class MemberRowMapper implements RowMapper<Member> {

	@Override
	public Member mapRow(ResultSet resultSet, int line) throws SQLException {
		System.out.println("line is here: " + line);
		MemberExtractor userExtractor = new MemberExtractor();
		return userExtractor.extractData(resultSet);
	}

}
