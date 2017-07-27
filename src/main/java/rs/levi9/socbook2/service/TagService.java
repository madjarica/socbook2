package rs.levi9.socbook2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.levi9.socbook2.domain.Tag;
import rs.levi9.socbook2.repository.TagRepository;

@Service
public class TagService {

private TagRepository tagRepository;
	
	@Autowired
	public TagService(TagRepository tagRepository){
		this.tagRepository = tagRepository;
	}
	
	public Tag findOne(Long id){
		return tagRepository.findOne(id);
	}
	
	public List<Tag> findAll(){
		return tagRepository.findAll();
	}
	
	public void delete(Long id){
		tagRepository.delete(id);
	}
	
	public Tag save(Tag tag){
		return tagRepository.save(tag);
	}	
}