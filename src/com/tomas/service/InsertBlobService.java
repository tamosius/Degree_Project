package com.tomas.service;

import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

public interface InsertBlobService {

	public SqlLobValue insertBlob(CommonsMultipartFile image); // return 'SqlLobValue' to insert into database
}
