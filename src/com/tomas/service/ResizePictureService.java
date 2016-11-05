package com.tomas.service;

import java.awt.image.BufferedImage;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public interface ResizePictureService {

	public BufferedImage createResizedCopy(CommonsMultipartFile image);
}
