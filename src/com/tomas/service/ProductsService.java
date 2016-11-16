package com.tomas.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.model.Product;

public interface ProductsService {

	public Product addProduct(HttpServletRequest request, CommonsMultipartFile image);  // add new product to the database
	
    public List<Product> displayAllProducts();         // display all products available
	
	public List<Product> displayProductsByCategory(String category);  // display products by the category
	
	public String sellProduct(int memberId, int productId, int quantity, float totalPrice);  // save details within sold product
	
	public String reserveProduct(int memberId, int productId, int quantity);  // reserve the product for customer
}
