package com.tomas.dao;

import java.util.List;

import com.tomas.model.Product;
import com.tomas.model.ProductReserved;
import com.tomas.model.ProductSold;

public interface ProductsDAO {

	public Product addProduct(Product product);        // add new product to the database
	
	public void insertImagePath(int id, String path);  // insert image path for the product
	
	public List<Product> displayAllProducts();         // display all products available
	
	public List<Product> displayProductsByCategory(String category);          // display products by the category
	
	public String sellProduct(int memberId, int productId, int quantity, float actualPrice, float totalPrice, float offerPercentage);    // save details within sold product
	
	public String reserveProduct(int memberId, int productId, int quantity, float totalPrice); // reserve the product for customer
	
	public List<ProductSold> getSoldProducts();          // get/display sold products (return 'Member' object along with 'Product' object)
	
	public List<ProductReserved> getReservedProducts();  // get/display reserved products (return 'Member' object along with 'Product' object)
	
	public ProductSold getMemberProductDetails(int memberId, int productId);  // get member and product details by ID's
}

