package com.tomas.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.dao.BottomPanelReportsDAO;
import com.tomas.dao.MemberDAO;
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
	public Member addMember(HttpServletRequest request, CommonsMultipartFile image) {
		
        Member member = new Member();
        
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        
		//member.setInsertImage(insertBlobService.insertBlob(image)); // call 'insertBlob' service, get ready for insert into database
		member.setFirstName(firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase());
		member.setLastName(lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase());
		member.setAddress(request.getParameter("address").equals("") ? "N / A" : request.getParameter("address"));
		member.setPhNumber(request.getParameter("phNumber").equals("") ? "N / A" : request.getParameter("phNumber"));
		member.setDateOfBirth(request.getParameter("dateOfBirth").equals("") ? "N / A" : request.getParameter("dateOfBirth"));
		member.setPassword(passwordService.getInitialPassword());  // get initial password when sign in for the first time
		member.setEmail(request.getParameter("email"));
		member.setMembershipFrom(request.getParameter("membershipFrom").equals("") ? "'Pay as You Go'" : request.getParameter("membershipFrom"));
		member.setMembershipTo(request.getParameter("membershipTo").equals("") ? "'Pay as You Go'" : request.getParameter("membershipTo"));
		member.setProgramme(request.getParameter("programme").equals("") ? "'Pay as You Go'" : request.getParameter("programme"));
		member.setPaid(Float.parseFloat(request.getParameter("paid").equals("") ? "0" : request.getParameter("paid")));
		member.setProgrammeState(request.getParameter("programmeState"));
		member.setUpdateDescription(request.getParameter("updateDescription"));
		member.setProgrammeBooked(Integer.parseInt(request.getParameter("programmeBooked")));
		
		member = memberDAO.addMember(member);
		
		// send composed welcome email message
		emailService.sendWelcomeEmail(member.getFirstName(), member.getEmail(), member.getPassword());
		
		// determine if there is an upload picture
		String imageName = image.getOriginalFilename();
		if(!imageName.equals("")){
			
			// save path for image
			memberDAO.insertImagePath(member.getId(), member.getId() + ".jpg");
			// save picture
			saveImageService.saveImage(image, member.getId(), "members");
			
		}else{
			
			memberDAO.insertImagePath(member.getId(), "no_photo.jpg");
		}
		
		
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
	
/*-------------- SEARCH MEMBER BY NAME OR ID --------------------------------------------------------------*/
	@Override
	public List<Member> searchByNameOrId(String nameOrId){
		
		return memberDAO.searchByNameOrId(nameOrId);
	}

/*------------ DELETE A MEMBER ----------------------------------------------------------------------------*/
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
