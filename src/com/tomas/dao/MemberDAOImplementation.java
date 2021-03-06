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

import com.tomas.model.Member;


/**
 * 
 * This class represents actual coding to deal with jdbc template,
 * I have autowired 'datasource' bean here and passed it to get an object of 'JdbcTemplate' class on. 
 * Now I will be able to call appropriate methods on this 'JdbcTemplate' object to manipulate data in DB.
 *
 */

public class MemberDAOImplementation implements MemberDAO {
	
	/**
	 * To start with spring jdbc template all I need to do is to inject the 'datasource' bean from 
	 * 'spring-servlet.xml' to 'dao' class 
	 */

	@Autowired
	DataSource dataSource;  // database connection settings, located in 'spring-servlet.xml' file
	
	@Autowired
	BottomPanelReportsDAO bottomPanelReportsDAO;  
	
/*------------- GET TOTAL NUMBER OF MEMBERS IN THE DATABASE ------------------------------------------------------------------*/
	@Override
	public int getTotalMembers(){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT COUNT(id) FROM members";
		
		return jdbcTemplate.queryForObject(sql, Integer.class);
	}
	
/*------------- ADD A NEW MEMBER TO THE DATABASE (IMAGE'S REFERENCE SAVED) ---------------------------------------------------------------------------*/
	@Override
	public Member addMember(Member member) {
		
		String sql = " INSERT INTO members (first_name, last_name, ph_number, address, date_of_birth,"
				   + " password, email, date_joined) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		jdbcTemplate.update(sql, new Object[] { member.getFirstName().substring(0, 1).toUpperCase() + member.getFirstName().substring(1).toLowerCase(), 
				member.getLastName().substring(0, 1).toUpperCase() + member.getLastName().substring(1).toLowerCase(), member.getPhNumber(), member.getAddress(),
				member.getDateOfBirth(), member.getPassword(), member.getEmail()});
		
		// get the ID of the last inserted member into the database 
		// and use this ID for inserting data into 'membership_status' table
		//==================================================================================================
		int lastInsertedId = jdbcTemplate.queryForObject("select id from  members where date_joined = "
				+ "(select max(date_joined) from members)", Integer.class);
		
		String sql2 = " INSERT INTO membership_status (id, updated_timestamp, membership_from, membership_to, programme,"
				    + " paid, due_payment, programme_id,"
				    + " programme_state, update_description, programme_booked)"
				    + " VALUES (" + lastInsertedId + ", NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		
		jdbcTemplate.update(sql2, new Object[]{member.getMembershipFrom(), member.getMembershipTo(),member.getProgramme(),
				member.getPaid(), member.getDuePayment(), member.getProgrammeId(),
				member.getProgrammeState(), member.getUpdateDescription(), member.getProgrammeBooked()});
		
		// insert new Member as recently visited
		insertRecentlyVisited(String.valueOf(lastInsertedId));
		
		// assign id value to Member object and use it for the picture to save it in the disk
		member.setId(lastInsertedId);
		//*===================================================================================================
		
		
		return member;
	}
	
/*------------- ADD A NEW MEMBER TO THE DATABASE (IMAGE IN BLOB) ------------------------------------------------------------------------
	@Override
	public Member addMember(Member member) {
		
		String sql = " INSERT INTO members (first_name, last_name, ph_number, address, date_of_birth, email,"
				   + " image, date_joined) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		jdbcTemplate.update(sql, new Object[] { member.getFirstName().substring(0, 1).toUpperCase() + member.getFirstName().substring(1).toLowerCase(), 
				member.getLastName().substring(0, 1).toUpperCase() + member.getLastName().substring(1).toLowerCase(), member.getPhNumber(), member.getAddress(),
				member.getDateOfBirth(), member.getEmail(), member.getInsertImage()}, 
				new int[] {Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.BLOB});
		
		// get the ID of the last inserted member into the database 
		// and use this ID for inserting data into 'membership_status' table
		int lastInsertedId = jdbcTemplate.queryForObject("select id from  members where date_joined = "
				+ "(select max(date_joined) from members)", Integer.class);
		
		String sql2 = " INSERT INTO membership_status (id, updated_timestamp, membership_from, membership_to, programme, paid,"
				    + " programme_state, update_description, programme_booked)"
				    + " VALUES (" + lastInsertedId + ", NOW(), ?, ?, ?, ?, ?, ?, ?)";
		
		jdbcTemplate.update(sql2, new Object[]{member.getMembershipFrom(), member.getMembershipTo(),member.getProgramme(), member.getPaid(),
				member.getProgrammeState(), member.getUpdateDescription(), member.getProgrammeBooked()});
		
		// insert new Member as recently visited
		insertRecentlyVisited(String.valueOf(lastInsertedId));
		
		return member;
	}---*/
	
/*-------------- UPDATE A MEMBER --------------------------------------------------------------------------*/
	@Override
	public boolean updateMember(Member member) {
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		// update 'membership_status' table and set all fields 'programme_state'
		// to 'inactive' if new programme started
		if(member.getProgrammeBooked() == 1){
			
			String sql = " UPDATE membership_status SET programme_state = 'inactive'"
					   + " WHERE id = ?";
			
			jdbcTemplate.update(sql, new Object[]{member.getId()});
		}
		
		// update query into 'members' table
		String sql = " UPDATE members SET first_name = ?, last_name = ?, ph_number = ?, address = ?, email = ?,"
				   + " date_of_birth = ?"
				   + " WHERE id = ?";
		
		// execute this update query in 'members' table
		jdbcTemplate.update(sql, new Object[] { member.getFirstName(), member.getLastName(),
				member.getPhNumber(), member.getAddress(), member.getEmail(), member.getDateOfBirth(), member.getId()});
		
		// insert query into 'membership_status' table
		String sql2 = " INSERT INTO membership_status (id, updated_timestamp, membership_from, membership_to,"
				    + " paid, due_payment, programme_id, programme, programme_state, update_description, programme_booked)"
				    + " VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		
		// execute this insert query in 'membership_status' table
		jdbcTemplate.update(sql2, new Object[] {member.getId(), member.getMembershipFrom(), member.getMembershipTo(),
				member.getPaid(), member.getDuePayment(), member.getProgrammeId(), member.getProgramme(), member.getProgrammeState(), member.getUpdateDescription(), member.getProgrammeBooked()});
		
		// get updated member profile
		return true;
	}
	
/*------------ INSERT IMAGE PATH INTO MEMBERS TABLE ------------------------------------------------------*/
	@Override
	public void insertImagePath(int id, String path){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " UPDATE members"
				   + " SET image_path = '" + path + "'"
				   + " WHERE id = " + id;
		
		jdbcTemplate.update(sql);
	}
	
/*========================================================================================================*/
/*------------ INSERT RECENTLY VISITED MEMBER ------------------------------------------------------------*/
	@Override
	public int insertRecentlyVisited(String id){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		// this query checks if the member's ID is already checked-in today,
		// is so, discard new entry in 'member_attendance' table
		String sqlCheck = " SELECT COUNT(id) FROM member_attendance"
				        + " WHERE STR_TO_DATE(visited_timestamp, '%Y-%m-%d') = STR_TO_DATE(NOW(), '%Y-%m-%d') and id = " + id;
		
		int idValue = jdbcTemplate.queryForObject(sqlCheck, Integer.class);
		
		// if values not found, execute query
		if(idValue == 0){
			
			String sql = "INSERT INTO member_attendance (id, visited_timestamp) VALUES (?, NOW())";
			
			// insert visited member into the database
			jdbcTemplate.update(sql, id);
			
			// get updated number of the today's visits count in the gym
			return bottomPanelReportsDAO.getVisitsCount();
		}
		else{
			
			return 0;
		}
	}
	
/*----------- ADD PAYMENT MADE ON CHECK-IN ('Pay as You Go', due payments, etc. -----------------------------*/
	@Override
	public void addToPay(String id, float toPay){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " UPDATE membership_status SET paid = paid + ?"
                   + " WHERE id = ?"
                   + " AND programme_booked = 1 AND programme_state = 'active'";
		
		jdbcTemplate.update(sql, toPay, id);
	}
/*============================================================================================================*/
	
	
/*------------ RETRIEVE ALL MEMBERS ----------------------------------------------------------------------*/
	@Override
	public List<Member> getMembersList(String idName) {

		List<Member> membersList = new ArrayList<>();

		String sql = "  SELECT members.id, members.first_name, members.last_name,"
				   + " date_format(members.date_joined, '%d-%m-%Y') AS date_joined,"
				   + " membership_status.programme, membership_status.membership_from,"
				   + " membership_status.membership_to, membership_status.paid,"
				   + " DATEDIFF(STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y'), NOW()) AS days_left,"
				   + " COUNT(member_attendance.id) AS visits,"
				   + " MAX(DATE_FORMAT(member_attendance.visited_timestamp, '%d-%m-%Y %H:%i:%s')) AS last_visit"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " LEFT JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE membership_status.updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp) FROM membership_status "
				   + " WHERE membership_status.id = id AND members.id = membership_status.id)"
				   + " AND (members.id LIKE '" + idName + "%' OR members.first_name LIKE '" + idName + "%' OR members.last_name LIKE '" + idName + "%')"
				   + " GROUP BY members.id"
				   + " ORDER BY members.date_joined DESC";
		

		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		membersList = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
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
				member.setMembershipDaysLeft(resultSet.getString("days_left"));
				member.setPaid(resultSet.getFloat("paid"));
				member.setCountVisits(resultSet.getInt("visits"));
				member.setVisitedTimestamp(resultSet.getString("last_visit"));
				
				return member;
			}
		});
		
		return membersList;
	}
	
/*----------- RETRIEVE A MEMBER BY ID ---------------------------------------------------------------------*/
	@Override
	public Member getMemberProfile(int id) {
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name,"
				   + " members.address, members.ph_number, members.date_of_birth, members.email,"
				   + " membership_status.programme, membership_status.membership_from, membership_status.membership_to,"
				   + " membership_status.due_payment, DATE_FORMAT(members.date_joined, '%d-%m-%Y') AS date_joined,"
				   + " membership_status.programme_id,"
				   + " membership_status.programme_state, membership_status.update_description, members.image_path"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " WHERE membership_status.updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp) FROM membership_status"
				   + " WHERE membership_status.id = id AND members.id = membership_status.id)"
				   + " AND members.id = " + id;
		
		return jdbcTemplate.query(sql, new ResultSetExtractor<Member>(){
			
			@Override
			public Member extractData(ResultSet resultSet) throws SQLException, DataAccessException{
				
				if(resultSet.next()){
					
					Member member = new Member();
					
					member.setId(resultSet.getInt("id"));
					member.setFirstName(resultSet.getString("first_name"));
					member.setLastName(resultSet.getString("last_name"));
					member.setAddress(resultSet.getString("address"));
					member.setPhNumber(resultSet.getString("ph_number"));
					member.setDateOfBirth(resultSet.getString("date_of_birth"));
					member.setEmail(resultSet.getString("email"));
					member.setProgramme(resultSet.getString("programme"));
					member.setMembershipFrom(resultSet.getString("membership_from"));
					member.setMembershipTo(resultSet.getString("membership_to"));
					member.setDuePayment(resultSet.getFloat("due_payment"));
					member.setDateJoined(resultSet.getString("date_joined"));
					member.setProgrammeId(resultSet.getInt("programme_id"));
					member.setProgrammeState(resultSet.getString("programme_state"));
					member.setUpdateDescription(resultSet.getString("update_description"));
					member.setImagePath(resultSet.getString("image_path"));
					
					return member;
				}
				return null;
			}
		});
	}
	
	public List<Member> getProgrammesHistory(int id){
		
		List<Member> membersList = new ArrayList<>();

		String sql = " SELECT id, programme, membership_from, membership_to, paid," 
                   + " programme_state, due_payment" 
                   + " FROM membership_status" 
                   + " WHERE id = " + id 
                   + " ORDER BY updated_timestamp DESC";
		

		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		membersList = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber)throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setProgramme(resultSet.getString("programme"));
				member.setMembershipFrom(resultSet.getString("membership_from"));
				member.setMembershipTo(resultSet.getString("membership_to"));
				member.setPaid(resultSet.getFloat("paid"));
				member.setProgrammeState(resultSet.getString("programme_state"));
				member.setDuePayment(resultSet.getFloat("due_payment"));
				
				return member;
			}
		});
		
		return membersList;
	}
	
/*-------------- RETRIEVE A MEMBER BY ID OR NAME -----------------------------------------------------------------*/
	@Override
	public List<Member> searchMember(String name){
		
		List<Member> searchedMember = new ArrayList<>();
		
		String sql = " SELECT members.id, members.first_name, members.last_name, members.image_path,"
				   + " membership_status.programme,"
				   + " IF(membership_status.programme_id = 5, (SELECT final_price FROM programmes_prices WHERE programmeId = 5), membership_status.due_payment) AS to_pay,"
                   + " IF(membership_status.programme_id = 5, (SELECT programme_discount_percentage FROM programmes_prices WHERE programmeId = 5), membership_status.due_payment) AS discount"
				   + " FROM members "
				   + " INNER JOIN membership_status "
				   + " ON members.id = membership_status.id"
				   + " WHERE membership_status.updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp) from membership_status"
				   + " WHERE membership_status.id = id AND members.id = membership_status.id)"
				   + " AND (members.id LIKE '" + name + "%'"
				   + " OR members.first_name LIKE '" + name + "%' OR members.last_name LIKE '" + name + "%')";
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		searchedMember = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber)throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));
				member.setLastName(resultSet.getString("last_name"));
				member.setImagePath(resultSet.getString("image_path"));
				member.setProgramme(resultSet.getString("programme"));
				member.setFinalPrice(resultSet.getFloat("to_pay"));
				member.setProgrammeDiscountPercentage(resultSet.getFloat("discount"));
				
				return member;
			}
		});
		
		return searchedMember;
	}
	
/*-------------- SEARCH MEMBER BY NAME OR ID -----------------------------------------------------------------*/
	@Override
	public List<Member> searchByNameOrId(String nameOrId){
		
		List<Member> searchedMember = new ArrayList<>();
		
		String sql = " SELECT m.id, m.first_name, m.last_name,"
				   + " o.offer_percentage"
				   + " FROM members m"
				   + " LEFT JOIN offers o"
				   + " ON m.id = o.member_id"
				   + " WHERE first_name LIKE '" + nameOrId + "%' OR last_name LIKE '" + nameOrId + "%'"
				   + " OR id LIKE '%" + nameOrId + "%'"
				   + " AND o.end_date >= NOW()"
				   + " AND o.accepted = 0";
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		searchedMember = jdbcTemplate.query(sql, new RowMapper<Member>(){
			
			@Override
			public Member mapRow(ResultSet resultSet, int rowNumber)throws SQLException{
				
				Member member = new Member();
				
				member.setId(resultSet.getInt("id"));
				member.setFirstName(resultSet.getString("first_name"));
				member.setLastName(resultSet.getString("last_name"));
				member.setOfferPercentage(resultSet.getInt("offer_percentage"));
				
				return member;
			}
		});
		System.out.println("searched: " + searchedMember.size());
		return searchedMember;
	}

/*------------ DELETE A MEMBER ---------------------------------------------------------------------------*/
	@Override
	public boolean deleteMember(int id) {
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = "DELETE FROM members WHERE id = ?";
		
		jdbcTemplate.update(sql, id);
		
		return true;
	}
	
/*------------ RETRIEVE LAST ATTENDED MEMBER TO THE GYM --------------------------------------------------*/
	@Override
	public Member getLastAttendedMember(){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name, members.image_path,"
				   + " DATE_FORMAT(member_attendance.visited_timestamp, '%d-%m-%Y %H:%i:%s') AS visited_on,"
				   + " membership_status.membership_to, membership_status.paid,"
				   + " DATEDIFF(STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y'), NOW()) AS days_left"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " INNER JOIN member_attendance"
				   + " ON members.id = member_attendance.id"
				   + " WHERE member_attendance.visited_timestamp = (SELECT MAX(member_attendance.visited_timestamp)"
				   + " FROM member_attendance)"
				   + " AND membership_status.updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp) FROM membership_status"
				   + " WHERE membership_status.id = id AND members.id = membership_status.id)";
		
		return jdbcTemplate.query(sql, new ResultSetExtractor<Member>(){
			
			@Override
			public Member extractData(ResultSet resultSet) throws SQLException, DataAccessException{
				
				if (resultSet.next()) {
					Member member = new Member();

					member.setId(resultSet.getInt("id"));
					member.setFirstName(resultSet.getString("first_name"));
					member.setLastName(resultSet.getString("last_name"));
					member.setImagePath(resultSet.getString("image_path"));
					member.setVisitedTimestamp(resultSet.getString("visited_on"));
					member.setMembershipTo(resultSet.getString("membership_to"));
					member.setPaid(resultSet.getFloat("paid"));
					member.setMembershipDaysLeft(resultSet.getString("days_left"));

					return member;
				}
				return null;
			}
		});
	}
	
/*------------ RETRIEVE RECENTLY BOOKED MEMBERSHIP MEMBER ------------------------------------------------*/
	@Override
	public Member getRecentlyBookedMembership(){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name, members.image_path,"
				   + " DATE_FORMAT(membership_status.updated_timestamp, '%d-%m-%Y') AS updated_on,"
				   + " membership_status.membership_to, membership_status.paid,"
				   + " DATEDIFF(STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y'), NOW()) AS days_left"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " WHERE membership_status.updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp)"
				   + " FROM membership_status"
				   + " WHERE programme_booked = 1"
				   + " AND programme <> \"'Pay as You Go'\")";
		
		return jdbcTemplate.query(sql, new ResultSetExtractor<Member>(){
			
			@Override
			public Member extractData(ResultSet resultSet) throws SQLException, DataAccessException {
				
				if(resultSet.next()){
					
					Member member = new Member();
					
					member.setId(resultSet.getInt("id"));
					member.setFirstName(resultSet.getString("first_name"));
					member.setLastName(resultSet.getString("last_name"));
					member.setImagePath(resultSet.getString("image_path"));
					member.setBookedTimestamp(resultSet.getString("updated_on"));
					member.setMembershipTo(resultSet.getString("membership_to"));
					member.setPaid(resultSet.getFloat("paid"));
					member.setMembershipDaysLeft(resultSet.getString("days_left"));
					
					return member;
				}
				return null;
			}	
		});
	}
/*------------ RETRIEVE RECENTLY JOINED MEMBER -----------------------------------------------------------*/
	@Override
	public Member getRecentlyJoined(){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT members.id, members.first_name, members.last_name, members.image_path, DATE_FORMAT(members.date_joined, '%d-%m-%Y') AS joined_on,"
				   + " membership_status.membership_to, membership_status.paid,"
				   + " DATEDIFF(STR_TO_DATE(membership_status.membership_to, '%d-%m-%Y'), NOW()) AS days_left"
				   + " FROM members"
				   + " INNER JOIN membership_status"
				   + " ON members.id = membership_status.id"
				   + " WHERE members.date_joined = (SELECT MAX(members.date_joined) from members)"
				   + " AND membership_status.updated_timestamp ="
				   + " (SELECT MAX(updated_timestamp) FROM membership_status"
				   + " WHERE membership_status.id = id AND members.id = membership_status.id)";
		
        return jdbcTemplate.query(sql, new ResultSetExtractor<Member>(){
			
			@Override
			public Member extractData(ResultSet resultSet) throws SQLException, DataAccessException {
				
				if(resultSet.next()){
					
					Member member = new Member();
					
					member.setId(resultSet.getInt("id"));
					member.setFirstName(resultSet.getString("first_name"));
					member.setLastName(resultSet.getString("last_name"));
					member.setImagePath(resultSet.getString("image_path"));
					member.setDateJoined(resultSet.getString("joined_on"));
					member.setMembershipTo(resultSet.getString("membership_to"));
					member.setPaid(resultSet.getFloat("paid"));
					member.setMembershipDaysLeft(resultSet.getString("days_left"));
					
					return member;
				}
				return null;
			}	
		});
	}
}
