package rs.levi9.socbook2.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook2.domain.Comment;
import rs.levi9.socbook2.service.CommentService;


@RestController
@RequestMapping("/comments")
public class CommentController {

	private CommentService commentService;
	
	@Autowired
	public CommentController(CommentService commentService){
		this.commentService = commentService;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(method = RequestMethod.GET)
	public List<Comment> findAll(){
		return commentService.findAll();
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	public Comment findOne(@PathVariable("id") Long id){
		return commentService.findOne(id);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(method = RequestMethod.POST)
	public Comment save(@RequestBody Comment comment){
		return commentService.save(comment);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(method = RequestMethod.PUT)
	public Comment update(@RequestBody Comment comment){
		return commentService.save(comment);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path="{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id){
		commentService.delete(id);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@RequestMapping(path="/search/{username}", method = RequestMethod.GET)
	public void findByBookmarkUserUsername(@PathVariable("username") String username){
		commentService.findByBookmarkUserUsername(username);
	}
}