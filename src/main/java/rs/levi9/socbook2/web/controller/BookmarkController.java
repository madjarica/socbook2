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
import rs.levi9.socbook2.domain.Category;
import rs.levi9.socbook2.domain.Tag;
import rs.levi9.socbook2.exception.ImportBookmarkException;
import rs.levi9.socbook2.service.BookmarkService;
import rs.levi9.socbook2.service.CategoryService;
import rs.levi9.socbook2.service.UserService;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

	private BookmarkService bookmarkService;
	private BookmarkUserService bookmarkUserService;
	private UserService userService;
	private CategoryService categoryService;
	
	
	@Autowired
	public BookmarkController(BookmarkService bookmarkService, BookmarkUserService bookmarkUserService,
			UserService userService, CategoryService categoryService) {
		this.bookmarkService = bookmarkService;
		this.bookmarkUserService = bookmarkUserService;
		this.userService = userService;
		this.categoryService = categoryService;
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
	
	@RequestMapping(path = "/import/bookmark/{id}", method = RequestMethod.POST)
	public Bookmark importBookmarkFromUser(@Valid @PathVariable("id") Long id) throws ImportBookmarkException{
		
		
		Bookmark bookmark = bookmarkService.findOne(id);
		
		if(bookmark.getBookmarkUser().getUsername() == bookmarkUserService.getCurrentllyLoggedUser().getUsername()) {
			throw new ImportBookmarkException("You can't import your own bookmark");
		}
		else if(!findByBookmarkUserUsernameAndTitle(bookmark.getTitle()).isEmpty()) {
			throw new ImportBookmarkException("You already have this bookmark");
		}
		else {
		
		Bookmark importedBookmark = new Bookmark();
		BookmarkUser currentUser = userService.findByUsername(bookmarkUserService.getCurrentllyLoggedUser().getUsername());
		
		Set<Tag> newTags = new HashSet<>();
		newTags.addAll(bookmark.getTag());

		importedBookmark.setTag(newTags);
		importedBookmark.setCategory(bookmark.getCategory());
		importedBookmark.setBookmarkUser(currentUser);
		importedBookmark.setUrl(bookmark.getUrl());
		importedBookmark.setTitle(bookmark.getTitle());
		importedBookmark.setCreatedDate(bookmark.getCreatedDate());
		importedBookmark.setVisible(bookmark.isVisible());
		importedBookmark.setDescription(bookmark.getDescription());
		
		return bookmarkService.save(importedBookmark);
		}
	}
	
	public List<Bookmark> findByBookmarkUserUsernameAndTitle(String title){
		return bookmarkService.findByBookmarkUserUsernameAndTitle(bookmarkUserService.getCurrentllyLoggedUser().getUsername(), title);
	}
	
	public List<Bookmark> findByCategoryName(String name){
		
		return bookmarkService.findByCategoryName(name);
	}
}