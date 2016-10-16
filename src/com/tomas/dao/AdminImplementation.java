package com.tomas.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
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
		
		String sql = " SELECT id, first_name, last_name, email, username, joined_on"
				   + " FROM admin"
				   + " WHERE username = '" + admin.getUsername() + "' AND password = '" 
				   + admin.getPassword() + "'";
		
		Admin adminUser = jdbcTemplate.query(sql, new ResultSetExtractor<Admin>(){
			
			@Override
			public Admin extractData(ResultSet resultSet)throws SQLException, DataAccessException{
				
				if(resultSet.next()){
					
					Admin admin = new Admin();
					
					admin.setId(resultSet.getInt("id"));
					admin.setFirstName(resultSet.getString("first_name"));
					admin.setLastName(resultSet.getString("last_name"));
					admin.setEmail(resultSet.getString("email"));
					admin.setUsername(resultSet.getString("username"));
					admin.setJoinedOn(resultSet.getString("joined_on"));
					
					return admin;
				}
				return null;
			}
		});
		
		if(adminUser != null){
			
			return new ModelAndView("index", "adminUser", adminUser);
		}
		else{
			
			return null;
		}
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
		
		String sql = " SELECT id, first_name, last_name, username, email,"
				   + " DATE_FORMAT(joined_on, '%d-%m-%Y %H:%i:%s') AS joined_on"
				   + " FROM admin"
				   + " WHERE id = " + id;
		
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
					//admin.setPassword(resultSet.getString("password"));
					admin.setJoinedOn(resultSet.getString("joined_on"));
					
					return admin;
				}
				return null;
			}		
		});
	}
	
/*-------- GET ALL ADMIN'S ------------------------------------------------------------------------------------*/
	@Override
	public List<Admin> getAllAdmin(String name){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT id, first_name, last_name,"
				   + " DATE_FORMAT(joined_on, '%d-%m-%Y %H:%i:%s') AS joined_on"
				   + " FROM admin"
				   + " WHERE first_name LIKE '%" + name + "%'"
				   + " OR last_name LIKE '%" + name + "%'";
		
		List<Admin> admins = jdbcTemplate.query(sql, new RowMapper<Admin>(){
			
			@Override
			public Admin mapRow(ResultSet resultSet, int rowNumber)throws SQLException{
				
				Admin admin = new Admin();
				
				admin.setId(resultSet.getInt("id"));
				admin.setFirstName(resultSet.getString("first_name"));
				admin.setLastName(resultSet.getString("last_name"));
				admin.setJoinedOn(resultSet.getString("joined_on"));
				
				return admin;
			}
		});
		return admins;
	}
	
/*------- LEAVE A MESSAGE FOR OTHER ADMINS, ('Leave Message' button) SAVE IN THE DATABASE ---------------------------------*/
	@Override
	public Admin addAdminMessage(int messageTo, String message, int messageFrom){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " INSERT INTO admin_messages"
				   + " (";
		
		//jdbcTemplate.update(sql, new Object[]{});
		System.out.println("Message: " + messageTo + " " + message + " " + messageFrom + "\n");
		return getAdminDetails(messageTo);
	}
}
