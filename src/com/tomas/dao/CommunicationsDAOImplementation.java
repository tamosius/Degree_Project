package com.tomas.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.tomas.model.Member;

public class CommunicationsDAOImplementation implements CommunicationsDAO{

	@Autowired
	DataSource dataSource;
	
	
/*--------- GET MEMBERS BY NAME, TO WHOM EMAIL IS INTENDED TO SEND -------------------------------------------------*/
	@Override
	public List<Member> getEmailMembers(String name){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT id, first_name, last_name, email"
				   + " FROM members"
				   + " WHERE first_name LIKE '%" + name + "%'"
				   + " OR last_name LIKE '%" + name + "%'";
		
		List<Member> members = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			public Member mapRow(ResultSet resultSet, int rowNumber)throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));
				member.setLastName(resultSet.getString("last_name"));
				member.setEmail(resultSet.getString("email"));
				
				return member;
			}
		});
		
		return members;
	}
}
