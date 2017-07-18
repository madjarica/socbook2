package rs.levi9.socbook2.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "user")
public class BookmarkUser extends BaseEntity implements Serializable {
	
	private static final long serialVersionUID = -4701874782142564830L;

//	@Autowired
	public BookmarkUser(){}	
	
	
    public BookmarkUser(String email, String username, String password, String firstName, String lastName) {
		this.email = email;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
//		this.roles = roles;
    }

	@Column(nullable = false, unique = true)
    @NotNull
    @Length(min = 2, max = 50)
    private String email;

	@Column(nullable = false, unique = true)
    @NotNull
    @Length(min = 2, max = 50)
    private String username;
    
    @NotNull
    @Length(min = 6, max = 30)
    @Column(nullable = false)
    private String password;
    
    @NotNull
    @Length(min = 2, max = 50)
    @Column(nullable = false)
    private String firstName;
    
    @NotNull
    @Length(min = 2, max = 50)
    @Column(nullable = false)
    private String lastName;    
    
//    @ManyToMany
//    @JoinTable(joinColumns = @JoinColumn(name = "user_id"),
//    inverseJoinColumns = @JoinColumn(name = "role_id"))
//    private Set<Role> roles;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

//	public Set<Role> getRoles() {
//		return roles;
//	}
//
//	public void setRoles(Set<Role> roles) {
//		this.roles = roles;
//	}
	
    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
