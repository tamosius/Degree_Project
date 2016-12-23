package com.tomas.model;

public class Statistics {

	private int weekNumber;
	private String weekRangeStart;
	private String weekRangeEnd;
	private int entries;
	private float revenue;
	
	
	public int getWeekNumber() {
		return weekNumber;
	}
	public void setWeekNumber(int weekNumber) {
		this.weekNumber = weekNumber;
	}
	public String getWeekRangeStart() {
		return weekRangeStart;
	}
	public void setWeekRangeStart(String weekRangeStart) {
		this.weekRangeStart = weekRangeStart;
	}
	public String getWeekRangeEnd() {
		return weekRangeEnd;
	}
	public void setWeekRangeEnd(String weekRangeEnd) {
		this.weekRangeEnd = weekRangeEnd;
	}
	public int getEntries() {
		return entries;
	}
	public void setEntries(int entries) {
		this.entries = entries;
	}
	public float getRevenue() {
		return revenue;
	}
	public void setRevenue(float revenue) {
		this.revenue = revenue;
	}
}
