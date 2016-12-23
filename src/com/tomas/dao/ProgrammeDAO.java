package com.tomas.dao;

import java.util.List;

import com.tomas.model.Programme;

public interface ProgrammeDAO {

	public List<Programme> getProgrammesDetails();   // get programmes current details (prices, discounts, etc.)
}
