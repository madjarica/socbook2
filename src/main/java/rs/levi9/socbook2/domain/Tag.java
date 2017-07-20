package rs.levi9.socbook2.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "tag")
public class Tag extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 5179206020566195635L;
		
	@NotNull
	@Length(min = 2, max = 30)
	@Column(nullable = false, unique = true)
	private String tagName;
	
	public Tag(String tagName) {

		this.tagName = tagName;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}	
}