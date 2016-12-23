package com.tomas.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.tomas.model.Programme;

public class ProgrammeDAOImplementation implements ProgrammeDAO{
	
	@Autowired
	DataSource dataSource;

/*---------- GET PROGRAMMES CURRENT DETAILS (prices, discounts, etc.) -----------------------------------------*/
	@Override
	public List<Programme> getProgrammesDetails(){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT programmeId, programme_name, programme_price,"
                   + " programme_discount, programme_discount_percentage,"
                   + " final_price FROM programmes_prices";
		
		List <Programme> programmesDetails = jdbcTemplate.query(sql, new RowMapper<Programme>(){
			
			@Override
			public Programme mapRow(ResultSet resultSet, int rowNumber)throws SQLException{
				
				Programme programme = new Programme();
				
				programme.setProgrammeId(resultSet.getInt("programmeId"));
				programme.setProgrammeName(resultSet.getString("programme_name"));
				programme.setProgrammePrice(resultSet.getFloat("programme_price"));
				programme.setProgrammeDiscount(resultSet.getFloat("programme_discount"));
				programme.setProgrammeDiscountPercentage(resultSet.getFloat("programme_discount_percentage"));
				programme.setFinalPrice(resultSet.getFloat("final_price"));
				
				return programme;
			}
		});
		return programmesDetails;
	}
}
