package rs.levi9.socbook2.web.controller;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.domain.Bookmark;
import rs.levi9.socbook2.domain.BookmarkUser;
import rs.levi9.socbook2.domain.Role;
import rs.levi9.socbook2.domain.Role.RoleType;
import rs.levi9.socbook2.exception.BadCredentialsException;
import rs.levi9.socbook2.exception.EmailTakenException;
import rs.levi9.socbook2.exception.TakenException;
import rs.levi9.socbook2.exception.UsernameTakenException;
import rs.levi9.socbook2.repository.BookmarkRepository;
import rs.levi9.socbook2.service.BookmarkService;
import rs.levi9.socbook2.service.NotificationService;
import rs.levi9.socbook2.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	
	private Logger logger = LoggerFactory.getLogger(UserController.class);

	private UserService userService;
	private NotificationService notificationService;
	private BookmarkService bookmarkService;

	@Autowired
	public UserController(UserService userService, NotificationService notificationService, BookmarkService bookmarkService) {
		this.userService = userService;
		this.notificationService = notificationService;
		this.bookmarkService = bookmarkService;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@RequestMapping(method = RequestMethod.GET)
	public List<BookmarkUser> findAll() {
		return userService.findAll();
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	public BookmarkUser findOne(@PathVariable("id") Long id) {
		return userService.findOne(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public BookmarkUser save(@RequestBody BookmarkUser bookmarkUser) throws EmailTakenException, UsernameTakenException, BadCredentialsException, TakenException {
		BookmarkUser email = findByEmail(bookmarkUser.getEmail());
		BookmarkUser username = findByUsername(bookmarkUser.getUsername());
		
			if (email != null && username != null) {
				throw new TakenException("Email and username are already taken");
			} else if (email != null) {
				throw new EmailTakenException("Email is already taken");
			} else if (username != null) {
				throw new UsernameTakenException("Username is already taken");
			}
		
		char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();
		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		for (int i = 0; i < 60; i++) {
		    char c = chars[random.nextInt(chars.length)];
		    sb.append(c);
		}
		
		String token = sb.toString();	
		
		bookmarkUser.setActivationCode(token);
		bookmarkUser.setActive(false);
		BookmarkUser newBookmarkUser = userService.save(bookmarkUser);
		
		try {
			notificationService.sendNotification(newBookmarkUser);
		} catch (MailException e) {
			logger.info(e.getMessage());
		}
			
		return newBookmarkUser;
	}
	
	@RequestMapping(path = "activate/{activation-code}", method = RequestMethod.GET)
	public String activateUser(@PathVariable("activation-code") String code) {
		BookmarkUser bookmarkUser = findByActivationCode(code);
		if(bookmarkUser != null) {
			bookmarkUser.setActive(true);
			bookmarkUser.setActivationCode(null);
			userService.save(bookmarkUser);
			
//			return "redirect:" + "http://localhost:8080/";
		}
		return "<script>window.location = 'http://localhost:8080/?success=true';</script>";
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@RequestMapping(method = RequestMethod.PUT)
	public BookmarkUser update(@RequestBody BookmarkUser bookmarkUser) {
		return userService.save(bookmarkUser);
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path = "{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id) {		
		BookmarkUser bookmarkUser = findOne(id);
		if(bookmarkUser != null) {					
			Set<Role> setOfUserRoles = bookmarkUser.getRoles();			
			Role role = new Role();
			role.setType(RoleType.ROLE_ADMIN);
			role.setId((long) 1);
			
			boolean hasRoleAdmin = false;
			for(Role roles: setOfUserRoles){
				if(roles.getType() == role.getType()) {				
					hasRoleAdmin = true;				
				} 
			}
			
			if(!hasRoleAdmin){
				String userEmail = bookmarkUser.getUsername();
				List<Bookmark> listOfUserBookmarks = bookmarkService.findByBookmarkUserUsername(userEmail);
			
				if(!listOfUserBookmarks.isEmpty()) {
					for (ListIterator<Bookmark> iter = listOfUserBookmarks.listIterator(); iter.hasNext(); ) {
						Bookmark element = iter.next();
						bookmarkService.delete(element.getId());
					}
				}
				bookmarkUser.setRoles(null);				
				userService.delete(id);
			}			
		}		
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path = "username/{username}", method = RequestMethod.GET)
	public BookmarkUser findByUsername(@PathVariable("username") String username) {
		return userService.findByUsername(username);
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path = "email/{email}/", method = RequestMethod.GET)
	public BookmarkUser findByEmail(@PathVariable("email") String email) {
		return userService.findByEmail(email);
	}	
	
	@RequestMapping(path = "code/{code}", method = RequestMethod.GET)
	public BookmarkUser findByActivationCode(@PathVariable("code") String code) {
		return userService.findByActivationCode(code);
	}

	@RestController
	public class AdminApplication {

		@RequestMapping("/user")
		public Map<String, Object> getUser(Authentication autentication) {
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			map.put("username", autentication.getName());
			map.put("roles", AuthorityUtils.authorityListToSet(((Authentication) autentication).getAuthorities()));
			return map;
		}
	}
}