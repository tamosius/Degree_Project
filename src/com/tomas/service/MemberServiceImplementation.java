package com.tomas.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.dao.BottomPanelReportsDAO;
import com.tomas.dao.MemberDAO;
import com.tomas.model.Member;
import com.tomas.service.runnable.TaskClass;

public class MemberServiceImplementation implements MemberService {

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
	public int getTotalMembers() {

		return memberDAO.getTotalMembers();
	}

	/*------------- ADD A NEW MEMBER TO THE DATABASE (IMAGE IN BLOB)-----------------------------------------------------------------------------*/
	@Override
	public Member addMember(HttpServletRequest request, CommonsMultipartFile image) {

		Member member = new Member();

		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		
		// get price what customer had to pay for programme
		// and how much did pay
		float toPay = Float.parseFloat(request.getParameter("toPay"));
		float paid = Float.parseFloat(request.getParameter("paid"));

		member.setFirstName(firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase());
		member.setLastName(lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase());
		member.setAddress(request.getParameter("address").equals("") ? "N / A" : request.getParameter("address"));
		member.setPhNumber(request.getParameter("phNumber").equals("") ? "N / A" : request.getParameter("phNumber"));
		member.setDateOfBirth(
				request.getParameter("dateOfBirth").equals("") ? "N / A" : request.getParameter("dateOfBirth"));
		member.setPassword(passwordService.getInitialPassword()); // get initial
																	// password
																	// when sign
																	// in for
																	// the first
																	// time
		member.setEmail(request.getParameter("email"));
		member.setMembershipFrom(request.getParameter("membershipFrom"));
		member.setMembershipTo(request.getParameter("membershipTo"));
		member.setProgrammeId(Integer.parseInt(request.getParameter("programmeId")));
		member.setProgramme(request.getParameter("programme"));
		member.setPaid(paid);
		member.setDuePayment(toPay - paid);
		member.setProgrammeState(request.getParameter("programmeState"));
		member.setUpdateDescription(request.getParameter("updateDescription"));
		member.setProgrammeBooked(Integer.parseInt(request.getParameter("programmeBooked")));

		member = memberDAO.addMember(member);
		
		//new Thread(new TaskClass(member.getId(), member.getFirstName(), member.getEmail(), member.getPassword(), image, request)).start();

		
		try{
			
			
			// send composed welcome email message
			emailService.sendWelcomeEmail(member.getFirstName(), member.getEmail(), member.getPassword());
			
		}catch(Exception e){
			
			System.out.println("Email has not been sent!");
		}
		
		

		// determine if there is an upload picture
		String imageName = image.getOriginalFilename();
		if (!imageName.equals("")) {

			// save path for image
			memberDAO.insertImagePath(member.getId(), member.getId() + ".jpg");
			// save picture
			saveImageService.saveImage(image, member.getId(), "members", request);

		} else {

			memberDAO.insertImagePath(member.getId(), "no_photo.jpg");
		}

		return member;
	}

	/*-------------- UPDATE A MEMBER --------------------------------------------------------------------------*/
	@Override
	public Member updateMember(HttpServletRequest request, CommonsMultipartFile image) {

		Member member = new Member();

		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		
		// get price what customer had to pay for programme
		// and how much did pay
		float toPay = Float.parseFloat(request.getParameter("toPay"));
		float paid = Float.parseFloat(request.getParameter("paid"));

		// set the values for 'Member' object
		member.setId(Integer.parseInt(request.getParameter("memberId")));
		member.setFirstName(firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase());
		member.setLastName(lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase());
		member.setAddress(request.getParameter("address").equals("") ? "N / A" : request.getParameter("address"));
		member.setPhNumber(request.getParameter("phNumber").equals("") ? "N / A" : request.getParameter("phNumber"));
		member.setDateOfBirth(request.getParameter("dateOfBirth").equals("") ? "N / A" : request.getParameter("dateOfBirth"));
		member.setEmail(request.getParameter("email"));
		member.setMembershipFrom(request.getParameter("membershipFrom"));
		member.setMembershipTo(request.getParameter("membershipTo"));
		member.setProgrammeId(Integer.parseInt(request.getParameter("programmeId")));
		member.setProgramme(request.getParameter("programme"));
		member.setPaid(paid);
		member.setDuePayment(toPay - paid);
		member.setProgrammeState(request.getParameter("programmeState"));
		member.setUpdateDescription(request.getParameter("updateDescription"));
		member.setProgrammeBooked(Integer.parseInt(request.getParameter("programmeBooked")));

		// update member profile
		boolean completed = memberDAO.updateMember(member);
		
		if(completed){
			
			// determine if there is an upload picture
			String imageName = image.getOriginalFilename();
			if (!imageName.equals("")) {

				// save path for image
				memberDAO.insertImagePath(member.getId(), member.getId() + ".jpg");
				// save picture
				saveImageService.saveImage(image, member.getId(), "members", request);

			} else {

				// memberDAO.insertImagePath(member.getId(), "no_photo.jpg");
			}
		}
		
		// get updated member profile
		return memberDAO.getMemberProfile(member.getId());
	}

	/*------------ INSERT RECENTLY VISITED MEMBER ------------------------------------------------------------*/
	@Override
	public int insertRecentlyVisited(String id, float toPay) {

		// insert visited member into the database
		// if inserted, returned value will be > 0
		int todayVisits = memberDAO.insertRecentlyVisited(id);
		
		if(todayVisits > 0){
			
			memberDAO.addToPay(id, toPay);
			
			return todayVisits;
			
		}
		else{  // if not inserted, means the member was already checked-in today
			return 0;
		}
	}

	/*------------ RETRIEVE ALL MEMBERS ----------------------------------------------------------------------*/
	@Override
	public List<Member> getMembersList(String idName) {

		return memberDAO.getMembersList(idName);
	}

	/*----------- RETRIEVE A MEMBER BY ID ---------------------------------------------------------------------*/
	@Override
	public Member getMemberProfile(int id) {

		return memberDAO.getMemberProfile(id);
	}

	/*-------------- RETRIEVE A MEMBER BY NAME -----------------------------------------------------------------*/
	@Override
	public List<Member> searchMember(String name) {

		return memberDAO.searchMember(name);
	}

	/*-------------- SEARCH MEMBER BY NAME OR ID --------------------------------------------------------------*/
	@Override
	public List<Member> searchByNameOrId(String nameOrId) {

		return memberDAO.searchByNameOrId(nameOrId);
	}

	/*------------ DELETE A MEMBER ----------------------------------------------------------------------------*/
	@Override
	public String deleteMember(HttpServletRequest request, int id) {
		
		boolean completed = memberDAO.deleteMember(id);
		
		if(completed){
			
			saveImageService.deleteImage(id, "members", request);
		}

		return "Successfully deleted Member profile!";
	}

	/*------------ RETRIEVE LAST ATTENDED MEMBER TO THE GYM --------------------------------------------------*/
	@Override
	public Member getLastAttendedMember() {

		return memberDAO.getLastAttendedMember();
	}

	/*------------ RETRIEVE RECENTLY BOOKED MEMBERSHIP MEMBER ------------------------------------------------*/
	@Override
	public Member getRecentlyBookedMembership() {

		return memberDAO.getRecentlyBookedMembership();
	}

	/*------------ RETRIEVE RECENTLY JOINED MEMBER -----------------------------------------------------------*/
	@Override
	public Member getRecentlyJoined() {

		return memberDAO.getRecentlyJoined();
	}
}
