package rs.levi9.socbook2.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST, reason="This email is already taken")  // 404
public class UsernameTakenException extends RuntimeException {

	String message;
	public UsernameTakenException(String message) {
		this.message = message;
	}


}
