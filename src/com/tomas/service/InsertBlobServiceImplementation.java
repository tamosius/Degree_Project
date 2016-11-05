package com.tomas.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class InsertBlobServiceImplementation implements InsertBlobService{
	
	
	// return 'SqlLobValue' to insert into database
	public SqlLobValue insertBlob(CommonsMultipartFile image){
		
		File imageFile = new File(image.getOriginalFilename());
		
		InputStream inputImage = null;
		
		try {
			
			// convert 'CommonsMultipartFile' to 'File'
			image.transferTo(imageFile);
			
			inputImage = new FileInputStream(imageFile);
			
		} catch (IllegalStateException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		// 'LobHandler' is the default handler
		// A LobCreator that can be used to set the values for the LOB columns in your SQL insert statement
		LobHandler lobHandler = new DefaultLobHandler();
		
		return new SqlLobValue(inputImage, (int)imageFile.length(), lobHandler);
	}
}
