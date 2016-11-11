package com.tomas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.dao.BottomPanelReportsDAO;
import com.tomas.dao.MemberDAO;
import com.tomas.model.Email;
import com.tomas.model.Member;

public class MemberServiceImplementation implements MemberService{
	
	@Autowired
	MemberDAO memberDAO;
	
	@Autowired
	BottomPanelReportsDAO bottomPanelReportsDAO;
	
	@Autowired
	InsertBlobService insertBlobService;
	
	@Autowired
	SaveImageService saveImageService;
	
	@Autowired
	ResizePictureService resizePictureService;
	
	@Autowired
	PasswordService passwordService;
	
	@Autowired
	EmailService emailService;

	/*------------- GET TOTAL NUMBER OF MEMBERS IN THE DATABASE ------------------------------------------------------------------*/
	@Override
	public int getTotalMembers(){
		
		return memberDAO.getTotalMembers();
	}
	
/*------------- ADD A NEW MEMBER TO THE DATABASE (IMAGE IN BLOB)-----------------------------------------------------------------------------*/
	@Override
	public Member addMember(String imageFor, CommonsMultipartFile image, String firstName, String lastName, String address, String phNumber,
			String dateOfBirth, String email, String membershipFrom, String membershipTo, String programme, String paid,
			String programmeState, String updateDescription, String programmeBooked) {
		
        Member member = new Member();
        
		//member.setInsertImage(insertBlobService.insertBlob(image)); // call 'insertBlob' service, get ready for insert into database
		member.setFirstName(firstName);
		member.setLastName(lastName);
		member.setAddress(address);
		member.setPhNumber(phNumber);
		member.setDateOfBirth(dateOfBirth);
		member.setPassword(passwordService.getInitialPassword());  // get initial password when sign in for the first time
		member.setEmail(email);
		member.setMembershipFrom(membershipFrom);
		member.setMembershipTo(membershipTo);
		member.setProgramme(programme);
		member.setPaid(Float.parseFloat(paid));
		member.setProgrammeState(programmeState);
		member.setUpdateDescription(updateDescription);
		member.setProgrammeBooked(Integer.parseInt(programmeBooked));
		
		member = memberDAO.addMember(member);
		
		// compose initial Email
		Email initialEmail = new Email();
		initialEmail.setRecipient(member.getEmail());
		initialEmail.setSubject("Welcome to the 'TM' gym!");
		initialEmail.setInitialMessage(member.getFirstName(), member.getEmail(), member.getPassword());
		initialEmail.setEmailMessage(initialEmail.getInitialMessage());
		
		// send composed initial email message
		//emailService.sendEmail(initialEmail);
		
		// save picture
		//saveImageService.saveImage(image, member.getId(), imageFor);
		
		return member;
	}
	
/*-------------- UPDATE A MEMBER --------------------------------------------------------------------------*/
	@Override
	public Member updateMember(String imageFor, CommonsMultipartFile image, int id, String firstName, String lastName, String address, String phNumber,
			String dateOfBirth, String email, String membershipFrom, String membershipTo, String programme, String paid,
			String programmeState, String updateDescription, String programmeBooked) {
		
        Member member = new Member();
        
		//member.setInsertImage(insertBlobService.insertBlob(image)); // call 'insertBlob' service, get ready for insert into database
        member.setId(id);
		member.setFirstName(firstName);
		member.setLastName(lastName);
		member.setAddress(address);
		member.setPhNumber(phNumber);
		member.setDateOfBirth(dateOfBirth);
		member.setEmail(email);
		member.setMembershipFrom(membershipFrom);
		member.setMembershipTo(membershipTo);
		member.setProgramme(programme);
		member.setPaid(Float.parseFloat(paid));
		member.setProgrammeState(programmeState);
		member.setUpdateDescription(updateDescription);
		member.setProgrammeBooked(Integer.parseInt(programmeBooked));
		
		// update member profile
		memberDAO.updateMember(member);
		
		// if successful, save image
		saveImageService.saveImage(image, member.getId(), imageFor);
		
		// get updated member profile
		return member;
	}
	
/*------------ INSERT RECENTLY VISITED MEMBER ------------------------------------------------------------*/
	@Override
	public int insertRecentlyVisited(String id){
		
		// insert visited member into the database
		memberDAO.insertRecentlyVisited(id);
		
		// get updated number of the visits count in the gym
		return bottomPanelReportsDAO.getVisitsCount();
	}
	
/*------------ RETRIEVE ALL MEMBERS ----------------------------------------------------------------------*/
	@Override
	public List<Member> getMembersList() {
		
		return memberDAO.getMembersList();
	}
	
/*----------- RETRIEVE A MEMBER BY ID ---------------------------------------------------------------------*/
	@Override
	public Member getMemberProfile(int id) {
		
		return memberDAO.getMemberProfile(id);
	}
	
/*-------------- RETRIEVE A MEMBER BY NAME -----------------------------------------------------------------*/
	@Override
	public List<Member> searchMember(String name){
		
		return memberDAO.searchMember(name);
	}

/*------------ DELETE A MEMBER ---------------------------------------------------------------------------*/
	@Override
	public List<Member> deleteMember(String id) {
		
		return memberDAO.deleteMember(id);
		
		//return getMembersList();
	}
	
/*------------ RETRIEVE LAST ATTENDED MEMBER TO THE GYM --------------------------------------------------*/
	@Override
	public Member getLastAttendedMember(){
		
		return memberDAO.getLastAttendedMember();
	}
	
/*------------ RETRIEVE RECENTLY BOOKED MEMBERSHIP MEMBER ------------------------------------------------*/
	@Override
	public Member getRecentlyBookedMembership(){
		
		return memberDAO.getRecentlyBookedMembership();
	}
/*------------ RETRIEVE RECENTLY JOINED MEMBER -----------------------------------------------------------*/
	@Override
	public Member getRecentlyJoined(){
		
		return memberDAO.getRecentlyJoined();
	}
}
