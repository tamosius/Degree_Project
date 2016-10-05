package com.tomas.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;

public class AuthenticationImplementation {

	@Autowired
	DataSource dataSource;
}
