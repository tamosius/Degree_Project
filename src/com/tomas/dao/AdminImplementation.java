package com.tomas.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.web.servlet.ModelAndView;

import com.tomas.bean.Admin;
import com.tomas.hashPassword.HashPassword;

public class AdminImplementation implements com.tomas.dao.interfaces.AdminInterface{

	@Autowired
	DataSource dataSource;
	
	@Autowired
	HashPassword hashPassword;
	
	
/*------ RETURN MODELANDVIEW IF AUTHENTICATION IS SUCCESSFUL -----------------------------------------------------------------*/
	@Override
	public ModelAndView authenticate(Admin admin){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT validations"
				   + " FROM admin"
				   + " WHERE email = '?' and password = '?'";
		
		
		
		ModelAndView view = new ModelAndView();
		
		return null;
	}
	
/*------ ADD NEW ADMIN USER TO THE DATABASE ----------------------------------------------------------------------------------*/
	@Override
	public Admin addAdmin(Admin admin){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " INSERT INTO admin(first_name, last_name, username, email, password, joined_on)"
				   + " VALUES(?, ?, ?, ?, ?, NOW())";
		
		jdbcTemplate.update(sql, new Object[]{admin.getFirstName(), admin.getLastName(), admin.getUsername(),
				admin.getEmail(), hashPassword.getHashPassword(admin.getPassword())});
		
		return admin;
	}
	
/*------ GET ADMIN DETAILS BY ID ---------------------------------------------------------------------------------------------*/
	@Override
	public Admin getAdminDetails(int id){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " ";
		
		return jdbcTemplate.query(sql, new ResultSetExtractor<Admin>(){
			
			@Override
			public Admin extractData(ResultSet resultSet) throws SQLException, DataAccessException{
				
				if(resultSet.next()){
					
					Admin admin = new Admin();
					
					admin.setId(resultSet.getInt("id"));
					admin.setFirstName(resultSet.getString("first_name"));
					admin.setLastName(resultSet.getString("last_name"));
					admin.setUsername(resultSet.getString("username"));
					admin.setEmail(resultSet.getString("email"));
					admin.setPassword(resultSet.getString("password"));
					admin.setJoinedOn(resultSet.getString("joined_on"));
					
					return admin;
				}
				return null;
			}		
		});
	}
}
