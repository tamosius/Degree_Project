package com.tomas.controller;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.tomas.model.Member;
import com.tomas.service.MemberService;

@RestController // This annotation eliminates the need of annotating each method with @ResponseBody, and can be considered as combination of @Controller and @ResponseBody.
@RequestMapping(value="/contr")
public class MemberController {
	
	// wired to 'MemberDaoImplementation' class
	@Autowired
	MemberService memberService;		
	
/*------------- GET TOTAL NUMBER OF MEMBERS IN THE DATABASE ------------------------------------------------*/
	@RequestMapping(value="/getTotalMembers", method=RequestMethod.GET)
	public int getTotalMembers(){
		
		return memberService.getTotalMembers();
	}

/*--------------- ADD A NEW MEMBER TO THE DATABASE ---------------------------------------------------------*/
	@RequestMapping(value="/addMember", method=RequestMethod.POST, headers="Accept=application/json")
	public Member addMember(@RequestBody Member member) {
		
		return memberService.addMember(member);
	}
	
	@SuppressWarnings("deprecation")
	@RequestMapping(value="/addMemberi", method=RequestMethod.POST)
	public void addMemberi(HttpServletRequest request, @RequestParam("file") CommonsMultipartFile file, @RequestParam("name") String name) throws Exception {
		
		
		String saveDirectory = request.getServletContext().getRealPath("/resources/images/profileImages/");
		
		System.out.println("classPath: " + request.getServletContext().getRealPath("/"));
		
		System.out.println("system: " + System.getProperty("catalina.home"));
		
		System.out.println("saving path: " + request.getRealPath("/profileImages"));
		
		if(file != null){
			
			BufferedImage image = ImageIO.read(file.getInputStream());
			
				image = createResizedCopy(image, 500, 700, true);
				
				System.out.println("saving file: " + file.getOriginalFilename());
				
				ImageIO.write(image, "jpg", new File("/home/tomas/fi.jpg"));
				
				//file.transferTo(new File(saveDirectory + file.getOriginalFilename()));
			
		}
	}

	BufferedImage createResizedCopy(Image originalImage, int scaledWidth, int scaledHeight, boolean preserveAlpha) {
		
		System.out.println("resizing...");
		
		int imageType = preserveAlpha ? BufferedImage.TYPE_INT_RGB : BufferedImage.TYPE_INT_ARGB;
		
		BufferedImage scaledBI = new BufferedImage(scaledWidth, scaledHeight, imageType);
		
		Graphics2D g = scaledBI.createGraphics();
		
		if (preserveAlpha) {
			g.setComposite(AlphaComposite.Src);
		}
		
		g.drawImage(originalImage, 0, 0, scaledWidth, scaledHeight, null);
		
		g.dispose();
		
		return scaledBI;
	}
	
/*--------------- INSERT RECENTLY VISITED MEMBER -----------------------------------------------------------*/
	@RequestMapping(value="/insertRecentlyVisited", method=RequestMethod.POST, headers="Accept=application/json")
	public int insertRecentlyVisited(@RequestParam("memberId") String id){
		
		return memberService.insertRecentlyVisited(id);
	}

/*--------------- RETRIEVE ALL MEMBERS ---------------------------------------------------------------------*/
	@RequestMapping(value="/getAllMembers", method=RequestMethod.GET, headers="Accept=application/json")
	public List<Member> getMembersList() {
		
		return memberService.getMembersList();  // return all members list from the database
	}

/*-------------- RETRIEVE A MEMBER BY ID -------------------------------------------------------------------*/
	@RequestMapping(value="/memberProfile", method=RequestMethod.POST, headers="Accept=application/json")
	public Member getMemberProfile(@RequestParam("id") int id) {
		
		return memberService.getMemberProfile(id);
	}
	
/*-------------- RETRIEVE A MEMBER(S) BY NAME -----------------------------------------------------------------*/
	@RequestMapping(value="/searchMember", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> searchMember(@RequestBody String name){
		
		return memberService.searchMember(name);
	}

/*-------------- UPDATE A MEMBER ---------------------------------------------------------------------------*/
	@RequestMapping(value="/updateMember", method=RequestMethod.POST, headers="Accept=application/json")
	public Member updateMember(@RequestBody Member member) {
		
		return memberService.updateMember(member);
	}

/*-------------- DELETE A MEMBER ---------------------------------------------------------------------------*/
	@RequestMapping(value="/deleteMember", method=RequestMethod.POST, headers="Accept=application/json")
	public List<Member> deleteMember(@RequestParam String id) {
		
		return memberService.deleteMember(id);
	}
	
/*-------------- RETRIEVE LAST ATTENDED MEMBER TO THE GYM --------------------------------------------------*/
	@RequestMapping(value="/lastAttendedMember", method=RequestMethod.GET, headers="Accept=application/json")
	public Member getLastAttendedMember(){
		
		return memberService.getLastAttendedMember();
	}
	
/*-------------- RETRIEVE RECENTLY BOOKED MEMBERSHIP -------------------------------------------------------*/
	@RequestMapping(value="/recentlyBookedMembership", method=RequestMethod.GET, headers="Accept=application/json")
	public Member getRecentlyBookedMembership(){
		
		return memberService.getRecentlyBookedMembership();
	}
	
/*-------------- RETRIEVE RECENTLY JOINED MEMBER -----------------------------------------------------------*/
	@RequestMapping(value="/recentlyJoined", method=RequestMethod.GET, headers="Accept=application/json")
	public Member getRecentlyJoined(){
		
		return memberService.getRecentlyJoined();
	}
}
