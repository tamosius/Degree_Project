package com.tomas.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class SaveImageServiceImplementation implements SaveImageService{
	
	//private String path = "/home/tomas/STS/Degree_Project/WebContent/resources/images/";  // path for Linux
	
	private String path = "C:\\Users\\Tomas\\Documents\\Spring_Tool_Suite\\Degree_Project\\WebContent\\resources\\images\\";  // path for L
	
	//private String path = "/home/tomas/STS/Degree_Project/WebContent/resources/images/profileImages/";  // path for Windows
	
	public void saveImage(CommonsMultipartFile image, int id, String imageFor){
		
		try {
			
			BufferedImage buffImage = ImageIO.read(image.getInputStream());
			
			if(imageFor.equals("members")){
				
				ImageIO.write(buffImage, "jpg", new File(path + "membersImages/" + id + ".jpg"));
			}
			else if(imageFor.equals("products")){
				
				ImageIO.write(buffImage, "jpg", new File(path + "productsImages/" + id + ".jpg"));
			}
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
