package rs.levi9.socbook2.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "category")
public class Category extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -3343905052808618256L;
	
	@NotNull
    @Column(nullable = false, unique = true)
	private String name;
	
	@NotNull
    @Column(nullable = false)
	private boolean isAllowedToDelete;

	public Category() {}

	public Category(String name, boolean isAllowedToDelete) {
		this.name = name;
		this.isAllowedToDelete = isAllowedToDelete;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isAllowedToDelete() {
		return isAllowedToDelete;
	}

	public void setAllowedToDelete(boolean isAllowedToDelete) {
		this.isAllowedToDelete = isAllowedToDelete;
	}
	
}