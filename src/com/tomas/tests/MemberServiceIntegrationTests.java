package com.tomas.tests;

import javax.sql.DataSource;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.tomas.dao.MemberDAO;
import com.tomas.model.Member;

@RunWith(SpringJUnit4ClassRunner.class)
@Rollback(true)
@ContextConfiguration("spring-servlet.xml")
public class MemberServiceIntegrationTests {
	
	@Autowired
	DataSource dataSource;
	
	@Autowired
	MemberDAO memberDAO;

	@Test
	public void addMember() {
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		Member member = new Member();
		
		member.setFirstName("Tomas");
		member.setLastName("Mikoliunas");
		member.setAddress("Ashbourne");
		member.setPhNumber("0870533905");
		member.setDateOfBirth("01-06-1978");
		member.setProgramme("'1 Month Membership'");
		member.setPassword("secret");  // get initial password when sign in for the first time
		member.setEmail("tomas@gmail.com");
		
		long countBeforeInsert = jdbcTemplate.queryForObject("select count(*) from members", Long.class);
		Assert.assertEquals(16, countBeforeInsert);
		
		memberDAO.addMember(member);
		
		long countAfterInsert = jdbcTemplate.queryForObject("select count(*) from members", Long.class);
		Assert.assertEquals(17, countAfterInsert);
	}

}
