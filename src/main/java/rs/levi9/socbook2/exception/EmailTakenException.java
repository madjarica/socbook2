package rs.levi9.socbook2.exception;


public class EmailTakenException extends Exception {


	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public EmailTakenException(String message) {
		this.message = message;
	}

}
