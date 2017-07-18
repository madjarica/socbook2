package rs.levi9.socbook2.web.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.domain.BookmarkUser;
import rs.levi9.socbook2.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	UserService userService;
	
	public UserController(UserService userService){
		this.userService = userService;
	}
	@RequestMapping(method = RequestMethod.GET)
	public List<BookmarkUser> findAll(){
		return userService.findAll();
	}
	

	
}
