package com.tomas.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class OfferDAOImplementation implements OfferDAO{
	
	@Autowired
	DataSource dataSource;

/*-------- ADD NEW OFFER TO THE DATABASE WITH SPECIFIED NUMBER OF DAYS OF EXPIRING ---------------------------*/
	@Override
	public String addOffer(int memberId, String offerSubject, String offerTemplate,
			int offerDays, float offerPercentage, boolean accepted){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " INSERT INTO offers (member_id, offer_subject, offer_template,"
				   + " start_date, end_date, offer_percentage, accepted)"
				   + " VALUES(?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL " + offerDays + " DAY), ?, ?)";
		
		jdbcTemplate.update(sql, new Object[]{memberId, offerSubject, offerTemplate, offerPercentage, accepted});
		
		return "Successfully added a new Offer!!";
	}
	
/*------- UPDATE DETAILS IN 'Oferrs' TABLE IF MEMBER ACCEPTED AN OFFER WITHIN SPECIFIED PERIOD OF TIME -------*/
	@Override
	public String acceptOffer(int memberId, boolean accepted){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " UPDATE offers"
				   + " SET accepted = true, accepted_date = NOW()"
				   + " WHERE member_id = ?"
				   + " AND end_date >= NOW()";
		
		jdbcTemplate.update(sql, new Object[]{memberId});
		
		return "Successfully updated 'Offers' table in the database";
	}
}
