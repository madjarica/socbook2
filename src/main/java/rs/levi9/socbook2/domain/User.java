package rs.levi9.socbook2.domain;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class User {
	
	private String username;
	private String email;
	private boolean status;
	private String password;
//	private Collection<? extends GrantedAuthority> roles;
//	
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//        return roles;
//    }
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmaill() {
		return email;
	}
	public void setEmaill(String emaill) {
		this.email = emaill;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

//	public Collection<? extends GrantedAuthority> getRoles() {
//		return roles;
//	}
//
//	public void setRoles(Collection<? extends GrantedAuthority> roles) {
//		this.roles = roles;
//	}

	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	
}
