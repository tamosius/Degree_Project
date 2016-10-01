package com.tomas.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.RequestBody;

import com.tomas.bean.Member;
import com.tomas.database.BirthdaysReport;
import com.tomas.database.ExpireMembershipReport;
import com.tomas.database.NewMembers;


/**
 * 
 * This class represents actual coding to deal with JDBC template,
 * I have auto wired 'datasource' bean here and passed it to get an object of 'JdbcTemplate' class on. 
 * Now I will be able to call appropriate methods on this 'JdbcTemplate' object to manipulate data in DB.
 *
 */

public class ReportsImplementation implements ReportsInterface{
	
	@Autowired
	DataSource dataSource;

/*--------- MEMBER TYPE QUERIES --------------------------------------------------------------------------------------------------------*/
	/*----- get new members list who joined in specified period of time ----------------------------------------------------------------*/
	@Override
    public List<Member> getNewMembers(String startDate, String endDate){  
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name, date_format(members.date_joined, '%d-%m-%Y %H:%i:%s') AS date_joined,"
				   + " membership_status.programme, membership_status.membership_from,"
				   + " membership_status.membership_to, membership_status.paid, COUNT(member_attendance.id) AS visits,"
				   + " MAX(DATE_FORMAT(member_attendance.visited_timestamp, '%d-%m-%Y %H:%i:%s')) AS last_visit"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " LEFT JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE membership_status.updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp) FROM membership_status WHERE membership_status.id = id AND members.id = membership_status.id)"
				   + " AND (members.date_joined BETWEEN str_to_date('" + startDate + "', '%d-%m-%Y')"
				   + " AND DATE_ADD(str_to_date('" + endDate + "', '%d-%m-%Y'), INTERVAL 1 DAY))"
				   + " GROUP BY members.date_joined DESC";
		
		List<Member> newMembers = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber)throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));
				member.setLastName(resultSet.getString("last_name"));
				member.setDateJoined(resultSet.getString("date_joined"));
				member.setProgramme(resultSet.getString("programme"));
				member.setMembershipFrom(resultSet.getString("membership_from"));
				member.setMembershipTo(resultSet.getString("membership_to"));
				member.setPaid(resultSet.getFloat("paid"));
				member.setCountVisits(resultSet.getInt("visits"));
				member.setVisitedTimestamp(resultSet.getString("last_visit"));
				
				return member;
			}
		});
		return newMembers;
	}      
	
	/*------ get members booking made in the specified period of time -----------------------------------------------------------------*/
	@Override
	public List<Member> getMembersBookings(@RequestBody String startDate, String endDate){   
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		
		String sql = " SELECT members.id, members.first_name, members.last_name,"
				   + " DATE_FORMAT(membership_status.updated_timestamp, '%d-%m-%Y %H:%i:%s') AS updated_on,"
				   + " membership_status.membership_from,"
				   + " membership_status.membership_to, membership_status.paid, membership_status.programme,"
				   + " DATEDIFF(STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y'), NOW()) AS days_left"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " WHERE (membership_status.updated_timestamp BETWEEN str_to_date('" + startDate + "', '%d-%m-%Y')"
				   + " AND DATE_ADD(STR_TO_DATE('" + endDate + "', '%d-%m-%Y'), INTERVAL 1 DAY))"
				   + " AND membership_status.programme_booked = 1"
				   + " AND membership_status.programme <> \"'Pay as You Go'\""
				   + " ORDER BY membership_status.updated_timestamp DESC";
		
		List<Member> membersBookings = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber)throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));
				member.setLastName(resultSet.getString("last_name"));
				member.setBookedTimestamp(resultSet.getString("updated_on"));
				member.setMembershipFrom(resultSet.getString("membership_from"));
				member.setMembershipTo(resultSet.getString("membership_to"));
				member.setPaid(resultSet.getFloat("paid"));
				member.setProgramme(resultSet.getString("programme"));
				member.setMembershipDaysLeft(resultSet.getString("days_left"));
				
				
				return member;
			}	
		});
		return membersBookings;
	}
	
	/*------ get members with the valid memberships in the specified period of time -------------------------------------*/
	@Override
	public List<Member> getValidMembersBookings(@RequestBody String startDate, String endDate){   
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		
		String sql = " SELECT members.id, members.first_name, members.last_name,"
				   + " DATE_FORMAT(membership_status.updated_timestamp, '%d-%m-%Y %H:%i:%s') AS updated_on,"
				   + " membership_status.membership_from,"
				   + " membership_status.membership_to, membership_status.paid, membership_status.programme,"
				   + " DATEDIFF(STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y'), NOW()) AS days_left"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " WHERE (membership_status.updated_timestamp BETWEEN str_to_date('" + startDate + "', '%d-%m-%Y')"
				   + " AND DATE_ADD(STR_TO_DATE('" + endDate + "', '%d-%m-%Y'), INTERVAL 1 DAY))"
				   + " AND membership_status.programme_state = 'active'"
				   + " AND membership_status.programme_booked = 1"
				   + " AND membership_status.programme <> \"'Pay as You Go'\""
				   + " ORDER BY membership_status.updated_timestamp DESC";
		
		List<Member> membersBookings = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber)throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));
				member.setLastName(resultSet.getString("last_name"));
				member.setBookedTimestamp(resultSet.getString("updated_on"));
				member.setMembershipFrom(resultSet.getString("membership_from"));
				member.setMembershipTo(resultSet.getString("membership_to"));
				member.setPaid(resultSet.getFloat("paid"));
				member.setProgramme(resultSet.getString("programme"));
				member.setMembershipDaysLeft(resultSet.getString("days_left"));
				
				
				return member;
			}	
		});
		return membersBookings;
	}
	
	/*------ get members birthdays in the specified period of time --------------------------------------------------------------------*/
	@Override
	public List<Member> getBirthdayList(@RequestBody String startDate, String endDate){   
		
		List<Member> newMembers = new ArrayList<>();
		
		String sql = " SELECT members.id, members.first_name, members.last_name, members.date_of_birth,"
				   + " (DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), STR_TO_DATE(members.date_of_birth, '%d-%m-%Y'))), '%Y') + 0), "
				   + " membership_status.membership_to, COUNT(member_attendance.id)"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " LEFT JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE (STR_TO_DATE(members.date_of_birth, '%d-%m')"
				   + " BETWEEN STR_TO_DATE('" + startDate + "', '%d-%m')"
				   + " AND STR_TO_DATE('" + endDate + "', '%d-%m'))"
				   + " GROUP BY members.id";
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		newMembers = jdbcTemplate.query(sql, new BirthdaysReport());
		
		return newMembers;
	}
	
	/*------ get members with the expiring memberships in the specified period of time -------------------------------------------------*/
	@Override
	public List<Member> getExpireMemberships(@RequestBody String startDate, String endDate){  
		
		List<Member> newMembers = new ArrayList<>();
		
		String sql = " SELECT members.id, members.first_name, members.last_name, membership_status.programme,"
				   + " membership_status.membership_to, DATE_FORMAT(member_attendance.visited_timestamp, '%d-%m-%Y'), COUNT(member_attendance.id)"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " LEFT JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE (STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y') BETWEEN STR_TO_DATE('" + startDate + "', '%d-%m-%Y')"
				   + " AND STR_TO_DATE('" + endDate + "', '%d-%m-%Y'))"
				   + " GROUP BY members.id";
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		newMembers = jdbcTemplate.query(sql, new ExpireMembershipReport());
		
		return newMembers;
	}
	
	/*------ get members who haven't attended in the specified period of time ----------------------------------------------------------*/
	@Override
	public List<Member> getMissingMembers(String startDate, String endDate){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name,"
				   + " member_attendance.visited_on,"
				   + " DATE_FORMAT(members.date_joined, '%d-%m-%Y %H:%i:%s') AS date_joined,"
				   + " membership_status.programme, membership_status.membership_from,"
				   + " membership_status.membership_to, member_attendance.visits"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " LEFT JOIN"
				   + " ("
				   + "      SELECT id, MAX(DATE_FORMAT(visited_timestamp, '%d-%m-%Y %H:%i:%s')) AS visited_on,"
				   + "      COUNT(id) AS visits"
				   + "      FROM member_attendance"
				   + "      GROUP BY id"
				   + " ) member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE members.id NOT IN"
				   + " (SELECT id FROM member_attendance"
				   + " WHERE visited_timestamp BETWEEN STR_TO_DATE('" + startDate + "', '%d-%m-%Y')"
				   + " AND DATE_ADD(STR_TO_DATE('" + endDate + "', '%d-%m-%Y'), INTERVAL 1 DAY))"
				   + " AND membership_status.updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp) FROM membership_status"
				   + " WHERE membership_status.id = id AND members.id = membership_status.id)"
				   + " GROUP BY members.id";
		
		List<Member> missingMembers = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));
				member.setLastName(resultSet.getString("last_name"));
				member.setVisitedTimestamp(resultSet.getString("visited_on"));
				member.setDateJoined(resultSet.getString("date_joined"));
				member.setProgramme(resultSet.getString("programme"));
				member.setMembershipFrom(resultSet.getString("membership_from"));
				member.setMembershipTo(resultSet.getString("membership_to"));
				member.setCountVisits(resultSet.getInt("visits"));
				
				return member;
			}
		});	
		return missingMembers;
	}
	
    /*--------- get member visited dates and times by ID --------------------------------------------------------*/
	@Override
	public List<Member> getMemberVisitedDatesTimes(String id){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.first_name, members.last_name,"
				   + " DATE_FORMAT(member_attendance.visited_timestamp, '%d-%m-%Y %H:%i:%s') AS visited_on,"
				   + " DAYNAME(member_attendance.visited_timestamp) AS week_day"
				   + " FROM members"
				   + " INNER JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE members.id = " + id
				   + " ORDER BY member_attendance.visited_timestamp DESC";
		
		List<Member> memberVisitedDatesTimes = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				Member member = new Member();
				
				member.setFirstName(resultSet.getString("first_name"));
				member.setLastName(resultSet.getString("last_name"));
				member.setVisitedTimestamp(resultSet.getString("visited_on"));
				member.setWeekDay(resultSet.getString("week_day"));
				
				return member;
			}
		});
		return memberVisitedDatesTimes;
	}
	
	/*----- get valued members (mostly spent on programmes and products) ------------------------------------------------*/
	@Override
	public List<Member> getValuedMembers(String startDate, String endDate){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name,"
                   + " DATE_FORMAT(members.date_joined, '%d-%m-%Y %H:%i:%s') AS joined_on,"
                   + " membership_status.programmes_total_paid,"
                   + " IFNULL(products_sales.products_total, 0) AS products_total_paid,"
                   + " SUM(programmes_total_paid + IFNULL(products_total, 0)) AS total_paid,"
                   + " member_attendance.visited_on, member_attendance.visits"
				   + " FROM members"
				   + " INNER JOIN"
                   + " ("
                   + "   SELECT id, SUM(paid) AS programmes_total_paid"
                   + "   FROM membership_status"
                   + "   WHERE updated_timestamp BETWEEN STR_TO_DATE('" + startDate + "', '%d-%m-%Y')" 
                   + "   AND DATE_ADD(STR_TO_DATE('" + endDate + "', '%d-%m-%Y'), interval 1 day)"
                   + "   GROUP BY id"
				   + " ) membership_status"
				   + " ON members.id = membership_status.id"
                   + " LEFT JOIN"
                   + " ("
                   + "   SELECT member_id, SUM(paid) AS products_total"
                   + "   FROM products_sales"
                   + "   WHERE purchase_timestamp BETWEEN STR_TO_DATE('" + startDate + "', '%d-%m-%Y')" 
                   + "   AND DATE_ADD(STR_TO_DATE('" + endDate + "', '%d-%m-%Y'), interval 1 day)"
                   + "   GROUP BY member_id"
				   + " ) products_sales"
                   + " ON members.id = products_sales.member_id"
                   + " LEFT JOIN"
                   + " ("
                   + "   SELECT id, COUNT(*) AS visits,"
                   + "   MAX(DATE_FORMAT(visited_timestamp, '%d-%m-%Y %H:%i:%s')) AS visited_on"
                   + "   FROM member_attendance"
                   + "   GROUP BY id"
                   + " ) member_attendance"
                   + " ON members.id = member_attendance.id"
                   + " GROUP BY members.id"
                   + " ORDER BY total_paid DESC";
		
		List<Member> valuedMembers = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));
				member.setLastName(resultSet.getString("last_name"));
				member.setDateJoined(resultSet.getString("joined_on"));
				member.setProgrammesTotalPaid(resultSet.getFloat("programmes_total_paid"));
				member.setProductsTotalPaid(resultSet.getFloat("products_total_paid"));
				member.setTotalPaid(resultSet.getFloat("total_paid"));
				member.setVisitedTimestamp(resultSet.getString("visited_on"));
				member.setCountVisits(resultSet.getInt("visits"));
				
				return member;
			}
		});
		
		return valuedMembers;
	}
	
/*--------- PERSONAL TRAINER TYPE QUERIES ----------------------------------------------------------------------------------------------*/
	@Override
	public List<Member> getTrainerPerformance(@RequestBody String startDate, String endDate){ // get members booking made in the specified period of time
		
		List<Member> newMembers = new ArrayList<>();
		
		String sql = "";
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		newMembers = jdbcTemplate.query(sql, new NewMembers());
		
		return newMembers;
	}
	
	@Override
	public List<Member> getTrainerSessions(@RequestBody String startDate, String endDate){   // get members booking made in the specified period of time
		
        List<Member> newMembers = new ArrayList<>();
		
		String sql = "";
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		newMembers = jdbcTemplate.query(sql, new NewMembers());
		
		return newMembers;
	}
}
