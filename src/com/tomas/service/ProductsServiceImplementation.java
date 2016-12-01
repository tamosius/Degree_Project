package com.tomas.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.dao.OfferDAO;
import com.tomas.dao.ProductsDAO;
import com.tomas.model.Product;
import com.tomas.model.ProductReserved;
import com.tomas.model.ProductSold;

public class ProductsServiceImplementation implements ProductsService{
	
	@Autowired
	ProductsDAO productsDAO;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	SaveImageService saveImageService;
	
	@Autowired
	OfferDAO offerDAO;

	public Product addProduct(HttpServletRequest request, CommonsMultipartFile image){
		
		Product product = new Product();
		
		product.setCategory(request.getParameter("productCategory"));
		product.setName(request.getParameter("productName"));
		product.setManufacturer(request.getParameter("productManufacturer"));
		product.setPrice(Float.parseFloat(request.getParameter("productPrice")));
		product.setUnits(Integer.parseInt(request.getParameter("unitsStock")));
		product.setStatus(request.getParameter("status"));
		product.setDescription(request.getParameter("productDescription"));
		
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
	
/*----------- SELL THE PRODUCT ----------------------------------------------------------------------------*/
	@Override
	public String sellProduct(int memberId, int productId, int quantity, float actualPrice, float totalPrice, float offerPercent){
		
		// receive successful message if product transaction successful
		String successfulMessage = productsDAO.sellProduct(memberId, productId, quantity, actualPrice, totalPrice, offerPercent); 
		
		if(successfulMessage.length() > 0 && offerPercent == 0){ // if no offer, assign new offer for the member with the specified values
			
			// offers days available for the next purchase
			int offerDays = 5;
			// offer percentage available to buy new product within specified offer days
			int offerPercentage = 15;
		    // subject attached to email
			String subject = "Thank you from ToMi! Receive " + offerPercentage + "% deal!!!";
			
			// get details of customer and product purchased
			ProductSold details = productsDAO.getMemberProductDetails(memberId, productId);
			
			//if(details != null){
				
				// send an offer email and get the template of email sent, store it in the database
				String offerTemplate = emailService.sendOfferEmail(subject, details.getFirstName(), details.getEmail(),
						details.getName(), offerPercentage, offerDays); // 'getName()' = product name
				
				// store this offer in the database
				offerDAO.addOffer(memberId, subject, offerTemplate, offerDays, offerPercentage, false);  // 'false' = member did not accepted this offer yet
			//}
		}else if(successfulMessage.length() > 0 && offerPercent > 0){  // member accepted an offer and buys the product
			                                                           // update 'offers' table
			offerDAO.acceptOffer(memberId, true);
		}
		return successfulMessage;
	}
	
/*----------- RESERVE THE PRODUCT FOR THE CUSTOMER --------------------------------------------------------*/
	@Override
	public String reserveProduct(int memberId, int productId, int quantity, float totalPrice){
		
		return productsDAO.reserveProduct(memberId, productId, quantity, totalPrice);
	}
	
/*------ GET/DISPLAY SOLD PRODUCTS (return 'Member' object along with 'Product' object) -------------------*/
	@Override
	public List<ProductSold> getSoldProducts(){
		
		return productsDAO.getSoldProducts();
	}
	
/*------ GET/DISPLAY RESERVED PRODUCTS (return 'Member' object along with 'Product' object) ---------------*/
	@Override
	public List<ProductReserved> getReservedProducts(){
		
		return productsDAO.getReservedProducts();
	}
}
