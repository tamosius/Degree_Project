package com.tomas.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.tomas.bean.Member;
import com.tomas.bean.Settings;
import com.tomas.dao.interfaces.SettingsInterface;		

public class SettingsImplementation implements SettingsInterface{
	
	@Autowired
	DataSource dataSource;
	
/*-------- GET ADMIN DETAILS BY ID ------------------------------------------------------------------------------------------------------------*/
	@Override
	public Member getAdminDetails(String id){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = "";
		
		return jdbcTemplate.query(sql, new ResultSetExtractor<Member>(){
			
			@Override
			public Member extractData(ResultSet resultSet) throws SQLException, DataAccessException{
				
				if(resultSet.next()){
					
					Member member = new Member();
					
					return member;
				}
				return null;
			}
		});
	}

/*-------- GET PROGRAMME SETTINGS DETAILS BY ID -----------------------------------------------------------------------------------------------*/
	@Override
	public Settings getProgrammeDetails(int id){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT programme_id, programme_name, programme_price, programme_previous_price,"
				   + " programme_discount, programme_discount_percentage, programme_promotion_start,"
				   + " programme_promotion_end, final_price"
				   + " FROM programmes_prices"
				   + " WHERE programme_id = " + id   
				   + " AND updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp) FROM programmes_prices"
				   + " WHERE programme_id = " + id + ")";
		
		List<Settings> programmeDetails = jdbcTemplate.query(sql, new RowMapper<Settings>(){
			
			@Override
			public Settings mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				Settings programme = new Settings();
				
				programme.setProgrammeId(resultSet.getInt("programme_id"));
				programme.setProgrammeName(resultSet.getString("programme_name"));
				programme.setProgrammePrice(resultSet.getFloat("programme_price"));
				programme.setProgrammePreviousPrice(resultSet.getFloat("programme_previous_price"));
				programme.setProgrammeDiscount(resultSet.getFloat("programme_discount"));
				programme.setProgrammeDiscountPercentage(resultSet.getFloat("programme_discount_percentage"));
				programme.setProgrammePromotionStart(resultSet.getString("programme_promotion_start"));
				programme.setProgrammePromotionEnd(resultSet.getString("programme_promotion_end"));
				programme.setFinalPrice(resultSet.getFloat("final_price"));
				
				return programme;
			}
		});
		return programmeDetails.get(0);
	}
	
/*------- UPDATE PARTICULAR PROGRAMME SETTINGS BY PROGRAMME ID (price, discount, etc.) ---------------------------------------------------------*/
	@Override
	public Settings updateProgrammeSettings(Settings settings){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		// actually, will be inserting the new record with programme ID with different price, discount, etc. 
		// it is for statistical purpose
		String sql = " INSERT INTO programmes_prices (programme_id, programme_name, programme_price, programme_previous_price,"
				   + " programme_discount, programme_discount_percentage, programme_promotion_start, programme_promotion_end,"
				   + " programme_promotion_description, updated_timestamp, final_price)"
				   + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)";
		
		// execute this 'INSERT' query in 'programmes_prices' table
		jdbcTemplate.update(sql, settings.getProgrammeId(), settings.getProgrammeName(), settings.getProgrammePrice(), settings.getProgrammePreviousPrice(),
				settings.getProgrammeDiscount(), settings.getProgrammeDiscountPercentage(), settings.getProgrammePromotionStart(), settings.getProgrammePromotionEnd(),
				settings.getProgrammePromotionDescription(), settings.getFinalPrice());
	
		return getProgrammeDetails(settings.getProgrammeId());
	}
	
/*------- GET SALES SETTINGS DETAILS ----------------------------------------------------------*/
	@Override
	public Settings getSalesDetails(String id){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = "";
		
		List<Settings> salesDetails = new ArrayList<>();
		
		return salesDetails.get(0);
	}
}
