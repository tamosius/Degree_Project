package com.tomas.model;

public class MemberAttendance {

	private String visitedTimestamp;
	private String weekDay;
	private int countVisits;
	
	
	public String getVisitedTimestamp() {
		return visitedTimestamp;
	}
	public void setVisitedTimestamp(String visitedTimestamp) {
		this.visitedTimestamp = visitedTimestamp;
	}
	public String getWeekDay() {
		return weekDay;
	}
	public void setWeekDay(String weekDay) {
		this.weekDay = weekDay;
	}
	public int getCountVisits() {
		return countVisits;
	}
	public void setCountVisits(int countVisits) {
		this.countVisits = countVisits;
	}
	
	
}
