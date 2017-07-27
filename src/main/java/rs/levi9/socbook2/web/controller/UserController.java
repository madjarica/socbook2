package rs.levi9.socbook2.web.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.domain.BookmarkUser;
import rs.levi9.socbook2.exception.BadCredentialsException;
import rs.levi9.socbook2.exception.EmailTakenException;
import rs.levi9.socbook2.exception.TakenException;
import rs.levi9.socbook2.exception.UsernameTakenException;
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
	public BookmarkUser save(@RequestBody BookmarkUser bookmarkUser) throws EmailTakenException, UsernameTakenException, BadCredentialsException, TakenException {
		BookmarkUser email = findByEmail(bookmarkUser.getEmail());
		BookmarkUser username = findByUsername(bookmarkUser.getUsername());
		if(email != null && username != null) throw new TakenException("Email and username are already taken");
		else if(email != null) throw new EmailTakenException("Email is already taken");
		else if(username != null) throw new UsernameTakenException("Username is already taken");
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
	
	@RequestMapping(path="username/{username}", method = RequestMethod.GET)
	public BookmarkUser findByUsername(@PathVariable("username") String username) {
		return userService.findByUsername(username);
	}
	
	@RequestMapping(path="email/{email}/", method = RequestMethod.GET)
	public BookmarkUser findByEmail(@PathVariable("email") String email){
		return userService.findByEmail(email);
	}	

	@RestController
	public class AdminApplication {

	  @RequestMapping("/user")
	  public Map<String, Object> getUser(Authentication autentication) {
	    Map<String, Object> map = new LinkedHashMap<String, Object>();
	    map.put("username", autentication.getName());
	    map.put("roles", AuthorityUtils.authorityListToSet(((Authentication) autentication)
	        .getAuthorities()));
	    return map;
	  }


	}
}
