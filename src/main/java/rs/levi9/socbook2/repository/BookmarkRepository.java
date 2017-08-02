package rs.levi9.socbook2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook2.domain.Bookmark;
import rs.levi9.socbook2.domain.Category;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
	/*
	 * Find all visible bookmarks of certain category without logged user bookmarks
	 */
	public List<Bookmark> findByBookmarkUserUsernameNotAndCategoryNameContainingAndVisibleTrue(String currentUser, String categoryName);
	/*
	 * Find all visible bookmarks of certain tag without logged user bookmarks
	 */
	public List<Bookmark> findByBookmarkUserUsernameNotAndTagNameLikeAndVisibleTrue(String currentUser, String tagName);
	/*
	 * Find all visible bookmarks of certain username without logged user bookmarks	
	 */
	public List<Bookmark> findByBookmarkUserUsernameNotAndBookmarkUserUsernameLikeAndVisibleTrue(String currentUser, String searchedUser);
	/*
	 * Find all visible bookmarks searching description without logged user bookmarks	
	 */
	public List<Bookmark> findByBookmarkUserUsernameNotAndDescriptionContainingAndVisibleTrue(String currentUser, String desc);
	/*
	 * Find all visible bookmarks	
	 */
	public List<Bookmark> findByVisibleTrue();
	/*
	 * Find all bookmarks of logged user	
	 */
	public List<Bookmark> findByBookmarkUserUsername(String username);
	/*
	 * Find all visible bookmarks without logged user bookmarks	
	 */
	public List<Bookmark> findByBookmarkUserUsernameNotAndVisibleTrue(String currentUser);
	
	public List<Bookmark> findByBookmarkUserUsernameAndTitle(String currentUsername, String title);
	
//	public Bookmark setNewCategory(Category category);
	
	public List<Bookmark> findByCategoryName(String name);
}