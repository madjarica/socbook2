package main.java.rs.levi9.socbook2.domain;

@Entity
public class Role extends BaseEntity {

	@Enumerated(EnumType.STRING)
    private RoleType type;

	public RoleType getType() {
		return type;
	}

	public void setType(RoleType type) {
		this.type = type;
	}
	
	public enum RoleType {
        ROLE_USER, ROLE_ADMIN
    }

}
