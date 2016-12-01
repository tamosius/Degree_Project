package com.tomas.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.tomas.model.Member;

/*
 * This class for the reports in the 'bottom panel'
 */

public class BottomPanelReportsDAOImplementation implements BottomPanelReportsDAO{
	
	@Autowired
	DataSource dataSource;

/*-------- GET COUNT OF TODAY'S VISITS IN THE GYM --------------------------------------------------------------------------*/
	@Override
	public int getVisitsCount(){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);	
		
		String sql = " SELECT COUNT(visited_timestamp) from member_attendance"
				   + " WHERE visited_timestamp <= NOW() AND visited_timestamp > CURRENT_DATE()";
		
		// get count of todays visits in the gym
		int count = jdbcTemplate.queryForObject(sql, Integer.class);
		
		return count;
	}
	
/*------- GET NAMES AND DETAILS OF TODAYS VISITED MEMBERS ------------------------------------------------------------------*/
	@Override
	public List<Member> getTodaysVisitedMembers(){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name,"
				   + " date_format(members.date_joined, '%d-%m-%Y') AS date_joined,"
				   + " membership_status.programme, membership_status.membership_from,"
				   + " membership_status.membership_to, membership_status.paid, COUNT(member_attendance.id) AS visits,"
				   + " MAX(DATE_FORMAT(member_attendance.visited_timestamp, '%d-%m-%Y %H:%i:%s')) AS last_visit"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " LEFT JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE membership_status.updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp) FROM membership_status "
				   + " WHERE membership_status.id = id AND members.id = membership_status.id)"
				   + " AND (member_attendance.visited_timestamp <= NOW()"
				   + " AND member_attendance.visited_timestamp > CURRENT_DATE())"
				   + " GROUP BY member_attendance.visited_timestamp DESC";
		
            List<Member> todaysVisitedMembers = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
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
		return todaysVisitedMembers;
	}
	
/*---------- GET MEMBERS BY SPECIFIED PROGRAMME TYPE ('1 Month Membership', '3 Months Membership', etc.) -------------------*/
	@Override
	public List<Member> getProgrammeTypeMembers(String programmeType){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name,"
				   + " DATE_FORMAT(membership_status.updated_timestamp, '%d-%m-%Y %H:%i:%s') AS updated_on,"
				   + " membership_status.membership_from, membership_status.membership_to,"
				   + " DATEDIFF(STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y'), NOW()) AS days_left,"
				   + " MAX(DATE_FORMAT(member_attendance.visited_timestamp, '%d-%m-%Y %H:%i:%s')) AS last_visit,"
				   + " COUNT(member_attendance.id) AS visits"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " LEFT JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE membership_status.programme = \"" + programmeType + "\""
				   + " AND membership_status.programme_state = 'active'"
				   + " AND membership_status.programme_booked = 1"
				   + " GROUP BY members.id"
				   + " ORDER BY member_attendance.visited_timestamp DESC";
		
		List<Member> programmeTypeMembers = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
				@Override
				public Member mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
					
					Member member = new Member();
					
					member.setId(resultSet.getInt("id"));
					member.setFirstName(resultSet.getString("first_name"));	
					member.setLastName(resultSet.getString("last_name"));
					member.setBookedTimestamp(resultSet.getString("updated_on"));
					member.setMembershipFrom(resultSet.getString("membership_from"));
					member.setMembershipTo(resultSet.getString("membership_to"));
					member.setMembershipDaysLeft(resultSet.getString("days_left"));
					member.setVisitedTimestamp(resultSet.getString("last_visit"));
					member.setCountVisits(resultSet.getInt("visits"));
					
					return member;
				}
		});
		return programmeTypeMembers;
	}

/*--------- GET 'Pay as You Go' MEMBERS ------------------------------------------------------------------------------------*/
	@Override
	public List<Member> getPayAsYouGoMembers(String programmeType){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name,"
				   + " DATE_FORMAT(members.date_joined, '%d-%m-%Y %H:%i:%s') AS joined_on,"
				   + " membership_status.membership_from, membership_status.membership_to,"
				   + " DATEDIFF(STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y'), NOW()) AS days_left,"
				   + " MAX(DATE_FORMAT(member_attendance.visited_timestamp, '%d-%m-%Y %H:%i:%s')) AS last_visit,"
				   + " COUNT(member_attendance.id) AS visits"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " LEFT JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE membership_status.programme = \"" + programmeType + "\""
				   + " AND membership_status.programme_state = 'active'"
				   + " AND membership_status.programme_booked = 1"
				   + " GROUP BY members.id"
				   + " ORDER BY member_attendance.visited_timestamp DESC";
		
		List<Member> payAsYouGoMembers = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));	
				member.setLastName(resultSet.getString("last_name"));
				member.setDateJoined(resultSet.getString("joined_on"));
				member.setMembershipFrom(resultSet.getString("membership_from"));
				member.setMembershipTo(resultSet.getString("membership_to"));
				member.setMembershipDaysLeft(resultSet.getString("days_left"));
				member.setVisitedTimestamp(resultSet.getString("last_visit"));
				member.setCountVisits(resultSet.getInt("visits"));
				
				return member;
			}
		});
		return payAsYouGoMembers;
	}
	
/*-------- GET 'Other' PROGRAMMES MEMBERS -----------------------------------------------------------------------------------*/
	@Override
	public List<Member> getOtherProgrammesMembers(String programmeType){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name,"
				   + " DATE_FORMAT(membership_status.updated_timestamp, '%d-%m-%Y %H:%i:%s') AS updated_on,"
				   + " membership_status.programme, membership_status.membership_from, membership_status.membership_to,"
				   + " DATEDIFF(STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y'), NOW()) AS days_left,"
				   + " MAX(DATE_FORMAT(member_attendance.visited_timestamp, '%d-%m-%Y %H:%i:%s')) AS last_visit,"
				   + " COUNT(member_attendance.id) AS visits"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " LEFT JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE  membership_status.programme <> \"'1 Month Mbsh'\""
				   + " AND membership_status.programme <> \"'3 Months Mbsh'\""
				   + " AND membership_status.programme <> \"'6 Months Mbsh'\""
				   + " AND membership_status.programme <> \"'12 Months Mbsh'\""
				   + " AND membership_status.programme <> \"'Pay as You Go'\""
				   + " AND membership_status.programme_state = 'active'"
				   + " AND membership_status.programme_booked = 1"
				   + " GROUP BY members.id"
				   + " ORDER BY membership_status.updated_timestamp";
		
		List<Member> otherProgrammesMembers = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));	
				member.setLastName(resultSet.getString("last_name"));
				member.setBookedTimestamp(resultSet.getString("updated_on"));
				member.setProgramme(resultSet.getString("programme"));
				member.setMembershipFrom(resultSet.getString("membership_from"));
				member.setMembershipTo(resultSet.getString("membership_to"));
				member.setMembershipDaysLeft(resultSet.getString("days_left"));
				member.setVisitedTimestamp(resultSet.getString("last_visit"));
				member.setCountVisits(resultSet.getInt("visits"));
				
				return member;
			}
		});
		return otherProgrammesMembers;
	}
	
/*---------- GET MEMBERS COUNT GROUPED BY THE MEMBERSHIP/PROGRAMME TYPE ---------------------------------------------------------------*/
	@Override
	public int getCountProgrammesTypes(String programme){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		if(programme.equals("'Other'")){
			
			String sql = " SELECT COUNT(programme)"
					   + " FROM membership_status"
					   + " WHERE programme <> \"'1 Month Mbsh'\""
				       + " AND programme <> \"'3 Months Mbsh'\""
				       + " AND programme <> \"'6 Months Mbsh'\""
				       + " AND programme <> \"'12 Months Mbsh'\""
				       + " AND programme <> \"'Pay as You Go'\""
					   + " AND programme_state = 'active'"
					   + " AND programme_booked = 1";
			
			return jdbcTemplate.queryForObject(sql, Integer.class);
			
		}else{
			
			String sql = " SELECT COUNT(programme)"
					   + " FROM membership_status"
					   + " WHERE programme = \"" + programme + "\""
					   + " AND programme_state = 'active'"
					   + " AND programme_booked = 1";
			
			return jdbcTemplate.queryForObject(sql, Integer.class);
		}
				   
		
		
	}
	
/*---------- GET VISITED MEMBERS BY THE SPECIFIED PERIOD OF WEEKS (1 Week, 2 Weeks, 4 Weeks, etc..) -----------------------------------*/
	@Override
	public List<Member> getVisitedMembersBySpecifiedWeeks(String startDate){
		System.out.println("data: " + startDate);
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name, membership_status.programme,"
				   + " DATE_FORMAT(member_attendance.visited_timestamp, '%d-%m-%Y %H:%i:%s') AS visited_on, membership_status.membership_from, membership_status.membership_to,"
				   + " DATEDIFF(STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y'), NOW()) AS days_left,"
				   + " DATE_FORMAT(membership_status.updated_timestamp, '%d-%m-%Y %H:%i:%s') AS booked_on"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " LEFT JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE membership_status.updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp) FROM membership_status"
				   + " WHERE membership_status.id = id AND members.id = membership_status.id)"
				   + " AND member_attendance.visited_timestamp >= DATE_ADD(CURDATE(), INTERVAL -" + startDate + " DAY)"
				   + " GROUP BY member_attendance.visited_timestamp"
				   + " ORDER BY member_attendance.visited_timestamp DESC";
		
		List<Member> visitedMembersBySpecifiedWeeks = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));
				member.setLastName(resultSet.getString("last_name"));
				member.setProgramme(resultSet.getString("programme"));
				member.setVisitedTimestamp(resultSet.getString("visited_on"));
				member.setMembershipFrom(resultSet.getString("membership_from"));
				member.setMembershipTo(resultSet.getString("membership_to"));
				member.setMembershipDaysLeft(resultSet.getString("days_left"));
				member.setBookedTimestamp(resultSet.getString("booked_on"));;
				
				return member;
			}
		});
		return visitedMembersBySpecifiedWeeks;
	}
	
/*------------ GET VISITED MEMBER COUNT BY THE SPECIFIED PERIOD OF WEEKS (DAYS) -----------------------------------------------------------*/
	@Override
	public int getVisitedMembersCountBySpecifiedWeeks(int numberOfDays){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT COUNT(DISTINCT visited_timestamp)"
				   + " FROM member_attendance"
				   + " WHERE visited_timestamp >= DATE_ADD(CURDATE(), INTERVAL -" + numberOfDays + " DAY)";
		
		return jdbcTemplate.queryForObject(sql, Integer.class);
	}
}
