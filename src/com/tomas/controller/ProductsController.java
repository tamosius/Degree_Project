package com.tomas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.model.Product;
import com.tomas.service.ProductsService;

@RestController
@RequestMapping(value="/products")
public class ProductsController {
	
	@Autowired
	ProductsService productsService;

/*------ ADD NEW PRODUCT TO THE DATABASE ----------------------------------------------------------------------------------*/
	@RequestMapping(value="/addProduct", method=RequestMethod.POST, headers="Accept=application/json")
	public Product addProduct(@RequestParam("imageFor") String imageFor, @RequestParam ("image") CommonsMultipartFile image, @RequestParam ("category") String category,
			@RequestParam("name") String name, @RequestParam("manufacturer") String manufacturer, @RequestParam("price") float price,
			@RequestParam("units") int units, @RequestParam("status") String status, @RequestParam("description") String description){
		
		
		
		return productsService.addProduct(imageFor, image, category, name, manufacturer, price, units, status, description);
	}
}
