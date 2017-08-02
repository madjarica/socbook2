package rs.levi9.socbook2.web.controller;

import java.util.List;
import java.util.ListIterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.domain.Bookmark;
import rs.levi9.socbook2.domain.Category;
import rs.levi9.socbook2.service.BookmarkService;
import rs.levi9.socbook2.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {
	
	private BookmarkService bookmarkService;
	private BookmarkController bookmarkController;	
	private CategoryService categoryService;
	

	@Autowired
	public CategoryController(CategoryService categoryService, BookmarkController bookmarkController, BookmarkService bookmarkService){
		this.categoryService = categoryService;
		this.bookmarkController = bookmarkController;
		this.bookmarkService = bookmarkService;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(method = RequestMethod.GET)
	public List<Category> findAll(){
		return categoryService.findAll();
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	public Category findOne(@PathVariable("id") Long id){
		return categoryService.findOne(id);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@RequestMapping(method = RequestMethod.POST)
	public Category save(@RequestBody Category category){
		return categoryService.save(category);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@RequestMapping(method = RequestMethod.PUT)
	public Category update(@RequestBody Category category){
		return categoryService.save(category);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@RequestMapping(path="{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id){
		
				
		Category category =  categoryService.findOne(id);
		Category uncategorizedCategory = categoryService.findOne((long)1);
		
		if (category.isAllowedToDelete() == true)
			
		if(category != null){
			List<Bookmark> bookmark = bookmarkService.findByCategoryName(category.getName());
		
			if(!bookmark.isEmpty()) {
				for (ListIterator<Bookmark> iter = bookmark.listIterator(); iter.hasNext(); ) {
					Bookmark element = iter.next();
					element.setCategory(uncategorizedCategory);
					bookmarkService.save(element);
				}
			}
			
		}			
		
		
		if (category.isAllowedToDelete() == true)
		categoryService.delete(id);
	}
	
}