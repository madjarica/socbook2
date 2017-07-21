package rs.levi9.socbook2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.levi9.socbook2.domain.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

}
