package rs.levi9.socbook2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook2.domain.Bookmark;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
	public List<Bookmark> findByBookmarkUserUsernameNotAndCategoryNameContainingAndVisibleTrue(String currentUser, String categoryName);
	public List<Bookmark> findByBookmarkUserUsernameNotAndTagNameContainingAndVisibleTrue(String currentUser, String tagName);
	public List<Bookmark> findByBookmarkUserUsernameNotAndBookmarkUserUsernameContainingAndVisibleTrue(String currentUser, String searchedUser);
	public List<Bookmark> findByBookmarkUserUsernameNotAndDescriptionContainingAndVisibleTrue(String currentUser, String desc);
	public List<Bookmark> findByVisibleTrue();
}
