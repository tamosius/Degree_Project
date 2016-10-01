package com.tomas.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;

public class DataBaseConnection {
	
	private final String URL = "jdbc:mysql://localhost/gym";
	private final String USERNAME = "root";
	private final String PASSWORD = "";
	
	private Connection connection = null;
	private PreparedStatement selectAll = null;
	private PreparedStatement addMember = null;  // insert name, message and time message has been written 
	private PreparedStatement deleteMember = null;  // delete all messages by user's name
	
	public DataBaseConnection(){
		
		try{
			
			// load the JDBC driver (but is not necessary for java 6 and above)
			Class.forName("com.mysql.jdbc.Driver");
			System.out.println("Driver loaded.");
			// establish connection to database
			connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
			
			// create queries
			//selectLast20 = connection.prepareStatement("select firstName, message, date(sentOn), time(sentOn)"
					//+ " from testChat order by sentOn desc limit 20");
			selectAll = connection.prepareStatement("");
			addMember = connection.prepareStatement("");
			deleteMember = connection.prepareStatement("");
			
		}catch(SQLException e){
			e.printStackTrace();
		}catch(ClassNotFoundException e){
			e.printStackTrace();
		}
	}
	
	public String[] getMessages(){
		
		ResultSet resultSet = null;
		String[] member = {};
		//JSONArray messages = new  JSONArray();
		//JSONObject oneMessage;
		
		try{
			resultSet = selectAll.executeQuery();
			
			resultSet.afterLast();  // move the cursor at the end of resultSet
			
			while(resultSet.previous()){  // move the cursor backwards 
				
				//oneMessage = new JSONObject(); // create new Object for this data
				
				//oneMessage.put("name", resultSet.getString(1)); // get user's name
				
				//oneMessage.put("message", resultSet.getString(2)); // get user's message
				
				//oneMessage.put("date", resultSet.getString(3));  // get message's date e.g.'2015-10-29'
				
				//oneMessage.put("time", resultSet.getString(4));  // get message's time
				
				
				//messages.add(oneMessage);  // add this object to JSON array
				
			}
			
		}catch(SQLException e){
			e.printStackTrace();
		}finally{
			try{
				resultSet.close();
			}catch(SQLException e){
				//e.printStackTrace();
			}
		}
		
		return member;
	}
	
	public void addRecord(String firstName, String message){
		
		try{
			addMember.setString(1, firstName);
			addMember.setString(2, message);
			
			addMember.executeUpdate();
			
		}catch(SQLException e){
			e.printStackTrace();
		}
	}
	public void printMessages(){
		ResultSet resultSet = null;
		try{
			resultSet = selectAll.executeQuery();
			while(resultSet.next()){
				System.out.println("Name: " + resultSet.getString(1) + "\nMessage: " + resultSet.getString(2) + 
						"\nTime: " + resultSet.getString(3));
			}
		}catch(SQLException e){
			e.printStackTrace();
		}finally{
			try{
				resultSet.close();
			}catch(SQLException e){
				//e.printStackTrace();
			}
		}
	}
	public void deleteMessages(String firstName){
		
		try{
			deleteMember.setString(1, firstName);
			
			deleteMember.executeUpdate();
			
		}catch(SQLException e){
			e.printStackTrace();
		}
	}

}

