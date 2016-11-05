package com.tomas.service;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.model.Product;

public interface ProductsService {

	public Product addProduct(String imageFor, CommonsMultipartFile image, String category,
			String name, String manufacturer, float price, int units, @RequestParam("status") 
	        String status, String descriptiont);  // add new product to the database
}
