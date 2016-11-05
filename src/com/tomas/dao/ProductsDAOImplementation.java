package com.tomas.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.tomas.model.Product;

public class ProductsDAOImplementation implements ProductsDAO{
	
	@Autowired
	DataSource dataSource;

	
/*------ ADD NEW PRODUCT TO THE DATABASE ----------------------------------------------------------------------------------*/
	public Product addProduct(Product product){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " INSERT INTO products(category, name, manufacturer, price, units, status, description)"
				   + " VALUES(?, ?, ?, ?, ?, ?, ?)";
		
		jdbcTemplate.update(sql, new Object[]{product.getCategory(), product.getName(), product.getManufacturer(),
				product.getPrice(), product.getUnits(), product.getStatus(), product.getDescription()});
		
		// get the ID of the last inserted member into the database 
	    // and use this ID for inserting data into 'membership_status' table
		int lastInsertedId = jdbcTemplate.queryForObject("SELECT id FROM  products where added_date = "
				+ "(SELECT MAX(added_date) FROM products)", Integer.class);
		
		product.setId(lastInsertedId);
		
		return product;
	}
}
