package rs.levi9.socbook2.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.domain.BookmarkUser;
import rs.levi9.socbook2.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	private UserService userService;
	
	@Autowired
	public UserController(UserService userService){
		this.userService = userService;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<BookmarkUser> findAll(){
		return userService.findAll();
	}
	
	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	public BookmarkUser findOne(@PathVariable("id") Long id){
		return userService.findOne(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public BookmarkUser save(@RequestBody BookmarkUser bookmarkUser){
		return userService.save(bookmarkUser);
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public BookmarkUser update(@RequestBody BookmarkUser bookmarkUser){
		return userService.save(bookmarkUser);
	}
	
	@RequestMapping(path="{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id){
		userService.delete(id);
	}
	
	@RequestMapping(path="{username}", method = RequestMethod.GET)
	public BookmarkUser findByBookmarkUserUsername(@PathVariable("username") String username){
		return findByBookmarkUserUsername(username);
	}
	
	@RequestMapping(path="{email}", method = RequestMethod.GET)
	public BookmarkUser findByBookmarkUserEmail(@PathVariable("email") String email){
		return findByBookmarkUserUsername(email);
	}
}
