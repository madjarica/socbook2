package rs.levi9.socbook2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook2.domain.BookmarkUser;

@Repository
public interface UserRepository extends JpaRepository<BookmarkUser, Long>{
	public BookmarkUser findByUsername(String username);
	public BookmarkUser findByEmail(String email);
}
