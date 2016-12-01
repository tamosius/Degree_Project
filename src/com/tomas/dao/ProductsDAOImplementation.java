package com.tomas.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.tomas.model.Product;
import com.tomas.model.ProductReserved;
import com.tomas.model.ProductSold;

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
	public String sellProduct(int memberId, int productId, int quantity, float actualPrice, float totalPrice, float offerPercentage){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " INSERT INTO products_sales (member_id, product_id, quantity, actual_price, paid, purchase_timestamp, offer_percentage)"
				   + " VALUES (?, ?, ?, ?, ?, NOW(), ?)";
		
		
		jdbcTemplate.update(sql, new Object[]{memberId, productId, quantity, actualPrice, totalPrice, offerPercentage});
		//jdbcTemplate.update(sql, memberId, productId, quantity, totalPrice );
		
		return "Successfully purchased the product!";
	}
	
/*------ RESERVE THE PRODUCT FOR CUSTOMER -------------------------------------------------------------------*/
	@Override
	public String reserveProduct(int memberId, int productId, int quantity, float totalPrice){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " INSERT INTO products_reserved (member_id, product_id, quantity, total_price,"
				   + " reserved_date, expire_date)"
				   + " VALUES (?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY))";
		
		
		
		jdbcTemplate.update(sql, new Object[]{memberId, productId, quantity, totalPrice});
		
		return "Successfully reserved the product!";
	}
	
/*------ GET/DISPLAY SOLD PRODUCTS (return 'Member' object along with 'Product' object) ---------------------*/
	@Override
	public List<ProductSold> getSoldProducts(){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT products_sales.member_id, products_sales.product_id,"
                   + " products.price, products_sales.quantity,"
                   + " products_sales.paid, products.name,"
                   + " members.first_name, members.last_name,"
                   + " DATE_FORMAT(products_sales.purchase_timestamp, '%d-%m-%Y %H:%i:%s') AS purchase_timestamp,"
                   + " products.image_path"
                   + " FROM products_sales"
                   + " INNER JOIN members"
                   + " ON products_sales.member_id = members.id"
                   + " INNER JOIN products"
                   + " ON products_sales.product_id = products.id ";
		
		// return 'Member' object along with 'Product' object
		List<ProductSold> soldProducts = jdbcTemplate.query(sql, new RowMapper<ProductSold>(){
			
			@Override
			public ProductSold mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				ProductSold soldProduct = new ProductSold();
				
				soldProduct.setMemberId(resultSet.getInt("member_id"));
				soldProduct.setId(resultSet.getInt("product_id"));
				soldProduct.setPrice(resultSet.getFloat("price"));
				soldProduct.setQuantity(resultSet.getInt("quantity"));
				soldProduct.setTotalPrice(resultSet.getFloat("paid"));
				soldProduct.setName(resultSet.getString("name"));
				soldProduct.setFirstName(resultSet.getString("first_name"));
				soldProduct.setLastName(resultSet.getString("last_name"));
				soldProduct.setPurchasedDate(resultSet.getString("purchase_timestamp"));
				soldProduct.setImagePath(resultSet.getString("image_path"));
				
				return soldProduct;
			}
		});
		
		return soldProducts;
	}
	
/*------ GET/DISPLAY RESERVED PRODUCTS (return 'Member' object along with 'Product' object) -----------------*/
	@Override
	public List<ProductReserved> getReservedProducts(){
		
JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT products_reserved.member_id, products_reserved.product_id,"
                   + " products.price, products_reserved.quantity,"
                   + " products_reserved.total_price, products.name,"
                   + " members.first_name, members.last_name,"
                   + " DATE_FORMAT(products_reserved.reserved_date, '%d-%m-%Y %H:%i:%s') AS reserved_date,"
                   + " DATE_FORMAT(products_reserved.expire_date, '%d-%m-%Y') AS expire_date,"
                   + " products.image_path"
                   + " FROM products_reserved"
                   + " INNER JOIN members"
                   + " ON products_reserved.member_id = members.id"
                   + " INNER JOIN products"
                   + " ON products_reserved.product_id = products.id ";
		
		List<ProductReserved> reservedProducts = jdbcTemplate.query(sql, new RowMapper<ProductReserved>(){
			
			@Override
			public ProductReserved mapRow(ResultSet resultSet, int rowNumber) throws SQLException{
				
				ProductReserved reservedProduct = new ProductReserved();
				
				reservedProduct.setMemberId(resultSet.getInt("member_id"));
				reservedProduct.setId(resultSet.getInt("product_id"));
				reservedProduct.setPrice(resultSet.getFloat("price"));
				reservedProduct.setQuantity(resultSet.getInt("quantity"));
				reservedProduct.setTotalPrice(resultSet.getFloat("total_price"));
				reservedProduct.setName(resultSet.getString("name"));
				reservedProduct.setFirstName(resultSet.getString("first_name"));
				reservedProduct.setLastName(resultSet.getString("last_name"));
				reservedProduct.setReservedDate(resultSet.getString("reserved_date"));
				reservedProduct.setExpireDate(resultSet.getString("expire_date"));
				reservedProduct.setImagePath(resultSet.getString("image_path"));
				
				return reservedProduct;
			}
		});
		return reservedProducts;
	}
	
/*------ GET DETAILS OF MEMBER AND PRODUCT PURCHASED BY ID -------------------------------------------------------*/
	@Override
	public ProductSold getMemberProductDetails(int memberId, int productId){
		
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		String sql = " SELECT m.first_name, m.email, p.name"
				   + " FROM members m"
				   + " INNER JOIN products p"
				   + " WHERE m.id = " + memberId + " AND p.id = " + productId;
		
		return jdbcTemplate.query(sql, new ResultSetExtractor<ProductSold>(){
			
			@Override
			public ProductSold extractData(ResultSet resultSet) throws SQLException{
				
				if(resultSet.next()){
					
					ProductSold details = new ProductSold();
					
					details.setFirstName(resultSet.getString("first_name"));
					details.setEmail(resultSet.getString("email"));
					details.setName(resultSet.getString("name"));
					
					return details;
				}
				return null;
			}
		});
	}
}
