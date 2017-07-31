package rs.levi9.socbook2.web.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.config.BookmarkUserService;
import rs.levi9.socbook2.domain.Bookmark;
import rs.levi9.socbook2.domain.BookmarkUser;
import rs.levi9.socbook2.domain.Tag;
import rs.levi9.socbook2.exception.UsernameTakenException;
import rs.levi9.socbook2.service.BookmarkService;
import rs.levi9.socbook2.service.UserService;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

	private BookmarkService bookmarkService;
	private BookmarkUserService bookmarkUserService;
	private UserService userService;
	
	
	@Autowired
	public BookmarkController(BookmarkService bookmarkService, BookmarkUserService bookmarkUserService,
			UserService userService) {
		this.bookmarkService = bookmarkService;
		this.bookmarkUserService = bookmarkUserService;
		this.userService = userService;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(method = RequestMethod.GET)
	public List<Bookmark> findAll(){
		return bookmarkService.findAll();
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	public Bookmark findOne(@PathVariable("id") Long id){
		return bookmarkService.findOne(id);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(method = RequestMethod.POST)
	public Bookmark save(@RequestBody Bookmark bookmark){
		return bookmarkService.save(bookmark);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(method = RequestMethod.PUT)
	public Bookmark update(@RequestBody Bookmark bookmark){
		return bookmarkService.save(bookmark);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path="{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id){
		bookmarkService.delete(id);
	}	
	/*
	 * Find all visible bookmarks of certain category without logged user bookmarks
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path="search/category/{category}", method = RequestMethod.GET)
	public List<Bookmark> getPublicBookmarkByCategory(@PathVariable("category")String categoryName){
		return bookmarkService.getPublicBookmarkByCategory(bookmarkUserService.getCurrentllyLoggedUser().getUsername(), categoryName);
	}
	/*
	 * Find all visible bookmarks of certain tag without logged user bookmarks
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path="search/tag/{tag}", method = RequestMethod.GET)
	public List<Bookmark> getPublicBookmarkByTag(@PathVariable("tag")String tagName){
		return bookmarkService.getPublicBookmarkByTag(bookmarkUserService.getCurrentllyLoggedUser().getUsername(), tagName);
	}
	/*
	 * Find all visible bookmarks of certain username without logged user bookmarks	
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path="search/user/{searchedUsername}", method = RequestMethod.GET)
	public List<Bookmark> getPublicBookmarkByUsername(@PathVariable("searchedUsername")String searchedUsername){
		return bookmarkService.getPublicBookmarkByUsername(bookmarkUserService.getCurrentllyLoggedUser().getUsername(), searchedUsername);
	}
	/*
	 * Find all visible bookmarks searching description without logged user bookmarks	
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path="search/desc/{desc}", method = RequestMethod.GET)
	public List<Bookmark> getPublicBookmarkByDescription(@PathVariable("desc")String desc){
		return bookmarkService.getPublicBookmarkByDesc(bookmarkUserService.getCurrentllyLoggedUser().getUsername(), desc);
	}
	/*
	 * Find all visible bookmarks without logged user bookmarks	
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path="search/public/not-current-user", method = RequestMethod.GET)
	public List<Bookmark> findPublicBookmarksNotByUser(String currentUser) {
		return bookmarkService.findPublicBookmarksNotByUser(bookmarkUserService.getCurrentllyLoggedUser().getUsername());
	}	
	
	/*
	 * Find all visible bookmarks	
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path = "public", method = RequestMethod.GET)
	public List<Bookmark> findByVisibleTrue(){
		return bookmarkService.findByVisibleTrue();
	}
	/*
	 * Find all bookmarks of logged user	
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path="search/current-user/{username}", method = RequestMethod.GET)
	public List<Bookmark> findByBookmarkUserUsername(@PathVariable("username") String currentUser) {
		return bookmarkService.findByBookmarkUserUsername(currentUser);
	}
	
	@RequestMapping(path = "/import/bookmark/{bookmarkId}/username/{usernameId}", method = RequestMethod.POST)
	public Bookmark importBookmarkFromUser(@Valid @PathVariable("bookmarkId") Long bookmarkId,
			@PathVariable("usernameId") Long usernameId) {
		Bookmark sourceBookmark = bookmarkService.findOne(bookmarkId);
		Bookmark newBookmark = new Bookmark();
		BookmarkUser newAuthor = userService.findOne(usernameId);
		
		Set<Tag> newTags = new HashSet<>();
		newTags.addAll(sourceBookmark.getTag());

		newBookmark.setTag(newTags);
		newBookmark.setCategory(sourceBookmark.getCategory());
		newBookmark.setBookmarkUser(newAuthor);
		newBookmark.setUrl(sourceBookmark.getUrl());
		newBookmark.setTitle(sourceBookmark.getTitle());
		newBookmark.setCreatedDate(sourceBookmark.getCreatedDate());
		newBookmark.setVisible(sourceBookmark.isVisible());
		newBookmark.setDescription(sourceBookmark.getDescription());
		
		return bookmarkService.save(newBookmark);	
	}
	
	public List<Bookmark> findByTitle(String title){
		return bookmarkService.findByTitle(title);
	}
}