package rs.levi9.socbook2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook2.domain.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
