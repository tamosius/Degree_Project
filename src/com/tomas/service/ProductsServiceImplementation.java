package com.tomas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.dao.ProductsDAO;
import com.tomas.model.Product;

public class ProductsServiceImplementation implements ProductsService{
	
	@Autowired
	ProductsDAO productsDAO;
	
	@Autowired
	SaveImageService saveImageService;

	public Product addProduct(String imageFor, CommonsMultipartFile image, String category,
			String name, String manufacturer, float price, int units, @RequestParam("status") 
	        String status, String description){
		
		Product product = new Product();
		
		product.setCategory(category);
		product.setName(name);
		product.setManufacturer(manufacturer);
		product.setPrice(price);
		product.setUnits(units);
		product.setStatus(status);
		product.setDescription(description);
				
		product = productsDAO.addProduct(product);
				
		saveImageService.saveImage(image, product.getId(), imageFor);
		
		return product;
	}
}
