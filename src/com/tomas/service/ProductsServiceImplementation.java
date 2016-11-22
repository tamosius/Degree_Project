package com.tomas.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.dao.ProductsDAO;
import com.tomas.model.Product;

public class ProductsServiceImplementation implements ProductsService{
	
	@Autowired
	ProductsDAO productsDAO;
	
	@Autowired
	SaveImageService saveImageService;

	public Product addProduct(HttpServletRequest request, CommonsMultipartFile image){
		
		Product product = new Product();
		
		product.setCategory(request.getParameter("productCategory"));
		product.setName(request.getParameter("productName"));
		product.setManufacturer(request.getParameter("productManufacturer"));
		product.setPrice(Float.parseFloat(request.getParameter("productPrice")));
		product.setUnits(Integer.parseInt(request.getParameter("unitsStock")));
		product.setStatus(request.getParameter("status"));
		product.setDescription(request.getParameter("productDescription"));
		System.out.println("executed");
		product = productsDAO.addProduct(product);
		
		// determine if there is an upload image
		String imageName = image.getOriginalFilename();
		if(!imageName.equals("")){
			
			// save path for image
			productsDAO.insertImagePath(product.getId(), product.getId() + ".jpg");
			// save image on the disk
			saveImageService.saveImage(image, product.getId(), "products");
			
		}else{
			
			productsDAO.insertImagePath(product.getId(), "no_image.jpg");;  // insert 'no_image.jpg'
		}
		
		
		return product;
	}
	
/*----------- DISPLAY ALL PRODUCTS AVAILABLE --------------------------------------------------------------*/
	@Override
	public List<Product> displayAllProducts(){
		
		return productsDAO.displayAllProducts();
	}
	
/*--------- DISPLAY PRODUCTS BY CATEGORY ------------------------------------------------------------------*/
	@Override
	public List<Product> displayProductsByCategory(String category){
		
		return productsDAO.displayProductsByCategory(category);
	}
	
/*----------- SELL THE PRODUCT ---------------------------------------------------------------------------*/
	@Override
	public String sellProduct(int memberId, int productId, int quantity, float totalPrice){
		
		return productsDAO.sellProduct(memberId, productId, quantity, totalPrice);
	}
	
/*----------- RESERVE THE PRODUCT FOR THE CUSTOMER ---------------------------------------------------------------------------*/
	@Override
	public String reserveProduct(int memberId, int productId, int quantity){
		
		return productsDAO.reserveProduct(memberId, productId, quantity);
	}
	
/*------ GET/DISPLAY SOLD PRODUCTS -------------------------------------------------------------------------*/
	@Override
	public List<Product> getSoldProducts(){
		
		return productsDAO.getSoldProducts();
	}
	
/*------ GET/DISPLAY RESERVED PRODUCTS ---------------------------------------------------------------------*/
	@Override
	public List<Product> getReservedProducts(){
		
		return productsDAO.getReservedProducts();
	}
}
