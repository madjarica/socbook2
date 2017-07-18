package rs.levi9.socbook2.service;

import java.util.List;

import org.springframework.stereotype.Service;

import rs.levi9.socbook2.domain.BookmarkUser;
import rs.levi9.socbook2.repository.UserRepository;

@Service
public class UserService {
	UserRepository userRepository;
	public UserService(UserRepository userRepository){
		this.userRepository = userRepository;
	}
	
	public BookmarkUser findOne(Long id){
		return userRepository.findOne(id);
	}
	
	public List<BookmarkUser> findAll(){
		return userRepository.findAll();
	}
	public void delete(Long id){
		userRepository.delete(id);
	}
	public BookmarkUser save(BookmarkUser bookmarkUser){
		return userRepository.save(bookmarkUser);
	}
	public BookmarkUser findByBookmarkUserUsername(String username){
		return userRepository.findByBookmarkUserUsername(username);
	}
	public BookmarkUser findByBookmarkUserEmail(String email){
		return userRepository.findByBookmarkUserUsername(email);
	}
	
}
