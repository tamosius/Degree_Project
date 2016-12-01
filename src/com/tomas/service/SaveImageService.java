package com.tomas.service;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public interface SaveImageService {

	public void saveImage(CommonsMultipartFile image, int id, String imageFor);  // save image to disk
}
