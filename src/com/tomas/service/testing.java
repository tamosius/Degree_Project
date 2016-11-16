package com.tomas.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class testing {

	public static void main(String[] args) {
	
		File f = null;
		
		f = new File("src/com/tomas/service/email_templates/welcomeEmail.txt");
		
		System.out.println("file exists: " + f.exists());
		
		String path = f.getPath();
		
		System.out.println("path: " + path);
		
		
		
		
		
		/*try(Scanner input = new Scanner(new File("src" + File.separator + "com" + File.separator 
				+ "tomas" + File.separator + "service" + File.separator + "email_templates" + File.separator + "welcomeEmail.txt"))) {
			
			String emailTemplate = input.useDelimiter("\\Z").next();
			
			String re = emailTemplate.replace("MEMBERNAME", "Tomas");
			
			System.out.println(re);
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		

	}

}
