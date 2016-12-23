package com.tomas.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.model.Product;
import com.tomas.model.ProductReserved;
import com.tomas.model.ProductSold;
import com.tomas.service.ProductsService;

@RestController
@RequestMapping(value="/products")
public class ProductsController {
	
	@Autowired
	ProductsService productsService;

/*------ ADD NEW PRODUCT TO THE DATABASE ------------------------------------------------------------------*/
	@RequestMapping(value="/addProduct", method=RequestMethod.POST, headers="Accept=application/json")
	public Product addProduct(HttpServletRequest request, @RequestParam CommonsMultipartFile newProductImage){
		
		return productsService.addProduct(request, newProductImage);
	}
	
/*----------- DISPLAY ALL PRODUCTS AVAILABLE --------------------------------------------------------------*/
	@RequestMapping(value="/getAllProducts", method=RequestMethod.GET, headers="Accept=application/json")
	public List<Product> displayAllProducts(){
		
		return productsService.displayAllProducts();
	}
	
/*--------- DISPLAY PRODUCTS BY CATEGORY ------------------------------------------------------------------*/
	@RequestMapping(value="/getByCategoryProducts", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Product> displayProductsByCategory(@RequestParam("category") String category){
		
		return productsService.displayProductsByCategory(category);
	}
	
/*--------- SELL PRODUCT ----------------------------------------------------------------------------------*/
	@RequestMapping(value="/sellProduct", method=RequestMethod.POST, headers="Accept=application/json")
	public String sellProduct(@RequestParam("memberId") int memberId, @RequestParam("productId") int productId, @RequestParam("quantity") int quantity,
			@RequestParam("actualPrice") float actualPrice, @RequestParam("totalPrice") float totalPrice, @RequestParam("offerPercentage") float offerPercentage){
		
		return productsService.sellProduct(memberId, productId, quantity, actualPrice, totalPrice, offerPercentage);
	}
	
/*--------- RESERVE THE PRODUCT FOR THE CUSTOMER ----------------------------------------------------------*/
	@RequestMapping(value="/reserveProduct", method=RequestMethod.POST, headers="Accept=application/json")
	public String reserveProduct(@RequestParam("memberId") int memberId, @RequestParam("productId") int productId, @RequestParam("quantity") int quantity,
			@RequestParam("totalPrice") float totalPrice){
		
		return productsService.reserveProduct(memberId, productId, quantity, totalPrice);
	}
	
/*-------- GET/DISPLAY SOLD PRODUCTS ----------------------------------------------------------------------*/
	@RequestMapping(value="/soldProducts", method=RequestMethod.GET, headers="Accept=application/json")
	public List<ProductSold> getSoldProducts(){
		
		return productsService.getSoldProducts();
	}
	
/*-------- GET/DISPLAY RESERVED PRODUCTS ------------------------------------------------------------------*/
	@RequestMapping(value="/reservedProducts", method=RequestMethod.GET, headers="Accept=application/json")
	public List<ProductReserved> getReservedProducts(){
		
		return productsService.getReservedProducts();
	}
	
/*-------- DELETE PRODUCTS FROM THE DATABASE --------------------------------------------------------------*/
	@RequestMapping(value="/deleteProduct", method=RequestMethod.POST, headers="Accept=application/json")
	public String deleteProduct(HttpServletRequest request, @RequestParam("productId") int id){
		
		return productsService.deleteProduct(request, id);
	}
	
/*-------- DELETE PRODUCTS FROM THE DATABASE --------------------------------------------------------------*/
	@RequestMapping(value="/updateProduct", method=RequestMethod.POST, headers="Accept=application/json")
	public String updateProduct(HttpServletRequest request, @RequestParam CommonsMultipartFile updateProductImage){
		
		return productsService.updateProduct(request, updateProductImage);
	}
	
/*-------- CHECK VALIDATION OF RESERVED PRODUCTS -----------------------------------------------------------*/
	@RequestMapping(value="/checkValidateReservation", method=RequestMethod.POST, headers="Accept=application/json")
	public String checkValidateReservation(){
		
		return productsService.checkValidateReservation();
	}
}
