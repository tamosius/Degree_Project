package com.tomas.service;

import java.util.List;

import com.tomas.model.Programme;

public interface ProgrammeService {

	public List<Programme> getProgrammesDetails();   // get programmes current details (prices, discounts, etc.)
}
