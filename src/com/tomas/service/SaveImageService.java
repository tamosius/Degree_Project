package com.tomas.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public interface SaveImageService {

	public void saveImage(CommonsMultipartFile image, int id, String imageFor, HttpServletRequest request);  // save image to disk
	
	public void deleteImage(int id, String imageFor, HttpServletRequest request);   // delete image from the disk
}
