package rs.levi9.socbook2.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.config.BookmarkUserService;
import rs.levi9.socbook2.domain.Bookmark;
import rs.levi9.socbook2.service.BookmarkService;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

	private BookmarkService bookmarkService;
	private BookmarkUserService bookmarkUserService;
	
	@Autowired
	public BookmarkController(BookmarkService bookmarkService, BookmarkUserService bookmarkUserService){
		this.bookmarkService = bookmarkService;
		this.bookmarkUserService = bookmarkUserService;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Bookmark> findAll(){
		return bookmarkService.findAll();
	}
	
	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	public Bookmark findOne(@PathVariable("id") Long id){
		return bookmarkService.findOne(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public Bookmark save(@RequestBody Bookmark bookmark){
		return bookmarkService.save(bookmark);
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public Bookmark update(@RequestBody Bookmark bookmark){
		return bookmarkService.save(bookmark);
	}
	
	@RequestMapping(path="{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id){
		bookmarkService.delete(id);
	}	
	/*
	 * Find all visible bookmarks of certain category without logged user bookmarks
	 */
	@RequestMapping(path="search/category/{category}", method = RequestMethod.GET)
	public List<Bookmark> findByBookmarkUserUsernameNotAndCategoryNameContainingAndVisibleTrue(@PathVariable("category")String categoryName){
		return bookmarkService.findByBookmarkUserUsernameNotAndCategoryNameContainingAndVisibleTrue(bookmarkUserService.getCurrentllyLoggedUser().getUsername(), categoryName);
	}
	/*
	 * Find all visible bookmarks of certain tag without logged user bookmarks
	 */
	@RequestMapping(path="search/tag/{tag}", method = RequestMethod.GET)
	public List<Bookmark> findByBookmarkUserUsernameNotAndTagNameContainingAndVisibleTrue(@PathVariable("tag")String tagName){
		return bookmarkService.findByBookmarkUserUsernameNotAndTagNameContainingAndVisibleTrue(bookmarkUserService.getCurrentllyLoggedUser().getUsername(), tagName);
	}
	/*
	 * Find all visible bookmarks of certain username without logged user bookmarks	
	 */
	@RequestMapping(path="search/user/{searchedUsername}", method = RequestMethod.GET)
	public List<Bookmark> findByBookmarkUserUsernameNotAndBookmarkUserUsernameLikeAndVisibleTrue(@PathVariable("searchedUsername")String searchedUsername){
		return bookmarkService.findByBookmarkUserUsernameNotAndBookmarkUserUsernameLikeAndVisibleTrue(bookmarkUserService.getCurrentllyLoggedUser().getUsername(), searchedUsername);
	}
	/*
	 * Find all visible bookmarks searching description without logged user bookmarks	
	 */
	@RequestMapping(path="search/desc/{desc}", method = RequestMethod.GET)
	public List<Bookmark> findByBookmarkUserUsernameNotAndDescriptionContainingAndVisibleTrue(@PathVariable("desc")String desc){
		return bookmarkService.findByBookmarkUserUsernameNotAndDescriptionContainingAndVisibleTrue(bookmarkUserService.getCurrentllyLoggedUser().getUsername(), desc);
	}
	/*
	 * Find all visible bookmarks	
	 */
	@RequestMapping(path = "public", method = RequestMethod.GET)
	public List<Bookmark> findByVisibleTrue(){
		return bookmarkService.findByVisibleTrue();
	}
	/*
	 * Find all bookmarks of logged user	
	 */
	@RequestMapping(path="search/current-user/{username}", method = RequestMethod.GET)
	public List<Bookmark> findByBookmarkUserUsername(@PathVariable("username") String currentUser) {
		return bookmarkService.findByBookmarkUserUsername(currentUser);
	}	
}