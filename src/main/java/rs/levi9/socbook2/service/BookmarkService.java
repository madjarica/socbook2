package rs.levi9.socbook2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.levi9.socbook2.domain.Bookmark;
import rs.levi9.socbook2.repository.BookmarkRepository;

@Service
public class BookmarkService {
	
	private BookmarkRepository bookmarkRepository;
	
	@Autowired
	public BookmarkService(BookmarkRepository bookmarkRepository){
		this.bookmarkRepository = bookmarkRepository;
	}
	
	public Bookmark findOne(Long id){
		return bookmarkRepository.findOne(id);
	}
	
	public List<Bookmark> findAll(){
		return bookmarkRepository.findAll();
	}
	
	public void delete(Long id){
		bookmarkRepository.delete(id);
	}
	
	public Bookmark save(Bookmark bookmark){
		return bookmarkRepository.save(bookmark);
	}
	
	/*
	 * Find all visible bookmarks of certain category without logged user bookmarks
	 */
	public List<Bookmark> getPublicBookmarkByCategory(String currentUser, String categoryName){
		return bookmarkRepository.findByBookmarkUserUsernameNotAndCategoryNameContainingAndVisibleTrue(currentUser, categoryName);
	}
	
	/*
	 * Find all visible bookmarks of certain tag without logged user bookmarks
	 */
	public List<Bookmark> getPublicBookmarkByTag(String currentUser, String searcherdUserame){
		return bookmarkRepository.findByBookmarkUserUsernameNotAndTagNameLikeAndVisibleTrue(currentUser, searcherdUserame);
	}
	/*
	 * Find all visible bookmarks of certain username without logged user bookmarks	
	 */
	public List<Bookmark> getPublicBookmarkByUsername(String currentUser, String searcherdUserame){
		return bookmarkRepository.findByBookmarkUserUsernameNotAndBookmarkUserUsernameLikeAndVisibleTrue(currentUser, searcherdUserame);
	}
	/*
	 * Find all visible bookmarks searching description without logged user bookmarks	
	 */
	public List<Bookmark> getPublicBookmarkByDesc(String currentUser, String desc){
		return bookmarkRepository.findByBookmarkUserUsernameNotAndDescriptionContainingAndVisibleTrue(currentUser, desc);
	}
	/*
	 * Find all visible bookmarks	
	 */
	public List<Bookmark> findByVisibleTrue(){
		return bookmarkRepository.findByVisibleTrue();
	}
	/*
	 * Find all bookmarks of logged user	
	 */
	public List<Bookmark> findByBookmarkUserUsername(String username) {
		return bookmarkRepository.findByBookmarkUserUsername(username);
	}

	public List<Bookmark> findPublicBookmarksNotByUser(String currentUser) {
		// TODO Auto-generated method stub
		return bookmarkRepository.findByBookmarkUserUsernameNotAndVisibleTrue(currentUser);
	}
	

	public List<Bookmark> findByBookmarkUserUsernameAndTitle(String currentUsername, String title) {
		// TODO Auto-generated method stub
		return bookmarkRepository.findByBookmarkUserUsernameAndTitle(currentUsername, title);
	}
}