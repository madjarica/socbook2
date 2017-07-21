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

	private static final long serialVersionUID = -3230059375563994627L;
	
	@Column(nullable = false, unique = true)
	private String name;

	public Tag() {}
	
	public Tag(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}