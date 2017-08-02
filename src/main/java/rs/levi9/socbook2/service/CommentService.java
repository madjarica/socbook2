package rs.levi9.socbook2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.levi9.socbook2.domain.Comment;
import rs.levi9.socbook2.repository.CommentRepository;

@Service
public class CommentService {

private CommentRepository commentRepository;
	
	@Autowired
	public CommentService(CommentRepository commentRepository){
		this.commentRepository = commentRepository;
	}
	
	public Comment findOne(Long id){
		return commentRepository.findOne(id);
	}
	
	public List<Comment> findAll(){
		return commentRepository.findAll();
	}
	
	public void delete(Long id){
		commentRepository.delete(id);
	}
	
	public Comment save(Comment comment){
		return commentRepository.save(comment);
	}
	
	public List<Comment> findByBookmarkUserUsername(String username) {
		return commentRepository.findByBookmarkUserUsername(username);
	};
}