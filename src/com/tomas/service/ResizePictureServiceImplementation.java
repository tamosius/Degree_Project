package com.tomas.service;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.Serializable;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class ResizePictureServiceImplementation implements ResizePictureService, Serializable{
	
	private final int SCALE_WIDTH = 500;
	private final int SCALE_HEIGHT = 700;
	private final boolean PRESERVE_ALPHA = true;

	public BufferedImage createResizedCopy(CommonsMultipartFile image) {
		
		BufferedImage imageToResize = null;
		
		try {
			imageToResize = ImageIO.read(image.getInputStream());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		int imageType = PRESERVE_ALPHA ? BufferedImage.TYPE_INT_RGB : BufferedImage.TYPE_INT_ARGB;
		
		BufferedImage scaledBI = new BufferedImage(SCALE_WIDTH, SCALE_HEIGHT, imageType);
		
		Graphics2D g = scaledBI.createGraphics();
		
		if (PRESERVE_ALPHA) {
			g.setComposite(AlphaComposite.Src);
		}
		
		g.drawImage(imageToResize, 0, 0, SCALE_WIDTH, SCALE_HEIGHT, null);
		
		g.dispose();
		
		return scaledBI;
	}
}
