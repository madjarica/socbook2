package rs.levi9.socbook2.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.domain.Category;
import rs.levi9.socbook2.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {
	
private CategoryService categoryService;
	
	@Autowired
	public CategoryController(CategoryService categoryService){
		this.categoryService = categoryService;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Category> findAll(){
		return categoryService.findAll();
	}
	
	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	public Category findOne(@PathVariable("id") Long id){
		return categoryService.findOne(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public Category save(@RequestBody Category category){
		return categoryService.save(category);
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public Category update(@RequestBody Category category){
		return categoryService.save(category);
	}
	
	@RequestMapping(path="{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id){
		categoryService.delete(id);
	}
	
}
