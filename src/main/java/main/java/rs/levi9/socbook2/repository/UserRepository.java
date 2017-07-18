package main.java.rs.levi9.socbook2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.java.rs.levi9.socbook2.domain.BookmarkUser;

@Repository
public interface UserRepository extends JpaRepository<BookmarkUser, Long>{
}
