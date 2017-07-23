package rs.levi9.socbook2.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configurable
@EnableWebSecurity
public class WebSecurityConfig<LibraryUserService> extends WebSecurityConfigurerAdapter {
 
	@Autowired
	private BookmarkUserService bookmarkUserService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(bookmarkUserService);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		super.configure(web);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		  http
          
          .authorizeRequests()
          .antMatchers("/", "/bower_components/**", "/css/**", "/js/**", "/views/**", "/images/**", "/favicon.ico").permitAll()
          .antMatchers(HttpMethod.POST,"/users").permitAll()
//          .antMatchers(HttpMethod.GET,"/categories").permitAll()
//          .antMatchers(HttpMethod.GET,"/bookmarks").permitAll()
          .anyRequest().fullyAuthenticated().and()
          .httpBasic().and()
          .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
          .csrf().disable();
	}
	
	
  

}