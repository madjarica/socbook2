package rs.levi9.socbook2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@SpringBootApplication
@EnableGlobalMethodSecurity
public class SocBook2 {

	public static void main(String[] args) {
        SpringApplication.run(SocBook2.class, args);
	}
}