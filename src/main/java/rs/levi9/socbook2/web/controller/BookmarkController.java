package rs.levi9.socbook2.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.domain.Bookmark;
import rs.levi9.socbook2.service.BookmarkService;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

	private BookmarkService bookmarkService;
	
	@Autowired
	public BookmarkController(BookmarkService bookmarkService){
		this.bookmarkService = bookmarkService;
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
	
	@RequestMapping(path="searchCategory/{username}+{category}", method = RequestMethod.GET)
	public List<Bookmark> findByBookmarkUserUsernameNotAndCategoryNameLikeAndVisibleTrue(@PathVariable("username")String currentUser, @PathVariable("category")String categoryName){
		return bookmarkService.findByBookmarkUserUsernameNotAndCategoryNameLikeAndVisibleTrue(currentUser, categoryName);
	}
	
	@RequestMapping(path="searchTag/{username}+{tag}", method = RequestMethod.GET)
	public List<Bookmark> findByBookmarkUserUsernameNotAndTagNameLikeAndVisibleTrue(@PathVariable("username")String currentUser, @PathVariable("tag")String tagName){
		return bookmarkService.findByBookmarkUserUsernameNotAndTagNameLikeAndVisibleTrue(currentUser, tagName);
	}
	
	@RequestMapping(path="searchUser/{username}+{searchedUsername}", method = RequestMethod.GET)
	public List<Bookmark> findByBookmarkUserUsernameNotAndBookmarkUserUsernameLikeAndVisibleTrue(@PathVariable("username")String currentUser, @PathVariable("searchedUsername")String searchedUsername){
		return bookmarkService.findByBookmarkUserUsernameNotAndBookmarkUserUsernameLikeAndVisibleTrue(currentUser, searchedUsername);
	}
	
	@RequestMapping(path = "visible/", method = RequestMethod.GET)
	public List<Bookmark> findByVisibleTrue(){
		return bookmarkService.findByVisibleTrue();
	}
	
}
