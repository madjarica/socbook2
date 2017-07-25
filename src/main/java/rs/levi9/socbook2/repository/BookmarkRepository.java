package rs.levi9.socbook2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook2.domain.Bookmark;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
	public List<Bookmark> findByBookmarkUserUsernameNotAndCategoryNameLikeAndVisibleTrue(String currentUser, String categoryName);
	public List<Bookmark> findByBookmarkUserUsernameNotAndTagNameLikeAndVisibleTrue(String currentUser, String tagName);
	public List<Bookmark> findByBookmarkUserUsernameNotAndBookmarkUserUsernameLikeAndVisibleTrue(String currentUser, String searchedUser);
	public List<Bookmark> findByVisibleTrue();
}
