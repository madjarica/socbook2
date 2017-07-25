package rs.levi9.socbook2.exception;

public class TakenException extends Exception {


	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public TakenException(String message) {
		this.message = message;
	}

}
