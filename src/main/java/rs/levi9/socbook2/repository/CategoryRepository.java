package rs.levi9.socbook2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook2.domain.BookmarkUser;
import rs.levi9.socbook2.domain.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	
}