package com.tomas.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

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
	
/*------------ INSERT IMAGE PATH INTO PRODUCTS TABLE ------------------------------------------------------*/
	@Override
	public void insertImagePath(int id, String path){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " UPDATE products"
				   + " SET image_path = '" + path + "'"
				   + " WHERE id = " + id;
		
		jdbcTemplate.update(sql);
	}
	
/*----------- DISPLAY ALL PRODUCTS AVAILABLE --------------------------------------------------------------*/
	@Override
	public List<Product> displayAllProducts(){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT * FROM products";
		
		List<Product> products = jdbcTemplate.query(sql, new RowMapper<Product>(){
			
			@Override
			public Product mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				Product product = new Product();
				
				product.setId(resultSet.getInt("id"));
				product.setCategory(resultSet.getString("category"));
				product.setName(resultSet.getString("name"));
				product.setManufacturer(resultSet.getString("manufacturer"));
				product.setPrice(resultSet.getFloat("price"));
				product.setUnits(resultSet.getInt("units"));
				product.setStatus(resultSet.getString("status"));
				product.setDescription(resultSet.getString("description"));
				product.setAddedDate(resultSet.getString("added_date"));
				product.setImagePath(resultSet.getString("image_path"));
				
				return product;
			}
		});
		return products;
	}
	
/*--------- DISPLAY PRODUCTS BY CATEGORY ------------------------------------------------------------------*/
	@Override
	public List<Product> displayProductsByCategory(String category){
		
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT * FROM products"
				   + " WHERE category = '" + category+ "'";
		
		List<Product> products = jdbcTemplate.query(sql, new RowMapper<Product>(){
			
			@Override
			public Product mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				Product product = new Product();
				
				product.setId(resultSet.getInt("id"));
				product.setCategory(resultSet.getString("category"));
				product.setName(resultSet.getString("name"));
				product.setManufacturer(resultSet.getString("manufacturer"));
				product.setPrice(resultSet.getFloat("price"));
				product.setUnits(resultSet.getInt("units"));
				product.setStatus(resultSet.getString("status"));
				product.setDescription(resultSet.getString("description"));
				product.setAddedDate(resultSet.getString("added_date"));
				product.setImagePath(resultSet.getString("image_path"));
				
				return product;
			}
		});
		return products;
	}
	
/*------- SELL PRODUCT ---------------------------------------------------------------------------------------*/
	@Override
	public String sellProduct(int memberId, int productId, int quantity, float totalPrice){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " INSERT INTO products_sales (member_id, product_id, quantity, paid, purchase_timestamp)"
				   + " VALUES (?, ?, ?, ?, NOW())";
		
		
		jdbcTemplate.update(sql, new Object[]{memberId, productId, quantity, totalPrice});
		//jdbcTemplate.update(sql, memberId, productId, quantity, totalPrice );
		
		return "Successfully purchased the product!";
	}
	
/*------ RESERVE THE PRODUCT FOR CUSTOMER -------------------------------------------------------------------*/
	@Override
	public String reserveProduct(int memberId, int productId, int quantity){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " INSERT INTO products_sales (member_id, product_id, quantity, paid, purchase_timestamp"
				   + " VALUES (?, ?, ?, ?, NOW())";
		
		
		
		jdbcTemplate.update(sql, memberId, productId, quantity);
		
		return "Successfully reserved the product!";
	}
	
/*------ GET/DISPLAY SOLD PRODUCTS -------------------------------------------------------------------------*/
	@Override
	public List<Product> getSoldProducts(){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT ";
		
		List<Product> soldProducts = jdbcTemplate.query(sql, new RowMapper<Product>(){
			
			@Override
			public Product mapRow(ResultSet resultSet, int rowNumber){
				
				Product product = new Product();
				
				return product;
			}
		});
		
		return soldProducts;
	}
	
/*------ GET/DISPLAY RESERVED PRODUCTS ---------------------------------------------------------------------*/
	@Override
	public List<Product> getReservedProducts(){
		
JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT ";
		
		List<Product> reservedProducts = jdbcTemplate.query(sql, new RowMapper<Product>(){
			
			@Override
			public Product mapRow(ResultSet resultSet, int rowNumber){
				
				Product product = new Product();
				
				return product;
			}
		});
		return reservedProducts;
	}
}
