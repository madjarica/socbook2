package rs.levi9.socbook2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.levi9.socbook2.domain.BookmarkUser;
import rs.levi9.socbook2.repository.UserRepository;

@Service
public class UserService {
	
	private UserRepository userRepository;
	
	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public BookmarkUser findOne(Long id) {
		return userRepository.findOne(id);
	}
	
	public List<BookmarkUser> findAll() {
		return userRepository.findAll();
	}
	
	public void delete(Long id) {
		userRepository.delete(id);
	}
	
	public BookmarkUser save(BookmarkUser bookmarkUser) {
		return userRepository.save(bookmarkUser);
	}
	
	public BookmarkUser findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	public BookmarkUser findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public BookmarkUser findByActivationCode(String code) {
		return userRepository.findByActivationCode(code);
	}
	
}