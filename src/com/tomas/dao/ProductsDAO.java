package com.tomas.dao;

import java.util.List;

import com.tomas.model.Product;

public interface ProductsDAO {

	public Product addProduct(Product product);        // add new product to the database
	
	public void insertImagePath(int id, String path);  // insert image path for the product
	
	public List<Product> displayAllProducts();         // display all products available
	
	public List<Product> displayProductsByCategory(String category);  // display products by the category
	
	public String sellProduct(int memberId, int productId, int quantity, float totalPrice);  // save details within sold product
	
	public String reserveProduct(int memberId, int productId, int quantity);  // reserve the product for customer
	
	public List<Product> getSoldProducts();    // get/display sold products
	
	public List<Product> getReservedProducts();  // get/display reserved products
}

